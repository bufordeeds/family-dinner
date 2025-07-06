# Unit Test Suite Plan for Family Dinner App

## Overview
This document outlines a comprehensive testing strategy for the Family Dinner application to ensure core functionality remains stable before production deployments.

## Current State
- **No existing test files** in the project
- **No test framework** configured (Jest, Vitest, etc.)
- **No test scripts** in package.json
- **Available tooling**: ESLint with Next.js config

## Recommended Test Stack
- **Jest** - Test runner
- **React Testing Library** - Component testing
- **Supertest** - API endpoint testing
- **MSW (Mock Service Worker)** - External service mocking

## Core Test Categories

### 1. Critical API Endpoints (High Priority)

#### Event Management APIs
- **GET /api/events**
  - Test event listing with various filters (search, price, location, cuisine)
  - Test pagination
  - Test empty state
  - Test invalid query parameters

- **POST /api/events**
  - Test successful event creation
  - Test event creation with poll
  - Test validation errors (invalid dates, capacity limits)
  - Test authentication requirements

- **GET /api/events/[id]**
  - Test successful retrieval
  - Test non-existent event
  - Test unauthorized access

- **PATCH /api/events/[id]**
  - Test partial updates
  - Test status changes
  - Test authorization (only chef can update)
  - Test business rule validation

- **DELETE /api/events/[id]**
  - Test successful deletion
  - Test attendee notification triggering
  - Test authorization

#### Reservation System APIs
- **POST /api/reservations**
  - Test authenticated user reservation
  - Test guest reservation flow
  - Test progressive account creation
  - Test capacity limits
  - Test waitlist placement
  - Test validation errors

- **POST /api/reservations/[id]/cancel**
  - Test successful cancellation
  - Test 24-hour policy enforcement
  - Test waitlist promotion
  - Test guest cancellation with email verification
  - Test notification sending

- **GET /api/reservations**
  - Test user's reservation list
  - Test authentication requirement
  - Test empty state

#### Availability Polling APIs
- **POST /api/events/[id]/poll**
  - Test poll creation
  - Test duplicate poll prevention
  - Test proposed dates validation

- **POST /api/events/[id]/poll/respond**
  - Test availability submission
  - Test guest response flow
  - Test duplicate response handling
  - Test email validation

- **POST /api/events/[id]/poll/finalize**
  - Test date finalization
  - Test authorization (chef only)
  - Test event status transition
  - Test invalid date selection

### 2. Business Logic Services (High Priority)

#### EventService Tests
```typescript
// Key test cases:
- createEvent()
  - Valid event creation
  - Event with availability poll
  - Future date validation
  - Capacity limits (1-50)
  - Price validation

- updateEvent()
  - Partial updates
  - Status changes
  - Business rule enforcement

- deleteEvent()
  - Cascade deletion
  - Notification triggering
```

#### ReservationService Tests
```typescript
// Key test cases:
- createReservation()
  - Authenticated user flow
  - Guest reservation flow
  - Capacity checking
  - Waitlist placement
  - Guest token generation

- cancelReservation()
  - 24-hour policy
  - Waitlist promotion logic
  - Notification sending
  - Guest cancellation verification

- processWaitlist()
  - Automatic promotion
  - Notification sending
  - Capacity management
```

### 3. Data Access Layer (Medium Priority)

#### EventRepository Tests
- Query filtering (search, price range, location, cuisine)
- Relationship loading (chef, location, reservations)
- Capacity calculations
- Date range queries

#### ReservationRepository Tests
- User reservation queries
- Event reservation queries
- Waitlist operations
- Guest token lookups
- Status filtering

### 4. Security & Authentication (High Priority)

#### Authentication Tests
- Clerk middleware integration
- Protected route access
- Role-based permissions (CHEF vs ATTENDEE)
- Guest token validation
- Email verification flows

#### Security Tests
- SQL injection prevention
- XSS prevention
- Guest token security
- Rate limiting (when implemented)

### 5. Email Service (Medium Priority)

#### Email Tests
- Template rendering
- Resend API integration
- Error handling
- Retry logic
- All email types:
  - Welcome emails
  - Reservation confirmations
  - Event reminders
  - Cancellation notices
  - Waitlist promotions

## Test Implementation Phases

### Phase 1: Core Revenue-Critical Tests (Week 1)
1. Event creation API tests
2. Reservation creation tests (all flows)
3. Cancellation system tests
4. Basic authentication tests

### Phase 2: Business Logic Tests (Week 2)
1. EventService unit tests
2. ReservationService unit tests
3. Validation rule tests
4. Error handling tests

### Phase 3: Integration Tests (Week 3)
1. Full API flow tests
2. Database integration tests
3. Email service integration
4. Authentication flow tests

### Phase 4: Edge Cases & Performance (Week 4)
1. Concurrent reservation attempts
2. Race condition handling
3. Performance benchmarks
4. Load testing

## Test Configuration

### Required Dependencies
```json
{
  "devDependencies": {
    "jest": "^29.7.0",
    "@testing-library/react": "^14.1.2",
    "@testing-library/jest-dom": "^6.1.5",
    "jest-environment-jsdom": "^29.7.0",
    "supertest": "^6.3.3",
    "@types/supertest": "^2.0.16",
    "msw": "^2.0.0",
    "@faker-js/faker": "^8.0.0"
  }
}
```

### Test Scripts
```json
{
  "scripts": {
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage",
    "test:ci": "jest --ci --coverage --maxWorkers=2"
  }
}
```

### Jest Configuration
```javascript
// jest.config.js
module.exports = {
  testEnvironment: 'node',
  testPathIgnorePatterns: ['/node_modules/', '/.next/'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    '!src/**/*.d.ts',
    '!src/**/*.stories.{js,jsx,ts,tsx}',
    '!src/**/__tests__/**',
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
};
```

## Pre-Production Checklist

Before any production deployment, ensure:

### 1. Event Lifecycle Tests Pass
- [ ] Create event
- [ ] Update event
- [ ] Delete event
- [ ] Event with poll creation
- [ ] Poll finalization

### 2. Reservation Flow Tests Pass
- [ ] Authenticated user reservation
- [ ] Guest reservation
- [ ] Capacity enforcement
- [ ] Waitlist placement
- [ ] Cancellation with waitlist promotion

### 3. Security Tests Pass
- [ ] Authentication middleware
- [ ] Authorization checks
- [ ] Guest token validation
- [ ] Input sanitization

### 4. Integration Tests Pass
- [ ] Database operations
- [ ] Email sending
- [ ] External service mocks
- [ ] Error scenarios

### 5. Performance Benchmarks Met
- [ ] API response times < 200ms
- [ ] Concurrent request handling
- [ ] Database query optimization

## Testing Best Practices

### 1. Test Structure
```typescript
describe('EventService', () => {
  describe('createEvent', () => {
    it('should create event with valid data', async () => {
      // Arrange
      const eventData = {...};
      
      // Act
      const result = await eventService.createEvent(eventData);
      
      // Assert
      expect(result).toMatchObject({...});
    });
    
    it('should throw error for past dates', async () => {
      // Test implementation
    });
  });
});
```

### 2. Test Data Management
- Use factories for test data generation
- Reset database between tests
- Use transactions for isolation
- Mock external services

### 3. Coverage Goals
- Minimum 80% code coverage
- 100% coverage for critical paths
- Focus on behavior, not implementation

## Continuous Integration

### GitHub Actions Workflow
```yaml
name: Tests
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm ci
      - run: npm run test:ci
      - run: npm run build
```

## Monitoring & Maintenance

### 1. Test Health Metrics
- Track test execution time
- Monitor flaky tests
- Review coverage reports weekly
- Update tests with feature changes

### 2. Test Documentation
- Document complex test scenarios
- Maintain test data examples
- Update this plan quarterly
- Review with team regularly

## Conclusion

This comprehensive test suite will provide confidence in the stability of core features before production deployments. The phased approach allows for incremental implementation while prioritizing the most critical functionality first.