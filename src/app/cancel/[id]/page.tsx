'use client'

import { useState, useEffect, useCallback } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Navigation } from '@/components/Navigation'
import { useToast } from '@/components/Toast'
import { useAuth } from '@/contexts/ClerkAuthContext'

interface ReservationDetails {
  id: string
  eventTitle: string
  eventDate: string
  guestCount: number
  guestName: string
  guestEmail: string
  status: string
  isGuestReservation: boolean
}

export default function CancelReservationPage() {
  const params = useParams()
  const router = useRouter()
  const reservationId = params.id as string
  const { showToast } = useToast()
  const { isAuthenticated } = useAuth()
  
  const [reservation, setReservation] = useState<ReservationDetails | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [cancelling, setCancelling] = useState(false)
  const [guestEmail, setGuestEmail] = useState('')
  const [requiresEmailVerification, setRequiresEmailVerification] = useState(false)

  const fetchReservationDetails = useCallback(async () => {
    try {
      setLoading(true)
      setError('')

      const response = await fetch(`/api/reservations/${reservationId}`)
      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.message || 'Failed to load reservation details')
      }

      if (result.success) {
        const reservationData = result.data
        setReservation({
          id: reservationData.id,
          eventTitle: reservationData.event.title,
          eventDate: reservationData.event.date,
          guestCount: reservationData.guestCount,
          guestName: reservationData.guestName || reservationData.user?.name || 'Unknown',
          guestEmail: reservationData.guestEmail || reservationData.user?.email || '',
          status: reservationData.status,
          isGuestReservation: !reservationData.userId
        })

        // If it's a guest reservation and user is not authenticated, require email verification
        if (!reservationData.userId && !isAuthenticated) {
          setRequiresEmailVerification(true)
        }
      } else {
        throw new Error(result.message || 'Reservation not found')
      }
    } catch (err) {
      console.error('Error fetching reservation:', err)
      setError(err instanceof Error ? err.message : 'Failed to load reservation details')
    } finally {
      setLoading(false)
    }
  }, [reservationId, isAuthenticated])

  useEffect(() => {
    fetchReservationDetails()
  }, [fetchReservationDetails])

  const handleCancelReservation = async () => {
    if (!reservation) return

    // For guest reservations, require email verification
    if (requiresEmailVerification && !guestEmail.trim()) {
      showToast('Please enter your email address to verify your identity', 'error')
      return
    }

    setCancelling(true)

    try {
      const response = await fetch(`/api/reservations/${reservationId}/cancel`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...(requiresEmailVerification && { guestEmail: guestEmail.trim() })
        })
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.message || 'Failed to cancel reservation')
      }

      if (result.success) {
        showToast(result.message || 'Reservation cancelled successfully', 'success', 6000)
        
        // Redirect to browse page after a delay
        setTimeout(() => {
          router.push('/browse')
        }, 3000)
      } else {
        throw new Error(result.message || 'Cancellation failed')
      }
    } catch (err) {
      console.error('Error cancelling reservation:', err)
      showToast(err instanceof Error ? err.message : 'Failed to cancel reservation', 'error')
    } finally {
      setCancelling(false)
    }
  }

  if (loading) {
    return (
      <>
        <Navigation />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
            <p className="text-theme-muted">Loading reservation details...</p>
          </div>
        </div>
      </>
    )
  }

  if (error || !reservation) {
    return (
      <>
        <Navigation />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center max-w-md mx-auto p-6">
            <div className="text-red-400 text-6xl mb-4">⚠️</div>
            <h1 className="text-2xl font-bold text-theme-primary mb-4">Reservation Not Found</h1>
            <p className="text-theme-muted mb-6">{error || 'This reservation does not exist or may have already been cancelled.'}</p>
            <button
              onClick={() => router.push('/browse')}
              className="btn-primary px-6 py-3 rounded-lg"
            >
              Browse Events
            </button>
          </div>
        </div>
      </>
    )
  }

  if (reservation.status === 'CANCELLED') {
    return (
      <>
        <Navigation />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center max-w-md mx-auto p-6">
            <div className="text-gray-400 text-6xl mb-4">❌</div>
            <h1 className="text-2xl font-bold text-theme-primary mb-4">Already Cancelled</h1>
            <p className="text-theme-muted mb-6">This reservation has already been cancelled.</p>
            <button
              onClick={() => router.push('/browse')}
              className="btn-primary px-6 py-3 rounded-lg"
            >
              Browse Other Events
            </button>
          </div>
        </div>
      </>
    )
  }

  const eventDate = new Date(reservation.eventDate)
  const formattedDate = eventDate.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'America/Chicago' // San Antonio timezone
  })
  const formattedTime = eventDate.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
    timeZone: 'America/Chicago' // San Antonio timezone
  })

  const hoursUntilEvent = Math.abs(eventDate.getTime() - new Date().getTime()) / 36e5
  const canCancel = hoursUntilEvent >= 24

  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-theme-secondary pt-20">
        <div className="max-w-2xl mx-auto p-6">
          <div className="bg-theme-elevated rounded-xl shadow-sm border border-theme-primary overflow-hidden">
            {/* Header */}
            <div className="bg-red-50 border-b border-red-200 p-6">
              <div className="text-center">
                <div className="text-red-400 text-4xl mb-3">⚠️</div>
                <h1 className="text-2xl font-bold text-red-600 mb-2">Cancel Reservation</h1>
                <p className="text-red-600">Are you sure you want to cancel this reservation?</p>
              </div>
            </div>

            {/* Reservation Details */}
            <div className="p-6">
              <div className="bg-theme-secondary rounded-lg p-4 mb-6">
                <h3 className="text-lg font-semibold text-theme-primary mb-3">Reservation Details</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-theme-muted">Event:</span>
                    <span className="text-theme-primary font-medium">{reservation.eventTitle}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-theme-muted">Date:</span>
                    <span className="text-theme-primary">{formattedDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-theme-muted">Time:</span>
                    <span className="text-theme-primary">{formattedTime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-theme-muted">Guest name:</span>
                    <span className="text-theme-primary">{reservation.guestName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-theme-muted">Party size:</span>
                    <span className="text-theme-primary">{reservation.guestCount} {reservation.guestCount === 1 ? 'person' : 'people'}</span>
                  </div>
                </div>
              </div>

              {!canCancel ? (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                  <div className="flex items-start">
                    <div className="text-red-400 text-xl mr-3">🚫</div>
                    <div>
                      <h4 className="font-medium text-red-600 mb-1">Cannot Cancel</h4>
                      <p className="text-sm text-red-600">
                        Reservations cannot be cancelled within 24 hours of the event. 
                        This event is in {Math.floor(hoursUntilEvent)} hours.
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  {requiresEmailVerification && (
                    <div className="mb-6">
                      <label htmlFor="guestEmail" className="block text-sm font-medium text-theme-primary mb-2">
                        Verify your email address
                      </label>
                      <input
                        id="guestEmail"
                        type="email"
                        value={guestEmail}
                        onChange={(e) => setGuestEmail(e.target.value)}
                        placeholder="Enter the email address used for this reservation"
                        className="w-full px-3 py-3 input-theme rounded-lg"
                        required
                      />
                      <p className="text-xs text-theme-muted mt-1">
                        For security, please enter the email address you used when making this reservation.
                      </p>
                    </div>
                  )}

                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                    <div className="flex items-start">
                      <div className="text-yellow-400 text-xl mr-3">ℹ️</div>
                      <div>
                        <h4 className="font-medium text-yellow-600 mb-1">Important Information</h4>
                        <ul className="text-sm text-yellow-600 space-y-1">
                          <li>• Cancellation will free up spots for others on the waitlist</li>
                          <li>• You&apos;ll receive a confirmation email once cancelled</li>
                          <li>• The chef will be notified of your cancellation</li>
                          <li>• This action cannot be undone</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {/* Action Buttons */}
              <div className="flex gap-4">
                <button
                  onClick={() => router.back()}
                  className="flex-1 px-6 py-3 text-theme-primary border border-theme-primary rounded-lg hover:bg-theme-secondary transition-colors"
                >
                  Go Back
                </button>
                
                {canCancel && (
                  <button
                    onClick={handleCancelReservation}
                    disabled={cancelling || (requiresEmailVerification && !guestEmail.trim())}
                    className="flex-1 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    {cancelling ? 'Cancelling...' : 'Cancel Reservation'}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}