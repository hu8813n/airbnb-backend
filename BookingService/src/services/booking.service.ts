import { CreateBookingDTO } from "../dto/booking.dto";
import { confirmBooking, createBooking, createIdempotencyKey, finalizeIdempotencyKey, getIdempotencyKeyData } from "../repositories/booking.repository";
import { BadRequestError, NotFoundError } from "../utils/errors/app.error";
import { generateIdempotencyKey } from "../utils/helpers/idempotent.helper";


export async function CreateBookingService(bookingData: CreateBookingDTO) {
  //check if the booking already exists using the idempotency key

  const booking = await createBooking({
    userId: bookingData.userId,
    hotelId: bookingData.hotelId,
    totalGuests: bookingData.totalGuests,
    bookingAmount: bookingData.bookingAmount,
  });

  const idempotencyKey = await generateIdempotencyKey();
  await createIdempotencyKey(idempotencyKey, booking.id);

    return {
        bookingId : booking.id,
        idempotencyKey : idempotencyKey
    };
}

export async function confirmBookingService(idempotencyKey: string) {
  const idempotencyKeyData = await getIdempotencyKeyData(idempotencyKey);

  if(!idempotencyKeyData) {
    throw new NotFoundError("Idempotency key not found");
  }

  if(idempotencyKeyData.finalized) {
    throw new BadRequestError("Booking already finalized");
  }

  const booking = await confirmBooking(idempotencyKeyData.bookingId);
  await finalizeIdempotencyKey(idempotencyKey);

  return booking;
}
