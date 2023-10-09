import { Router } from 'express';
import { getHotels, getHotelById } from '@/controllers';
import { authenticateToken, validateParams } from '@/middlewares';
import { hotelParamsSchema } from '@/schemas';

const hotelsRouter = Router();

hotelsRouter
  .all('/*', authenticateToken)
  .get('/', getHotels)
  .get('/:hotelId', validateParams(hotelParamsSchema), getHotelById);

export { hotelsRouter };
