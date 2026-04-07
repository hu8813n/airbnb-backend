import { NextFunction, Request, Response } from "express";
import { CreateBookingDTO } from "../dto/booking.dto";
import { confirmBookingService, CreateBookingService } from "../services/booking.service";

export const createBookingHnadler = async (req: Request , res: Response , next:NextFunction) => {
    const bookingData : CreateBookingDTO = req.body;

    const booking = await CreateBookingService(bookingData);

    res.status(201).json({
        bookingId : booking.bookingId,
        idempotencyKey : booking.idempotencyKey
    })
}

export const confirmBookingHandler = async (req: Request , res: Response , next:NextFunction) => {

    const { idempotencyKey } = req.params;

    const booking = await confirmBookingService(idempotencyKey);
    res.status(200).json({
        bookingId : booking.id,
        status : booking.status
    })
}