import express from 'express';
import {  validateRequestBody } from '../../validators';
import { bookingSchema } from '../../validators/booking.validator';
import { confirmBookingHandler, createBookingHnadler } from '../../controllers/booking.controller';


const bookingRouter = express.Router();

bookingRouter.post('/', validateRequestBody(bookingSchema), createBookingHnadler);
bookingRouter.post('/confirm/:idempotencyKey', confirmBookingHandler);

    
export default bookingRouter;