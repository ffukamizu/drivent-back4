import { ApplicationError } from '@/protocols';

export function ticketNotFoundError(): ApplicationError {
  return {
    name: 'ticketNotFoundError',
    message: 'User does not have any tickets.',
  };
}
