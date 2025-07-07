import { createMockUser, createMockEvent, createMockLocation, createMockReservation } from '../utils/test-helpers'

describe('Test Helpers', () => {
  it('should create mock user with default values', () => {
    const user = createMockUser()
    
    expect(user).toHaveProperty('id')
    expect(user).toHaveProperty('email')
    expect(user).toHaveProperty('name')
    expect(user.role).toBe('ATTENDEE')
    expect(user.externalId).toMatch(/^clerk_/)
  })

  it('should create mock user with overrides', () => {
    const user = createMockUser({ 
      name: 'Test Chef',
      role: 'CHEF',
      email: 'chef@test.com'
    })
    
    expect(user.name).toBe('Test Chef')
    expect(user.role).toBe('CHEF')
    expect(user.email).toBe('chef@test.com')
  })

  it('should create mock event with valid data', () => {
    const event = createMockEvent()
    
    expect(event).toHaveProperty('id')
    expect(event).toHaveProperty('title')
    expect(event).toHaveProperty('startDate')
    expect(event).toHaveProperty('capacity')
    expect(event.status).toBe('SCHEDULED')
    expect(typeof event.price).toBe('number')
    expect(event.capacity).toBeGreaterThan(0)
  })

  it('should create mock location with address', () => {
    const location = createMockLocation()
    
    expect(location).toHaveProperty('id')
    expect(location).toHaveProperty('name')
    expect(location).toHaveProperty('address')
    expect(location).toHaveProperty('city')
    expect(location).toHaveProperty('state')
    expect(typeof location.latitude).toBe('number')
    expect(typeof location.longitude).toBe('number')
  })

  it('should create mock reservation', () => {
    const reservation = createMockReservation()
    
    expect(reservation).toHaveProperty('id')
    expect(reservation).toHaveProperty('eventId')
    expect(reservation).toHaveProperty('partySize')
    expect(reservation.status).toBe('CONFIRMED')
    expect(reservation.partySize).toBeGreaterThan(0)
    expect(reservation.partySize).toBeLessThanOrEqual(4)
  })
})