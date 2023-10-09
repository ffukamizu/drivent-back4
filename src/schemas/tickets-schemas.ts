import Joi from 'joi';
import { CreateTicketBody } from '@/repositories';

export const ticketSchema = Joi.object<CreateTicketBody>({
  ticketTypeId: Joi.number().integer().required(),
});
