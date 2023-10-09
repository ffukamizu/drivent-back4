import { Booking, Room } from '@prisma/client';
import { prisma } from '@/config';

async function getBooking(userId: number): Promise<BookingWithRoom> {
  return await prisma.booking.findFirst({ where: { userId }, select: { id: true, Room: true } });
}

async function getRoomInfo(roomId: number): Promise<RoomInfo> {
  return await prisma.room.findUnique({
    where: { id: roomId },
    select: { capacity: true, _count: { select: { Booking: true } } },
  });
}

async function createBooking(data: BookingCreateInput): Promise<{ id: number }> {
  return await prisma.booking.create({ data, select: { id: true } });
}

async function updateBooking(bookingId: number, roomId: number): Promise<{ id: number }> {
  return await prisma.booking.update({ where: { id: bookingId }, data: { roomId }, select: { id: true } });
}

export type BookingWithRoom = Omit<Booking, 'userId' | 'roomId' | 'createdAt' | 'updatedAt'> & { Room: Room };

export type BookingCreateInput = Omit<Booking, 'id' | 'createdAt' | 'updatedAt'>;

export type RoomInfo = {
  capacity: number;
  _count: {
    Booking: number;
  };
};

export const bookingRepository = { getBooking, getRoomInfo, createBooking, updateBooking };
