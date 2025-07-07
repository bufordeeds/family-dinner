# Family Dinner

A community platform for hosting and joining shared meals, where people can connect over home-cooked food and split cooking costs.

## Overview

Family Dinner connects home cooks with people looking for authentic, home-cooked meals. Hosts can create dinner events, manage RSVPs, and split costs, while guests can browse available dinners, RSVP, and pay their share.

### Key Features

- **Event Management**: Create and manage dinner events with customizable menus, pricing, and capacity
- **Availability Polling**: Schedule dinners using polls to find the best date for all participants
- **Cost Splitting**: Automatic cost calculation and payment tracking through Venmo integration
- **RSVP System**: Guest management with dietary restrictions and special requests
- **Receipt Upload**: Track actual costs with receipt uploads and OCR processing
- **Reviews & Ratings**: Build trust through community reviews
- **Dark/Light Theme**: Customizable UI with theme support

## Tech Stack

- **Framework**: Next.js 15 with App Router and React 19
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: Clerk
- **Styling**: Tailwind CSS v4
- **Email**: Resend
- **Testing**: Jest & Testing Library
- **Deployment**: Optimized for Vercel

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL database
- Clerk account for authentication
- Resend account for emails (optional)

### Environment Variables

Create a `.env.local` file with:

```env
DATABASE_URL="your-postgresql-url"
POSTGRES_URL_NON_POOLING="your-direct-postgresql-url"
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="your-clerk-publishable-key"
CLERK_SECRET_KEY="your-clerk-secret-key"
RESEND_API_KEY="your-resend-api-key"
```

### Installation

```bash
# Install dependencies
npm install

# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma migrate dev

# Seed the database (optional)
npm run db:seed

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## Project Structure

```
src/
├── app/                  # Next.js app router pages
│   ├── api/             # API routes
│   ├── auth/            # Authentication pages
│   ├── browse/          # Event browsing
│   ├── chef/            # Chef dashboard
│   ├── create-event/    # Event creation
│   ├── dashboard/       # User dashboard
│   ├── events/          # Event details & management
│   └── poll/            # Availability polling
├── components/          # React components
├── contexts/           # React contexts (auth, theme)
├── lib/                # Utilities and configurations
├── services/           # Business logic and API calls
└── types/              # TypeScript type definitions

prisma/
├── schema.prisma       # Database schema
└── seed.ts            # Database seeding script
```

## Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run db:seed` - Seed database with sample data
- `npm run db:cleanup` - Clean up past events

## Testing

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with coverage
npm test -- --coverage
```

## Features in Detail

### For Hosts
- Create dinner events with detailed menus and ingredient tracking
- Set participant limits and pricing
- Manage RSVPs and waitlists
- Track costs with receipt uploads
- Receive payments through Venmo

### For Guests
- Browse available dinners by location
- RSVP with dietary restrictions
- Pay your share easily
- Leave reviews after attending
- Build connections in your community

## Database Schema

The application uses PostgreSQL with the following main entities:
- **Users**: Chef and attendee profiles
- **Events**: Dinner events with details and pricing
- **Reservations**: Guest RSVPs and payment tracking
- **Reviews**: Community feedback system
- **Receipts**: Cost tracking with OCR support

## Contributing

Contributions are welcome! Please:
1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to your branch
5. Open a pull request

## License

This project is private and proprietary.

## Contact

For questions or feedback, reach out to buford@familydinner.me
