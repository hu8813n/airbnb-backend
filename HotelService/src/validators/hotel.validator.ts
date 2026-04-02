import { z } from "zod";

export const hotelSchema = z.object({
    name: z.string().min(4, "Hotel name is required"),
    address: z.string().min(4, "Hotel address is required"),
    location: z.string().min(2, "Hotel location is required"),
    rating: z.number().min(0).max(5).optional(),
    ratingCount: z.number().min(0).optional()
})