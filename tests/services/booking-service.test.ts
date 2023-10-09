import {
  bookingNotFoundError,
  roomNotFoundError,
  roomMaxCapacityError,
  bookingAlreadyExistError,
  bookingForbiddenError,
} from '@/errors';
import { bookingService } from '@/services';
import {
  BookingCreateInput,
  bookingRepository,
  BookingWithRoom,
  RoomInfo,
  enrollmentRepository,
  EnrollmentWithAddress,
  ticketRepository,
  TicketAndType,
} from '@/repositories';

beforeEach(() => {
  jest.clearAllMocks();
});

describe('getBooking', () => {
  const bookingData: BookingWithRoom = {
    id: 1,
    Room: {
      id: 1,
      name: 'single',
      capacity: 2,
      hotelId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  };
  it('Should throw bookingNotFoundError when the user does not have a reservation', async () => {
    jest.spyOn(bookingRepository, 'getBooking').mockResolvedValueOnce(undefined);

    const promise = bookingService.getBooking(1);
    expect(promise).rejects.toEqual(bookingNotFoundError());
  });
  it('Should return the booking', async () => {
    jest.spyOn(bookingRepository, 'getBooking').mockResolvedValueOnce(bookingData);

    const promise = bookingService.getBooking(1);
    expect(promise).resolves.toEqual(bookingData);
  });
});

describe('createBooking', () => {
  const bookingInput: BookingCreateInput = {
    userId: 1,
    roomId: 1,
  };
  const roomDataMaxCapacity: RoomInfo = {
    capacity: 3,
    _count: {
      Booking: 3,
    },
  };
  const roomData: RoomInfo = {
    capacity: 3,
    _count: {
      Booking: 0,
    },
  };
  const enrollmentData: EnrollmentWithAddress = {
    id: 1,
    userId: 1,
    name: 'MockName',
    cpf: 'MockCPF',
    birthday: new Date(),
    phone: 'MockPhone',
    createdAt: new Date(),
    updatedAt: new Date(),
    Address: [
      {
        id: 1,
        enrollmentId: 1,
        addressDetail: 'MockDetail',
        cep: 'MockCep',
        city: 'MockCity',
        neighborhood: 'MockNeighborhood',
        number: 'MockNumber',
        state: 'MockState',
        street: 'MockStreet',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
  };
  const ticketData: TicketAndType = {
    id: 1,
    enrollmentId: 1,
    status: 'PAID',
    ticketTypeId: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
    TicketType: {
      id: 1,
      name: 'MockTicketType',
      price: 100,
      includesHotel: true,
      isRemote: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  };
  const bookingData: BookingWithRoom = {
    id: 1,
    Room: {
      id: 1,
      name: 'Mock',
      capacity: 3,
      hotelId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  };

  it('Should throw roomNotFoundError when the room does not exist', async () => {
    jest.spyOn(bookingRepository, 'getRoomInfo').mockResolvedValueOnce(undefined);

    const promise = bookingService.createBooking(bookingInput.userId, bookingInput.roomId);
    expect(promise).rejects.toEqual(roomNotFoundError());
  });

  it('Should throw roomMaxCapacityError when the room is at max capacity', async () => {
    jest.spyOn(bookingRepository, 'getRoomInfo').mockResolvedValueOnce(roomDataMaxCapacity);

    const promise = bookingService.createBooking(bookingInput.userId, bookingInput.roomId);
    expect(promise).rejects.toEqual(roomMaxCapacityError());
  });

  it('Should throw bookingAlreadyExistError when the user already have a reservation', async () => {
    jest.spyOn(bookingRepository, 'getRoomInfo').mockResolvedValueOnce(roomData);
    jest.spyOn(bookingRepository, 'getBooking').mockResolvedValueOnce(bookingData);

    const promise = bookingService.createBooking(bookingInput.userId, bookingInput.roomId);
    expect(promise).rejects.toEqual(bookingAlreadyExistError());
  });

  it('Should throw bookingForbiddenError when the user does not have a enrollment', async () => {
    jest.spyOn(bookingRepository, 'getRoomInfo').mockResolvedValueOnce(roomData);
    jest.spyOn(bookingRepository, 'getBooking').mockResolvedValueOnce(undefined);
    jest.spyOn(enrollmentRepository, 'findWithAddressByUserId').mockResolvedValueOnce(undefined);

    const promise = bookingService.createBooking(bookingInput.userId, bookingInput.roomId);
    expect(promise).rejects.toEqual(bookingForbiddenError('User does not have a enrollment'));
  });

  it('Should throw bookingForbiddenError when the user does not have a ticket', async () => {
    jest.spyOn(bookingRepository, 'getRoomInfo').mockResolvedValueOnce(roomData);
    jest.spyOn(bookingRepository, 'getBooking').mockResolvedValueOnce(undefined);
    jest.spyOn(enrollmentRepository, 'findWithAddressByUserId').mockResolvedValueOnce(enrollmentData);
    jest.spyOn(ticketRepository, 'findTicketByEnrollmentId').mockResolvedValueOnce(undefined);

    const promise = bookingService.createBooking(bookingInput.userId, bookingInput.roomId);
    expect(promise).rejects.toEqual(bookingForbiddenError('User does not have a ticket'));
  });

  it('Should throw bookingForbiddenError when the ticket is not paid', async () => {
    jest.spyOn(bookingRepository, 'getRoomInfo').mockResolvedValueOnce(roomData);
    jest.spyOn(bookingRepository, 'getBooking').mockResolvedValueOnce(undefined);
    jest.spyOn(enrollmentRepository, 'findWithAddressByUserId').mockResolvedValueOnce(enrollmentData);
    jest
      .spyOn(ticketRepository, 'findTicketByEnrollmentId')
      .mockResolvedValueOnce({ ...ticketData, status: 'RESERVED' });

    const promise = bookingService.createBooking(bookingInput.userId, bookingInput.roomId);
    expect(promise).rejects.toEqual(bookingForbiddenError('Ticket must be paid before'));
  });

  it('Should throw bookingForbiddenError when the ticket type is remote', async () => {
    jest.spyOn(bookingRepository, 'getRoomInfo').mockResolvedValueOnce(roomData);
    jest.spyOn(bookingRepository, 'getBooking').mockResolvedValueOnce(undefined);
    jest.spyOn(enrollmentRepository, 'findWithAddressByUserId').mockResolvedValueOnce(enrollmentData);
    jest
      .spyOn(ticketRepository, 'findTicketByEnrollmentId')
      .mockResolvedValueOnce({ ...ticketData, TicketType: { ...ticketData.TicketType, isRemote: true } });

    const promise = bookingService.createBooking(bookingInput.userId, bookingInput.roomId);
    expect(promise).rejects.toEqual(bookingForbiddenError('Ticket type is remote'));
  });

  it('Should throw bookingForbiddenError when the ticket type does not includes a hotel', async () => {
    jest.spyOn(bookingRepository, 'getRoomInfo').mockResolvedValueOnce(roomData);
    jest.spyOn(bookingRepository, 'getBooking').mockResolvedValueOnce(undefined);
    jest.spyOn(enrollmentRepository, 'findWithAddressByUserId').mockResolvedValueOnce(enrollmentData);
    jest
      .spyOn(ticketRepository, 'findTicketByEnrollmentId')
      .mockResolvedValueOnce({ ...ticketData, TicketType: { ...ticketData.TicketType, includesHotel: false } });

    const promise = bookingService.createBooking(bookingInput.userId, bookingInput.roomId);
    expect(promise).rejects.toEqual(bookingForbiddenError('Ticket type does not include hotel'));
  });

  it('Should return the booking id', async () => {
    jest.spyOn(bookingRepository, 'getRoomInfo').mockResolvedValueOnce(roomData);
    jest.spyOn(bookingRepository, 'getBooking').mockResolvedValueOnce(undefined);
    jest.spyOn(enrollmentRepository, 'findWithAddressByUserId').mockResolvedValueOnce(enrollmentData);
    jest.spyOn(ticketRepository, 'findTicketByEnrollmentId').mockResolvedValueOnce(ticketData);
    jest.spyOn(bookingRepository, 'createBooking').mockResolvedValueOnce({ id: 1 });

    const promise = bookingService.createBooking(bookingInput.userId, bookingInput.roomId);
    expect(promise).resolves.toEqual({ bookingId: 1 });
  });
});

describe('updateBooking', () => {
  const bookingInput: BookingCreateInput = {
    userId: 1,
    roomId: 2,
  };
  const roomDataMaxCapacity: RoomInfo = {
    capacity: 3,
    _count: {
      Booking: 3,
    },
  };
  const roomData: RoomInfo = {
    capacity: 3,
    _count: {
      Booking: 0,
    },
  };
  const bookingData: BookingWithRoom = {
    id: 1,
    Room: {
      id: 1,
      name: 'Mock',
      capacity: 3,
      hotelId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  };

  it('Should throw roomNotFoundError when the room does not exist', async () => {
    jest.spyOn(bookingRepository, 'getRoomInfo').mockResolvedValueOnce(undefined);

    const promise = bookingService.updateBooking(bookingInput.userId, bookingData.id, bookingInput.roomId);
    expect(promise).rejects.toEqual(roomNotFoundError());
  });

  it('Should throw roomMaxCapacityError when the room is at max capacity', async () => {
    jest.spyOn(bookingRepository, 'getRoomInfo').mockResolvedValueOnce(roomDataMaxCapacity);

    const promise = bookingService.updateBooking(bookingInput.userId, bookingData.id, bookingInput.roomId);
    expect(promise).rejects.toEqual(roomMaxCapacityError());
  });

  it('Should throw bookingForbiddenError when the user does not have a reservation', async () => {
    jest.spyOn(bookingRepository, 'getRoomInfo').mockResolvedValueOnce(roomData);
    jest.spyOn(bookingRepository, 'getBooking').mockResolvedValueOnce(undefined);

    const promise = bookingService.updateBooking(bookingInput.userId, bookingData.id, bookingInput.roomId);
    expect(promise).rejects.toEqual(bookingForbiddenError('User does not have a reservation'));
  });
  it('Should return a booking when is the update is successful', async () => {
    jest.spyOn(bookingRepository, 'getRoomInfo').mockResolvedValueOnce(roomData);
    jest.spyOn(bookingRepository, 'getBooking').mockResolvedValueOnce(bookingData);
    jest.spyOn(bookingRepository, 'updateBooking').mockResolvedValueOnce({ id: bookingData.id });

    const promise = bookingService.updateBooking(bookingInput.userId, bookingData.id, bookingInput.roomId);
    expect(promise).resolves.toEqual({ bookingId: bookingData.id });
  });
});
