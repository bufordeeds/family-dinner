'use client'

import { PublicDinnerEvent } from '@/types'
import { cn, formatCurrency, formatEventDate } from '@/lib/utils'

interface EventCardProps {
  event: PublicDinnerEvent
  onReserve: (eventId: string) => void
  className?: string
}

export function EventCard({ event, onReserve, className }: EventCardProps) {
  console.log('🎴 [EVENT CARD] Received event props:', {
    event: event,
    hasEvent: !!event,
    eventKeys: event ? Object.keys(event) : [],
    estimatedDuration: event?.estimatedDuration,
    maxCapacity: event?.maxCapacity,
    currentReservations: event?.currentReservations,
    cuisineType: event?.cuisineType,
    dietaryAccommodations: event?.dietaryAccommodations,
    location: event?.location
  })

  const spotsAvailable = (event.maxCapacity || 0) - (event.currentReservations || 0)
  const isAlmostFull = spotsAvailable <= 2 && spotsAvailable > 0
  const isFull = event.status === 'full' || spotsAvailable <= 0
  const hasRSVP = !!event.userRsvpStatus
  const isRSVPConfirmed = event.userRsvpStatus?.status === 'CONFIRMED'
  const isRSVPWaitlisted = event.userRsvpStatus?.status === 'WAITLIST'
  
  // Use centralized date formatting utility

  const formatDuration = (minutes: number) => {
    console.log('⏱️ [EVENT CARD] formatDuration called with:', {
      minutes,
      type: typeof minutes,
      isNaN: isNaN(minutes),
      isUndefined: minutes === undefined,
      isNull: minutes === null
    })
    
    if (!minutes || isNaN(minutes)) {
      console.log('⚠️ [EVENT CARD] Duration is invalid, returning TBD')
      return 'Duration TBD'
    }
    
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    const result = hours === 0 ? `${mins}m` : mins === 0 ? `${hours}h` : `${hours}h ${mins}m`
    
    console.log('✅ [EVENT CARD] Duration formatted:', result)
    return result
  }

  return (
    <div className={cn('bg-theme-elevated rounded-xl border border-theme-primary shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col h-full', className)}>
      {/* RSVP Status Banner */}
      {hasRSVP && (
        <div className={cn(
          'px-6 py-2 text-sm font-medium text-center',
          isRSVPConfirmed ? 'bg-green-100 text-green-800' :
          isRSVPWaitlisted ? 'bg-yellow-100 text-yellow-800' :
          'bg-theme-secondary text-theme-muted'
        )}>
          {isRSVPConfirmed && `✓ You're going! (${event.userRsvpStatus?.guestCount} ${event.userRsvpStatus?.guestCount === 1 ? 'person' : 'people'})`}
          {isRSVPWaitlisted && `⏱️ You're on the waitlist (${event.userRsvpStatus?.guestCount} ${event.userRsvpStatus?.guestCount === 1 ? 'person' : 'people'})`}
        </div>
      )}
      
      {/* Event Header */}
      <div className="p-6 pb-4 flex-1">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-theme-primary mb-1">{event.title}</h3>
            <p className="text-sm text-theme-muted">by {event.chefName}</p>
          </div>
          {event.chefPhoto && (
            // eslint-disable-next-line @next/next/no-img-element
            <img 
              src={event.chefPhoto} 
              alt={event.chefName}
              className="w-12 h-12 rounded-full object-cover"
            />
          )}
        </div>

        {/* Cuisine Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {event.cuisineType?.map((cuisine) => (
            <span 
              key={cuisine}
              className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full"
            >
              {cuisine}
            </span>
          ))}
        </div>

        {/* Event Details */}
        <div className="space-y-2 text-sm text-theme-muted">
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span>{formatEventDate(event.date)}</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{formatDuration(event.estimatedDuration)}</span>
          </div>
          {event.location && (
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span>
                {event.location.neighborhood && event.location.city 
                  ? `${event.location.neighborhood}, ${event.location.city}`
                  : event.location.city || event.location.neighborhood || 'Location TBD'
                }
              </span>
            </div>
          )}
        </div>

        {/* Description */}
        {event.description && (
          <p className="text-theme-subtle text-sm mt-3">
            {event.description}
          </p>
        )}
      </div>

      {/* Capacity and Price Section */}
      <div className="px-6 py-4 bg-theme-secondary border-t border-theme-primary">
        <div className="flex items-center justify-between mb-4">
          <div>
            {event.estimatedCostPerPerson === 0 ? (
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-lg font-bold text-green-600">FREE</span>
                  <span className="text-sm text-theme-muted">dinner</span>
                </div>
                <p className="text-xs text-theme-subtle">Tips appreciated!</p>
              </div>
            ) : (
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-lg font-bold text-theme-primary">
                    {formatCurrency(event.estimatedCostPerPerson)}
                  </span>
                  <span className="text-sm text-theme-muted">per person</span>
                </div>
                <p className="text-xs text-theme-subtle">Estimated cost</p>
              </div>
            )}
          </div>

          <div className="text-right">
            <div className="flex items-center gap-2 mb-1">
              <span className={cn(
                'text-sm font-medium',
                isFull ? 'text-red-600' : isAlmostFull ? 'text-orange-600' : 'text-green-600'
              )}>
                {event.currentReservations}/{event.maxCapacity} spots
              </span>
            </div>
            <p className="text-xs text-theme-subtle">
              {isFull ? 'Full' : `${spotsAvailable >= 0 ? spotsAvailable : 0} available`}
            </p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-theme-secondary rounded-full h-2 mb-4">
          <div 
            className={cn(
              'h-2 rounded-full transition-all',
              isFull ? 'bg-theme-muted' : isAlmostFull ? 'bg-theme-subtle' : 'bg-theme-primary'
            )}
            style={{ width: `${(event.currentReservations / event.maxCapacity) * 100}%` }}
          />
        </div>

        {/* Action Button */}
        <button
          onClick={() => !hasRSVP && onReserve(event.id)}
          disabled={isFull || hasRSVP}
          className={cn(
            'w-full py-3 px-4 rounded-lg font-medium transition-colors text-sm',
            isFull
              ? 'bg-theme-secondary text-theme-subtle cursor-not-allowed'
              : hasRSVP
                ? 'badge-success cursor-default'
                : 'btn-primary shadow-sm'
          )}
        >
          {isFull ? 'Dinner Full' : hasRSVP ? (isRSVPConfirmed ? 'Already Reserved' : 'On Waitlist') : isAlmostFull ? 'Reserve Now - Almost Full!' : 'Reserve Your Spot'}
        </button>

        {/* Dietary Accommodations */}
        {event.dietaryAccommodations?.length > 0 && (
          <div className="mt-3">
            <p className="text-xs text-theme-subtle mb-1">Dietary accommodations:</p>
            <div className="flex flex-wrap gap-1">
              {event.dietaryAccommodations.map((accommodation) => (
                <span 
                  key={accommodation}
                  className="px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded"
                >
                  {accommodation}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}