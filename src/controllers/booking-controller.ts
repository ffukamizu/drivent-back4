import { Response } from 'express';
import httpStatus from 'http-status';
import { AuthenticatedRequest } from '@/middlewares';
import { bookingService } from '@/services/';
import { BookingBody, BookingParams } from '@/protocols';

export async function getBooking(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  const result = await bookingService.getBooking(userId);
  return res.status(httpStatus.OK).send(result);
}

export async function createBooking(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  const { roomId } = req.body as BookingBody;
  const result = await bookingService.createBooking(userId, roomId);
  return res.status(httpStatus.OK).send(result);
}

export async function updateBooking(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  const { roomId } = req.body as BookingBody;
  const { bookingId } = req.params as BookingParams;
  const result = await bookingService.updateBooking(userId, Number(bookingId), roomId);
  return res.status(httpStatus.OK).send(result);
}
