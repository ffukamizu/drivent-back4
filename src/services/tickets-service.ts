import { ticketRepository, enrollmentRepository, CreateTicket } from '@/repositories';
import { ticketNotFoundError, enrollmentNotFoundError, ticketTypeNotFoundError } from '@/errors';

async function getUserTickets(userId: number) {
  const enrollments = await enrollmentRepository.findWithAddressByUserId(userId);
  if (!enrollments) throw enrollmentNotFoundError();
  const result = await ticketRepository.findTicket(userId);
  if (!result) throw ticketNotFoundError();
  return result;
}

async function getTicketsTypes() {
  return await ticketRepository.findTicketTypes();
}

async function createTicket(userId: number, ticketTypeId: number) {
  const enrollments = await enrollmentRepository.findWithAddressByUserId(userId);
  if (!enrollments) throw enrollmentNotFoundError();
  const ticketType = ticketRepository.findTicketTypeById(ticketTypeId);
  if (!ticketType) throw ticketTypeNotFoundError();

  const data: CreateTicket = { enrollmentId: enrollments.id, ticketTypeId };
  return await ticketRepository.create(data);
}

export const ticketsService = { getUserTickets, getTicketsTypes, createTicket };
