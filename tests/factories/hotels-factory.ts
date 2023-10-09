import faker from '@faker-js/faker';
import { prisma } from '@/config';

export async function createHotel() {
  return await prisma.hotel.create({
    data: {
      name: faker.company.companyName(),
      image: faker.image.business(),
    },
  });
}

export async function createHotelSingleRoom(hotelId: number) {
  const data = {
    name: faker.address.buildingNumber(),
    capacity: faker.datatype.number({ min: 1, max: 3 }),
    hotelId,
  };
  return await prisma.room.create({
    data,
  });
}

export async function createHotelRooms(hotelId: number) {
  const data = Array.from({ length: faker.datatype.number({ min: 3, max: 10 }) }).map(() => ({
    name: faker.address.buildingNumber(),
    capacity: faker.datatype.number({ min: 1, max: 3 }),
    hotelId,
  }));
  return await prisma.room.createMany({
    data,
  });
}
