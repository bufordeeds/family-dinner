import { faker } from '@faker-js/faker'
import { Event, User, Reservation, Location } from '@prisma/client'

export const createMockUser = (overrides?: Partial<User>): User => ({
  id: faker.string.uuid(),
  externalId: `clerk_${faker.string.alphanumeric(20)}`,
  email: faker.internet.email(),
  name: faker.person.fullName(),
  phone: faker.phone.number(),
  role: 'ATTENDEE',
  createdAt: faker.date.past(),
  updatedAt: faker.date.recent(),
  ...overrides,
})

export const createMockLocation = (overrides?: Partial<Location>): Location => ({
  id: faker.string.uuid(),
  name: faker.company.name(),
  address: faker.location.streetAddress(),
  city: faker.location.city(),
  state: faker.location.state({ abbreviated: true }),
  zipCode: faker.location.zipCode(),
  latitude: parseFloat(faker.location.latitude()),
  longitude: parseFloat(faker.location.longitude()),
  createdAt: faker.date.past(),
  updatedAt: faker.date.recent(),
  ...overrides,
})

export const createMockEvent = (overrides?: Partial<Event>): Event => ({
  id: faker.string.uuid(),
  title: faker.lorem.words(3),
  description: faker.lorem.paragraph(),
  startDate: faker.date.future(),
  endDate: faker.date.future(),
  price: parseFloat(faker.commerce.price({ min: 20, max: 100 })),
  capacity: faker.number.int({ min: 5, max: 30 }),
  cuisineType: faker.helpers.arrayElement(['Italian', 'Mexican', 'Japanese', 'French', 'American']),
  menuDescription: faker.lorem.paragraph(),
  dietaryOptions: [faker.helpers.arrayElement(['Vegetarian', 'Vegan', 'Gluten-Free'])],
  status: 'SCHEDULED',
  chefId: faker.string.uuid(),
  locationId: faker.string.uuid(),
  imageUrl: faker.image.url(),
  createdAt: faker.date.past(),
  updatedAt: faker.date.recent(),
  ...overrides,
})

export const createMockReservation = (overrides?: Partial<Reservation>): Reservation => ({
  id: faker.string.uuid(),
  eventId: faker.string.uuid(),
  userId: faker.string.uuid(),
  guestEmail: null,
  guestName: null,
  guestPhone: null,
  guestToken: null,
  partySize: faker.number.int({ min: 1, max: 4 }),
  status: 'CONFIRMED',
  specialRequests: null,
  createdAt: faker.date.past(),
  updatedAt: faker.date.recent(),
  ...overrides,
})

export const mockClerkUser = (userId: string, role: 'CHEF' | 'ATTENDEE' = 'ATTENDEE') => ({
  userId,
  sessionClaims: {
    metadata: { role },
  },
})

export const createAuthHeaders = (userId: string) => ({
  'x-clerk-user-id': userId,
})

export class TestDatabase {
  private transactions: Map<string, unknown> = new Map()

  async transaction(fn: (tx: unknown) => Promise<unknown>) {
    const txId = faker.string.uuid()
    const tx = {
      event: {
        findUnique: jest.fn(),
        findMany: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
        count: jest.fn(),
      },
      reservation: {
        findUnique: jest.fn(),
        findMany: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
        count: jest.fn(),
      },
      user: {
        findUnique: jest.fn(),
        findFirst: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
      },
      location: {
        findUnique: jest.fn(),
        findMany: jest.fn(),
        create: jest.fn(),
      },
      availabilityPoll: {
        findUnique: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
      },
      pollResponse: {
        findFirst: jest.fn(),
        create: jest.fn(),
        findMany: jest.fn(),
      },
    }

    this.transactions.set(txId, tx)
    const result = await fn(tx)
    this.transactions.delete(txId)
    return result
  }
}