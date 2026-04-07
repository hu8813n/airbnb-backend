import { z } from "zod";

export const bookingSchema = z.object({
    userId: z.number({message: "User ID must be a number"}).positive({message: "User ID must be a positive number"}),
    hotelId: z.number({message: "Hotel ID must be a number"}).positive({message: "Hotel ID must be a positive number"}),
    totalGuests: z.number().min(1),
    bookingAmount: z.number().min(0)
})