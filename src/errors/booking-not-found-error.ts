import { ApplicationError } from '@/protocols';

export function bookingNotFoundError(): ApplicationError {
  return {
    name: 'bookingNotFoundError',
    message: 'User does not have a reservation.',
  };
}
