#!/usr/bin/env tsx
import { EventService } from '../src/services/EventService'
import { prisma } from '../src/lib/prisma'

async function testDateFiltering() {
  try {
    console.log('Testing date filtering for public events...\n')
    
    // Get all events without any filtering for comparison
    const allEvents = await prisma.event.findMany({
      select: {
        id: true,
        title: true,
        date: true,
        status: true
      },
      orderBy: { date: 'asc' }
    })
    
    console.log(`Total events in database: ${allEvents.length}`)
    allEvents.forEach(event => {
      const isPast = event.date < new Date()
      console.log(`- ${event.title}: ${event.date.toISOString()} (${isPast ? 'PAST' : 'FUTURE'}) - Status: ${event.status}`)
    })
    
    console.log('\n---\n')
    
    // Get public events (with date filtering)
    const publicEvents = await EventService.getPublicEvents()
    
    console.log(`Public events (today and future only): ${publicEvents.length}`)
    publicEvents.forEach(event => {
      console.log(`- ${event.title}: ${event.date.toISOString()}`)
    })
    
    // Count past events that should be filtered out
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const pastEvents = allEvents.filter(e => e.date < today && ['OPEN', 'POLL_ACTIVE'].includes(e.status))
    
    console.log(`\nPast events filtered out: ${pastEvents.length}`)
    
  } catch (error) {
    console.error('Error testing date filtering:', error)
  } finally {
    await prisma.$disconnect()
  }
}

testDateFiltering()