import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function calculateTotalCost(ingredients: { cost: number }[]): number {
  return ingredients.reduce((total, ingredient) => total + ingredient.cost, 0)
}

export function calculatePerPersonCost(totalCost: number, attendeeCount: number): number {
  return attendeeCount > 0 ? totalCost / attendeeCount : 0
}

export function generateVenmoUrl(username: string, amount: number, note: string): string {
  const encodedNote = encodeURIComponent(note)
  return `https://venmo.com/${username}?txn=pay&amount=${amount}&note=${encodedNote}`
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount)
}

// Centralized timezone configuration
export const APP_TIMEZONE = 'America/Chicago' // San Antonio timezone

// Centralized date formatting utilities
export function formatEventDate(date: Date | string): string {
  try {
    const dateObj = typeof date === 'string' ? new Date(date) : date
    if (isNaN(dateObj.getTime())) {
      return 'Date TBD'
    }
    
    // Force timezone in formatting to ensure consistency
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      timeZone: APP_TIMEZONE,
      hour12: true
    }
    
    return new Intl.DateTimeFormat('en-US', options).format(dateObj)
  } catch (error) {
    console.error('Error formatting date:', error)
    return 'Date TBD'
  }
}

export function formatEventDateOnly(date: Date | string): string {
  try {
    const dateObj = typeof date === 'string' ? new Date(date) : date
    if (isNaN(dateObj.getTime())) {
      return 'Date TBD'
    }
    return new Intl.DateTimeFormat('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      timeZone: APP_TIMEZONE
    }).format(dateObj)
  } catch (error) {
    console.error('Error formatting date:', error)
    return 'Date TBD'
  }
}

export function formatEventTime(date: Date | string): string {
  try {
    const dateObj = typeof date === 'string' ? new Date(date) : date
    if (isNaN(dateObj.getTime())) {
      return 'Time TBD'
    }
    return new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      timeZone: APP_TIMEZONE
    }).format(dateObj)
  } catch (error) {
    console.error('Error formatting time:', error)
    return 'Time TBD'
  }
}

export function formatShortDate(date: Date | string): string {
  try {
    const dateObj = typeof date === 'string' ? new Date(date) : date
    if (isNaN(dateObj.getTime())) {
      return 'Date TBD'
    }
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      timeZone: APP_TIMEZONE
    }).format(dateObj)
  } catch (error) {
    console.error('Error formatting date:', error)
    return 'Date TBD'
  }
}

export function formatTimeOnly(time: string): string {
  try {
    const [hours, minutes] = time.split(':')
    const hour24 = parseInt(hours)
    const hour12 = hour24 === 0 ? 12 : hour24 > 12 ? hour24 - 12 : hour24
    const ampm = hour24 >= 12 ? 'PM' : 'AM'
    return `${hour12}:${minutes} ${ampm}`
  } catch {
    return time
  }
}