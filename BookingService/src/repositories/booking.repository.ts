import { Prisma } from "@prisma/client";
import { prismaClient } from "../prisma/client";


export async function createBooking(bookingData: Prisma.BookingCreateInput) {

    const booking = await prismaClient.booking.create({
        data: bookingData
    })

    return booking;
}