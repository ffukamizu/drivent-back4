import { Router } from 'express';
import { createTicket, getTickets, getTicketsType } from '@/controllers';
import { authenticateToken, validateBody } from '@/middlewares';
import { ticketSchema } from '@/schemas/tickets-schemas';

const ticketsRouter = Router();

ticketsRouter
  .all('/*', authenticateToken)
  .get('/types', getTicketsType)
  .get('/', getTickets)
  .post('/', validateBody(ticketSchema), createTicket);

export { ticketsRouter };
