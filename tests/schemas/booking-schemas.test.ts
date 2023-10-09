import faker from '@faker-js/faker';
import { bookingBodySchema, bookingParamsSchema } from '@/schemas';

describe('bookingBodySchema', () => {
  const generateValidInput = () => ({
    roomId: faker.datatype.number(),
  });

  describe('when roomId is not valid', () => {
    it('should return error if roomId is not present', () => {
      const input = generateValidInput();
      delete input.roomId;

      const { error } = bookingBodySchema.validate(input);

      expect(error).toBeDefined();
    });

    it('should return error if roomId is not a number', () => {
      const { error } = bookingBodySchema.validate({ roomId: faker.datatype.string() });

      expect(error).toBeDefined();
    });
  });

  it('should return no error if input is valid', () => {
    const input = generateValidInput();

    const { error } = bookingBodySchema.validate(input);

    expect(error).toBeUndefined();
  });
});

describe('bookingParamsSchema', () => {
  const generateValidInput = () => ({
    bookingId: faker.datatype.number(),
  });

  describe('when roomId is not valid', () => {
    it('should return error if bookingId is not present', () => {
      const input = generateValidInput();
      delete input.bookingId;

      const { error } = bookingParamsSchema.validate(input);

      expect(error).toBeDefined();
    });

    it('should return error if bookingId is not a number', () => {
      const { error } = bookingParamsSchema.validate({ bookingId: faker.datatype.string() });

      expect(error).toBeDefined();
    });
  });

  it('should return no error if input is valid', () => {
    const input = generateValidInput();

    const { error } = bookingParamsSchema.validate(input);

    expect(error).toBeUndefined();
  });
});
