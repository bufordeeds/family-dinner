// Mock Next.js server components
jest.mock('next/server', () => ({
  NextRequest: class NextRequest {
    url: string
    method: string
    headers: Headers
    body: string | null

    constructor(url: string, init?: RequestInit) {
      this.url = url
      this.method = init?.method || 'GET'
      this.headers = new Headers(init?.headers)
      this.body = init?.body
    }

    async json() {
      return this.body ? JSON.parse(this.body) : null
    }
  },
  NextResponse: {
    json: (data: unknown, init?: ResponseInit) => ({
      status: init?.status || 200,
      json: async () => data,
      headers: new Headers(init?.headers),
    }),
  },
}))

// Mock global Headers
global.Headers = class Headers {
  private headers: Map<string, string> = new Map()

  constructor(init?: HeadersInit) {
    if (init) {
      if (init instanceof Headers) {
        init.forEach((value, key) => this.headers.set(key, value))
      } else if (Array.isArray(init)) {
        init.forEach(([key, value]) => this.headers.set(key, value))
      } else {
        Object.entries(init).forEach(([key, value]) => this.headers.set(key, String(value)))
      }
    }
  }

  get(key: string) {
    return this.headers.get(key.toLowerCase()) || null
  }

  has(key: string) {
    return this.headers.has(key.toLowerCase())
  }

  set(key: string, value: string) {
    this.headers.set(key.toLowerCase(), value)
  }

  forEach(callback: (value: string, key: string) => void) {
    this.headers.forEach(callback)
  }
}

export {}