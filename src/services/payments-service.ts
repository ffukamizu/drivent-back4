import { ticketNotFoundError, ticketUnauthorizedUserError } from '@/errors';
import { CreatePaymentBody } from '@/protocols';
import { paymentRepository, ticketRepository } from '@/repositories';

async function getPaymentByTicket(userId: number, ticketId: number) {
  const ticket = await ticketRepository.findTicketById(ticketId);
  if (!ticket) throw ticketNotFoundError();
  if (ticket.Enrollment.userId !== userId) throw ticketUnauthorizedUserError();

  const result = await paymentRepository.findPayment(ticketId);
  return result;
}

async function createPaymentToTicket(userId: number, data: CreatePaymentBody) {
  const { ticketId, cardData } = data;
  const { number, issuer } = cardData;
  const cardLastDigits = number.slice(-4);

  const ticket = await ticketRepository.findTicketById(ticketId);

  if (!ticket) throw ticketNotFoundError();
  if (ticket.Enrollment.userId !== userId) throw ticketUnauthorizedUserError();

  const result = await paymentRepository.createPayment({
    ticketId,
    value: ticket.TicketType.price,
    cardIssuer: issuer,
    cardLastDigits,
  });

  await ticketRepository.updateStatus(ticketId);
  return result;
}

export const paymentService = { getPaymentByTicket, createPaymentToTicket };
