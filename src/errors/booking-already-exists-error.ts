import { ApplicationError } from '@/protocols';

export function bookingAlreadyExistError(): ApplicationError {
  return {
    name: 'bookingAlreadyExistError',
    message: 'User already has a booking.',
  };
}
