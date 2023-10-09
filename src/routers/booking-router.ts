import { Router } from 'express';
import { getBooking, createBooking, updateBooking } from '@/controllers';
import { authenticateToken, validateBody, validateParams } from '@/middlewares';
import { bookingBodySchema, bookingParamsSchema } from '@/schemas';

const bookingRouter = Router();

bookingRouter
  .all('/*', authenticateToken)
  .get('/', getBooking)
  .post('/', validateBody(bookingBodySchema), createBooking)
  .put('/:bookingId', validateBody(bookingBodySchema), validateParams(bookingParamsSchema), updateBooking);

export { bookingRouter };
