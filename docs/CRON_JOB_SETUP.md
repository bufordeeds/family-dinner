# Cron Job Setup Guide

## Overview
The application includes a cron job that automatically cleans up events older than 30 days. This helps keep the database clean and performant.

## Local Development
The cron job can be tested locally by running:
```bash
npm run db:cleanup
```

## Production Setup (Vercel)

### 1. Environment Variable
You need to add the `CRON_SECRET` environment variable to your Vercel project:

1. Go to your Vercel project dashboard
2. Navigate to Settings → Environment Variables
3. Add the following variable:
   - **Name**: `CRON_SECRET`
   - **Value**: `Nx/1d64uBrN6tg7GYF9GLl1qJazbgzANHliLv33cFDI=` (or generate a new one with `openssl rand -base64 32`)
   - **Environment**: Production

### 2. Cron Job Configuration
The cron job is already configured in `vercel.json`:
```json
{
  "crons": [
    {
      "path": "/api/cron/cleanup-past-events",
      "schedule": "0 2 * * *"
    }
  ]
}
```

This runs the cleanup job daily at 2:00 AM UTC.

### 3. How It Works
- The cron job endpoint is at `/api/cron/cleanup-past-events`
- It deletes events that are:
  - Older than 30 days
  - In DRAFT, OPEN, FULL, CANCELLED, or COMPLETED status
- The endpoint requires authentication via the `CRON_SECRET`
- Vercel automatically calls this endpoint based on the schedule

### 4. Monitoring
You can monitor the cron job execution in:
- Vercel Dashboard → Functions → Logs
- Look for logs from `/api/cron/cleanup-past-events`

### 5. Manual Trigger
To manually trigger the cleanup in production:
```bash
curl -X GET https://your-domain.vercel.app/api/cron/cleanup-past-events \
  -H "Authorization: Bearer YOUR_CRON_SECRET"
```

## Security Note
The `CRON_SECRET` ensures that only authorized requests (from Vercel's cron system) can trigger the cleanup. Never expose this secret publicly.