import { Response } from 'express';
import httpStatus from 'http-status';
import { AuthenticatedRequest } from '@/middlewares';
import { hotelsService } from '@/services/';
import { HotelParams } from '@/protocols';

export async function getHotels(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  const result = await hotelsService.getHotels(userId);
  return res.status(httpStatus.OK).send(result);
}

export async function getHotelById(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  const { hotelId } = req.params as HotelParams;
  const result = await hotelsService.getHotelById(userId, Number(hotelId));
  return res.status(httpStatus.OK).send(result);
}
