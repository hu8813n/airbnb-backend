import { serverConfig } from "../config";
import { redlock } from "../config/redis.config";
import { CreateBookingDTO } from "../dto/booking.dto";
import { prismaClient } from "../prisma/client";
import {
  confirmBooking,
  createBooking,
  createIdempotencyKey,
  finalizeIdempotencyKey,
  getIdempotencyKeyData,
} from "../repositories/booking.repository";
import {
  BadRequestError,
  InternalServerError,
  NotFoundError,
} from "../utils/errors/app.error";
import { generateIdempotencyKey } from "../utils/helpers/idempotent.helper";

export async function CreateBookingService(createBookingDTO: CreateBookingDTO) {
  //check if the booking already exists using the idempotency key

  const ttl = serverConfig.LOCK_TTL; // TTL for the lock in milliseconds --> 5 minutes
  const bookingResource = `hotel:${createBookingDTO.hotelId}`; // Unique resource identifier for the lock
  console.log(`hotel:${createBookingDTO.hotelId}`);

  try {
    await redlock.acquire([bookingResource], ttl);
    const booking = await createBooking({
      userId: createBookingDTO.userId,
      hotelId: createBookingDTO.hotelId,
      totalGuests: createBookingDTO.totalGuests,
      bookingAmount: createBookingDTO.bookingAmount,
    });

    const idempotencyKey = await generateIdempotencyKey();
    await createIdempotencyKey(idempotencyKey, booking.id);

    return {
      bookingId: booking.id,
      idempotencyKey: idempotencyKey,
    };
  } catch (error) {
    throw new InternalServerError(
      "Failed to acquire lock for booking creation",
    );
  }

} 

// This function will be called when the user confirms the booking
// This function is handling transaction to ensure that the booking is confirmed and the idempotency key is finalized in an atomic operation
export async function confirmBookingService(idempotencyKey: string) {
  return await prismaClient.$transaction(async (tx) => {
    const idempotencyKeyData = await getIdempotencyKeyData(tx, idempotencyKey);

    if (!idempotencyKeyData) {
      throw new NotFoundError("Idempotency key not found");
    }

    if (idempotencyKeyData.finalized) {
      throw new BadRequestError("Booking already finalized");
    }

    const booking = await confirmBooking(tx, idempotencyKeyData.bookingId);
    await finalizeIdempotencyKey(tx, idempotencyKey);

    return booking;
  });
}
