import { Hotel, Room } from '@prisma/client';
import { prisma } from '@/config';

async function getHotels(): Promise<Hotel[]> {
  return await prisma.hotel.findMany({ include: { Rooms: false } });
}

async function getHotelById(hotelId: number): Promise<HotelWithRooms> {
  return await prisma.hotel.findUnique({ where: { id: hotelId }, include: { Rooms: true } });
}

type HotelWithRooms = Hotel & { Rooms: Room[] };

export const hotelsRepository = { getHotels, getHotelById };
