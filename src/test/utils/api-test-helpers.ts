import { NextRequest } from 'next/server'

export function createMockRequest({
  method = 'GET',
  url = 'http://localhost:3000',
  body = null as unknown,
  searchParams = {},
  customHeaders = {},
}: {
  method?: string
  url?: string
  body?: unknown
  searchParams?: Record<string, string>
  customHeaders?: Record<string, string>
}) {
  const urlObj = new URL(url)
  Object.entries(searchParams).forEach(([key, value]) => {
    urlObj.searchParams.set(key, value)
  })

  const request = new NextRequest(urlObj.toString(), {
    method,
    headers: customHeaders,
    body: body ? JSON.stringify(body) : undefined,
  })

  return request
}

export function mockHeaders(customHeaders: Record<string, string> = {}) {
  const headerMap = new Map(Object.entries(customHeaders))
  
  jest.mock('next/headers', () => ({
    headers: () => ({
      get: (key: string) => headerMap.get(key) || null,
      has: (key: string) => headerMap.has(key),
      forEach: (callback: (value: string, key: string) => void) => {
        headerMap.forEach(callback)
      },
    }),
  }))
}

export function expectErrorResponse(
  response: Response,
  statusCode: number,
  errorMessage?: string
) {
  expect(response.status).toBe(statusCode)
  
  if (errorMessage) {
    return response.json().then((data) => {
      expect(data.error).toBe(errorMessage)
    })
  }
}

export async function expectSuccessResponse(
  response: Response,
  statusCode: number = 200
) {
  expect(response.status).toBe(statusCode)
  const data = await response.json()
  return data
}

export class MockEmailService {
  public sentEmails: Array<{
    to: string[]
    subject: string
    html: string
  }> = []

  async send(params: { to: string[]; subject: string; html: string }) {
    this.sentEmails.push(params)
    return { id: 'mock-email-id' }
  }

  clear() {
    this.sentEmails = []
  }

  expectEmailSent(to: string, subjectContains?: string) {
    const email = this.sentEmails.find(e => e.to.includes(to))
    expect(email).toBeDefined()
    
    if (subjectContains) {
      expect(email?.subject).toContain(subjectContains)
    }
    
    return email
  }

  expectNoEmailsSent() {
    expect(this.sentEmails).toHaveLength(0)
  }
}