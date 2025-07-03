// Individual Reservation API endpoint
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET /api/reservations/[id] - Get reservation details
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id: reservationId } = params
    
    
    // Find the reservation with event details
    const reservation = await prisma.reservation.findUnique({
      where: { id: reservationId },
      include: {
        event: {
          select: {
            id: true,
            title: true,
            date: true,
            chef: {
              select: { name: true }
            }
          }
        },
        user: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      }
    })

    if (!reservation) {
      return NextResponse.json(
        {
          success: false,
          error: 'Reservation not found',
          message: 'The reservation you are looking for does not exist'
        },
        { status: 404 }
      )
    }

    // Return reservation details
    // Note: We return all details here since authorization is handled in the cancellation endpoint
    return NextResponse.json({
      success: true,
      data: reservation
    })

  } catch (error) {
    console.error('Error fetching reservation:', error)
    
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch reservation',
        message: 'An unexpected error occurred while loading reservation details'
      },
      { status: 500 }
    )
  }
}