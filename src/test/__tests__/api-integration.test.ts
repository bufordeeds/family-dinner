// Integration tests for testing framework setup with actual API structure
import { EventService } from '@/services/EventService'

// Mock the EventService to test our mocking capabilities
jest.mock('@/services/EventService', () => ({
  EventService: {
    getPublicEvents: jest.fn(),
    createEvent: jest.fn(),
    createEventWithPoll: jest.fn(),
  },
}))

describe('API Integration Test Framework', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('EventService Integration', () => {
    it('should successfully mock EventService.getPublicEvents', async () => {
      const mockEvents = [
        {
          id: '1',
          title: 'Italian Night',
          chefName: 'Chef Mario',
          date: new Date(),
          maxCapacity: 20,
          currentReservations: 5,
          estimatedCostPerPerson: 75,
        },
      ]

      ;(EventService.getPublicEvents as jest.Mock).mockResolvedValue(mockEvents)

      const result = await EventService.getPublicEvents({ search: 'Italian' })

      expect(result).toEqual(mockEvents)
      expect(EventService.getPublicEvents).toHaveBeenCalledWith({ search: 'Italian' })
    })

    it('should handle service errors', async () => {
      const errorMessage = 'Database connection failed'
      ;(EventService.getPublicEvents as jest.Mock).mockRejectedValue(new Error(errorMessage))

      await expect(EventService.getPublicEvents()).rejects.toThrow(errorMessage)
    })

    it('should mock createEvent successfully', async () => {
      const eventData = {
        title: 'Test Event',
        date: new Date(Date.now() + 24 * 60 * 60 * 1000),
        reservationDeadline: new Date(),
        duration: 180,
        maxCapacity: 20,
        estimatedCostPerPerson: 50,
        chefId: 'chef-123',
        cuisineTypes: ['Italian'],
        dietaryAccommodations: [],
      }

      const mockCreatedEvent = {
        id: 'event-123',
        ...eventData,
      }

      ;(EventService.createEvent as jest.Mock).mockResolvedValue(mockCreatedEvent)

      const result = await EventService.createEvent(eventData)

      expect(result).toEqual(mockCreatedEvent)
      expect(EventService.createEvent).toHaveBeenCalledWith(eventData)
    })

    it('should validate EventService.createEventWithPoll mock', async () => {
      const pollData = {
        title: 'Poll Event',
        duration: 180,
        maxCapacity: 15,
        estimatedCostPerPerson: 60,
        chefId: 'chef-123',
        cuisineTypes: ['Italian'],
        dietaryAccommodations: [],
        chefAvailability: [
          { date: '2025-02-01', time: '18:00' },
        ],
        pollDeadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        pollDateRange: {
          startDate: '2025-02-01',
          endDate: '2025-02-28',
        },
      }

      const mockPollEvent = {
        id: 'poll-event-123',
        status: 'POLL_ACTIVE',
        ...pollData,
      }

      ;(EventService.createEventWithPoll as jest.Mock).mockResolvedValue(mockPollEvent)

      const result = await EventService.createEventWithPoll(pollData)

      expect(result).toEqual(mockPollEvent)
      expect(EventService.createEventWithPoll).toHaveBeenCalledWith(pollData)
    })
  })

  describe('Test Data Generation', () => {
    it('should generate consistent test data', () => {
      const testUser = {
        id: 'test-user-123',
        email: 'test@example.com',
        name: 'Test User',
        role: 'ATTENDEE' as const,
        externalId: 'clerk_test123',
        phone: '555-1234',
        createdAt: new Date(),
        updatedAt: new Date(),
      }

      expect(testUser.id).toBe('test-user-123')
      expect(testUser.email).toContain('@')
      expect(testUser.role).toBe('ATTENDEE')
    })

    it('should create test event data structure', () => {
      const testEvent = {
        id: 'test-event-123',
        title: 'Test Cooking Class',
        description: 'Learn to cook amazing food',
        startDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000 + 3 * 60 * 60 * 1000),
        price: 75.00,
        capacity: 20,
        cuisineType: 'Italian',
        menuDescription: 'Pasta making workshop',
        dietaryOptions: ['Vegetarian'],
        status: 'SCHEDULED' as const,
        chefId: 'chef-123',
        locationId: 'location-123',
        imageUrl: 'https://example.com/image.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      }

      expect(testEvent.startDate.getTime()).toBeGreaterThan(Date.now())
      expect(testEvent.capacity).toBeGreaterThan(0)
      expect(testEvent.price).toBeGreaterThan(0)
      expect(testEvent.status).toBe('SCHEDULED')
    })
  })

  describe('Mock Framework Validation', () => {
    it('should properly reset mocks between tests', () => {
      // This test validates that our beforeEach is working
      expect((EventService.getPublicEvents as jest.Mock).mock.calls).toHaveLength(0)
      expect((EventService.createEvent as jest.Mock).mock.calls).toHaveLength(0)
      expect((EventService.createEventWithPoll as jest.Mock).mock.calls).toHaveLength(0)
    })

    it('should allow multiple mock configurations', () => {
      // Test that we can reconfigure mocks within a test
      ;(EventService.getPublicEvents as jest.Mock)
        .mockResolvedValueOnce([{ id: '1', title: 'First Call' }])
        .mockResolvedValueOnce([{ id: '2', title: 'Second Call' }])

      return Promise.all([
        EventService.getPublicEvents().then(result => {
          expect(result[0].title).toBe('First Call')
        }),
        EventService.getPublicEvents().then(result => {
          expect(result[0].title).toBe('Second Call')
        }),
      ])
    })
  })
})