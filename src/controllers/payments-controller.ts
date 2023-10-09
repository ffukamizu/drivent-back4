import { Response } from 'express';
import httpStatus from 'http-status';
import { AuthenticatedRequest } from '@/middlewares';
import { paymentService } from '@/services/';
import { CreatePaymentBody, TicketId } from '@/protocols';
import { invalidDataError } from '@/errors';

export async function getPaymentByTicket(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  const { ticketId } = req.query as TicketId;
  if (!ticketId) throw invalidDataError('The ticketId is required');

  const result = await paymentService.getPaymentByTicket(userId, Number(ticketId));
  return res.status(httpStatus.OK).send(result);
}

export async function createPaymentToTicket(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  const data = req.body as CreatePaymentBody;

  const result = await paymentService.createPaymentToTicket(userId, data);

  return res.status(httpStatus.OK).send(result);
}
