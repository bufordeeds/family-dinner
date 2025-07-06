#!/usr/bin/env tsx
import { prisma } from '../src/lib/prisma'

async function cleanupPastEvents() {
  try {
    // Calculate the date 30 days ago
    const thirtyDaysAgo = new Date()
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

    console.log(`Cleaning up events older than ${thirtyDaysAgo.toISOString()}...`)

    // First, let's see what we're about to delete
    const eventsToDelete = await prisma.event.findMany({
      where: {
        date: {
          lt: thirtyDaysAgo
        },
        status: {
          in: ['DRAFT', 'OPEN', 'FULL', 'CANCELLED', 'COMPLETED']
        }
      },
      select: {
        id: true,
        title: true,
        date: true,
        status: true
      }
    })

    console.log(`Found ${eventsToDelete.length} events to clean up:`)
    eventsToDelete.forEach(event => {
      console.log(`- ${event.title} (${event.date.toISOString()}) - Status: ${event.status}`)
    })

    if (eventsToDelete.length === 0) {
      console.log('No events to clean up.')
      return
    }

    // Perform the deletion
    const deletedEvents = await prisma.event.deleteMany({
      where: {
        date: {
          lt: thirtyDaysAgo
        },
        status: {
          in: ['DRAFT', 'OPEN', 'FULL', 'CANCELLED', 'COMPLETED']
        }
      }
    })

    console.log(`✅ Successfully cleaned up ${deletedEvents.count} past events`)
  } catch (error) {
    console.error('❌ Error cleaning up past events:', error)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

// Run the cleanup
cleanupPastEvents()