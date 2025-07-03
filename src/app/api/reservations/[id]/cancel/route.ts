// Guest Reservation Cancellation API endpoint
import { NextRequest, NextResponse } from 'next/server'
import { ReservationService } from '@/services/ReservationService'
import { getAuth } from '@clerk/nextjs/server'
import { prisma } from '@/lib/prisma'
import { emailService } from '@/lib/email'

// POST /api/reservations/[id]/cancel - Cancel reservation (authenticated user or guest with email verification)
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: reservationId } = await params
    const body = await request.json()
    
    // Get authenticated user from Clerk (optional)
    const { userId: clerkUserId } = getAuth(request)
    
    // Find the reservation
    const reservation = await prisma.reservation.findUnique({
      where: { id: reservationId },
      include: {
        event: {
          include: {
            chef: {
              select: { name: true, email: true }
            }
          }
        },
        user: clerkUserId ? {
          select: { id: true, name: true, email: true }
        } : undefined
      }
    })

    if (!reservation) {
      return NextResponse.json(
        {
          success: false,
          error: 'Reservation not found',
          message: 'The reservation you are trying to cancel does not exist'
        },
        { status: 404 }
      )
    }

    // Check if reservation is already cancelled
    if (reservation.status === 'CANCELLED') {
      return NextResponse.json(
        {
          success: false,
          error: 'Already cancelled',
          message: 'This reservation has already been cancelled'
        },
        { status: 400 }
      )
    }

    // Authorization check
    let isAuthorized = false
    let userName = ''
    let userEmail = ''

    if (clerkUserId && reservation.userId === clerkUserId) {
      // Authenticated user canceling their own reservation
      isAuthorized = true
      userName = reservation.user?.name || 'User'
      userEmail = reservation.user?.email || ''
    } else if (!reservation.userId && body.guestEmail) {
      // Guest cancellation - verify email matches
      if (body.guestEmail.toLowerCase() === reservation.guestEmail?.toLowerCase()) {
        isAuthorized = true
        userName = reservation.guestName || 'Guest'
        userEmail = reservation.guestEmail
      }
    }

    if (!isAuthorized) {
      return NextResponse.json(
        {
          success: false,
          error: 'Unauthorized',
          message: 'You are not authorized to cancel this reservation'
        },
        { status: 403 }
      )
    }

    // Check cancellation deadline (24 hours before event)
    const hoursUntilEvent = Math.abs(reservation.event.date.getTime() - new Date().getTime()) / 36e5
    if (hoursUntilEvent < 24) {
      return NextResponse.json(
        {
          success: false,
          error: 'Cancellation deadline passed',
          message: 'Reservations cannot be cancelled within 24 hours of the event'
        },
        { status: 400 }
      )
    }

    // Cancel the reservation using the service
    const result = reservation.userId 
      ? await ReservationService.cancelReservation(reservationId, reservation.userId)
      : await ReservationService.cancelGuestReservation(reservationId)

    // Send cancellation confirmation email
    try {
      await emailService.sendReservationCancellation(
        userEmail,
        userName,
        reservation.event.title,
        reservation.event.date,
        reservation.guestCount,
        result.promotedFromWaitlist || 0
      )
    } catch (emailError) {
      console.error('Failed to send cancellation email:', emailError)
      // Don't fail the cancellation if email fails
    }

    // Notify chef about the cancellation
    try {
      const chefEmail = reservation.event.chef.email
      if (chefEmail) {
        await emailService.sendChefCancellationNotification(
          chefEmail,
          reservation.event.chef.name,
          reservation.event.title,
          userName,
          reservation.guestCount,
          reservation.event.date
        )
      }
    } catch (emailError) {
      console.error('Failed to send chef notification:', emailError)
    }

    return NextResponse.json({
      success: true,
      data: result,
      message: `Reservation cancelled successfully. ${result.promotedFromWaitlist > 0 ? `${result.promotedFromWaitlist} people have been promoted from the waitlist.` : ''}`
    })

  } catch (error) {
    console.error('Error cancelling reservation:', error)
    
    // Handle specific business logic errors
    if (error instanceof Error) {
      const knownErrors = [
        'Cannot cancel within 24 hours',
        'Reservation not found',
        'You can only cancel your own reservations'
      ]
      
      const isKnownError = knownErrors.some(msg => error.message.includes(msg))
      
      if (isKnownError) {
        return NextResponse.json(
          {
            success: false,
            error: 'Cancellation failed',
            message: error.message
          },
          { status: 400 }
        )
      }
    }
    
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to cancel reservation',
        message: 'An unexpected error occurred while cancelling the reservation'
      },
      { status: 500 }
    )
  }
}