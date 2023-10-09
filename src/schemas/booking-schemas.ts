import Joi from 'joi';
import { BookingBody, BookingParams } from '@/protocols';

export const bookingBodySchema = Joi.object<BookingBody>({
  roomId: Joi.number().integer().required(),
});

export const bookingParamsSchema = Joi.object<BookingParams>({
  bookingId: Joi.number().integer().required(),
});
