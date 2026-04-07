import { Prisma } from "@prisma/client";
import { prismaClient } from "../prisma/client";
import { NotFoundError } from "../utils/errors/app.error";

export async function createBooking(bookingData: Prisma.BookingCreateInput) {
  const booking = await prismaClient.booking.create({
    data: bookingData,
  });

  return booking;
}

export async function createIdempotencyKey(key: string, bookingId: number) {
  const idempotencyKey = await prismaClient.idempotencyKey.create({
    data: {
      key,
      booking: {
        connect: {
          id: bookingId,
        },
      },
    },
  });

  return idempotencyKey;
}

export async function getIdempotencyKeyData(key: string) {
  const idempotencyKey = await prismaClient.idempotencyKey.findUnique({
    where: {
      key,
    },
  });

  return idempotencyKey;
}

export async function getBookingById(bookingId: number) {
  const booking = await prismaClient.booking.findUnique({
    where: {
      id: bookingId,
    },
  });

  return booking;
}

export async function confirmBooking(bookingId: number | null) {
  if(!bookingId) {
    throw new NotFoundError("Booking not found");
  }  
  const booking = await prismaClient.booking.update({
    where: {
      id: bookingId,
    },
    data: {
      status : "CONFIRMED"
    },
  });

  return booking;
}

export async function cancelBooking(bookingId: number) {
  const booking = await prismaClient.booking.update({
    where: {
      id: bookingId,
    },
    data: {
      status : "CANCELLED"
    },
  });

  return booking;
}


export async function finalizeIdempotencyKey(key: string) {
    const idempotencyKey = await prismaClient.idempotencyKey.update({
        where: {
            key,
        },
        data: {
            finalized: true,
        }
    });

    return idempotencyKey;
}
