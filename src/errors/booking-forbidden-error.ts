import { ApplicationError } from '@/protocols';

export function bookingForbiddenError(message: string): ApplicationError {
  return {
    name: 'bookingForbiddenError',
    message,
  };
}
