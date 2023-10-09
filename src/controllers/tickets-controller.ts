import { Response } from 'express';
import httpStatus from 'http-status';
import { AuthenticatedRequest } from '@/middlewares';
import { ticketsService } from '@/services/';
import { CreateTicketBody } from '@/repositories';

export async function getTickets(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  const result = await ticketsService.getUserTickets(userId);
  return res.status(httpStatus.OK).send(result);
}

export async function getTicketsType(_req: AuthenticatedRequest, res: Response) {
  const result = await ticketsService.getTicketsTypes();
  return res.status(httpStatus.OK).send(result);
}

export async function createTicket(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  const { ticketTypeId } = req.body as CreateTicketBody;
  const result = await ticketsService.createTicket(userId, ticketTypeId);
  return res.status(httpStatus.CREATED).send(result);
}
