-- AlterTable
ALTER TABLE "reservations" ADD COLUMN     "guestToken" TEXT,
ADD COLUMN     "tokenExpiresAt" TIMESTAMP(3);

-- CreateIndex
CREATE UNIQUE INDEX "reservations_eventId_userId_key" ON "reservations"("eventId", "userId");