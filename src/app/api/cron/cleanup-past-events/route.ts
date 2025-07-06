import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: Request) {
  // Verify the request is from a cron job (you can add authentication here)
  const authHeader = request.headers.get('authorization')
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    // Calculate the date 30 days ago
    const thirtyDaysAgo = new Date()
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

    // Delete events that are:
    // 1. Past events (date < now)
    // 2. Older than 30 days
    // 3. Not marked as archived or special status
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

    // Also clean up orphaned reservations for deleted events
    // This is handled by cascade delete in the database schema

    console.log(`Cleaned up ${deletedEvents.count} past events`)

    return NextResponse.json({
      success: true,
      message: `Successfully cleaned up ${deletedEvents.count} past events`,
      deletedCount: deletedEvents.count,
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('Error cleaning up past events:', error)
    return NextResponse.json(
      { error: 'Failed to clean up past events' },
      { status: 500 }
    )
  }
}

// Also support POST method for flexibility
export async function POST(request: Request) {
  return GET(request)
}