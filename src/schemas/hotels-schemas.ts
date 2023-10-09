import Joi from 'joi';
import { HotelParams } from '@/protocols';

export const hotelParamsSchema = Joi.object<HotelParams>({
  hotelId: Joi.number().integer(),
});
