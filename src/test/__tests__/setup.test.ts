// Basic test to verify Jest setup is working
describe('Test Setup', () => {
  it('should have Jest configured correctly', () => {
    expect(true).toBe(true)
  })

  it('should have test helpers working', () => {
    // Test faker is available
    const { faker } = require('@faker-js/faker') // eslint-disable-line @typescript-eslint/no-require-imports
    const email = faker.internet.email()
    expect(email).toContain('@')
  })

  it('should have environment variables mocked', () => {
    expect(process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY).toBe('test_pk')
    expect(process.env.DATABASE_URL).toBe('postgres://test')
  })

  it('should have jest-dom matchers available', () => {
    // Create a simple DOM element to test
    const div = document.createElement('div')
    div.textContent = 'Hello World'
    document.body.appendChild(div)
    
    expect(div).toBeInTheDocument()
    expect(div).toHaveTextContent('Hello World')
  })
})