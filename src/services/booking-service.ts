import {
  bookingNotFoundError,
  roomNotFoundError,
  roomMaxCapacityError,
  bookingAlreadyExistError,
  bookingForbiddenError,
} from '@/errors';
import { enrollmentRepository, ticketRepository, bookingRepository } from '@/repositories';

async function getBooking(userId: number) {
  const booking = await bookingRepository.getBooking(userId);
  if (!booking) throw bookingNotFoundError();
  return booking;
}

async function createBooking(userId: number, roomId: number) {
  const room = await bookingRepository.getRoomInfo(roomId);
  if (!room) throw roomNotFoundError();
  if (room.capacity === room._count.Booking) throw roomMaxCapacityError();

  const booking = await bookingRepository.getBooking(userId);
  if (booking) throw bookingAlreadyExistError();

  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
  if (!enrollment) throw bookingForbiddenError('User does not have a enrollment');
  const ticket = await ticketRepository.findTicketByEnrollmentId(enrollment.id);
  if (!ticket) throw bookingForbiddenError('User does not have a ticket');
  if (ticket.status === 'RESERVED') throw bookingForbiddenError('Ticket must be paid before');
  if (ticket.TicketType.isRemote === true) throw bookingForbiddenError('Ticket type is remote');
  if (ticket.TicketType.includesHotel === false) throw bookingForbiddenError('Ticket type does not include hotel');

  const newBooking = await bookingRepository.createBooking({ userId, roomId });

  return { bookingId: newBooking.id };
}

async function updateBooking(userId: number, bookingId: number, roomId: number) {
  const room = await bookingRepository.getRoomInfo(roomId);
  if (!room) throw roomNotFoundError();
  if (room.capacity === room._count.Booking) throw roomMaxCapacityError();

  const booking = await bookingRepository.getBooking(userId);
  if (!booking) throw bookingForbiddenError('User does not have a reservation');

  const newBooking = await bookingRepository.updateBooking(bookingId, roomId);
  return { bookingId: newBooking.id };
}

export const bookingService = { getBooking, createBooking, updateBooking };
