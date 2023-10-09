import { ApplicationError } from '@/protocols';

export function ticketUnauthorizedUserError(): ApplicationError {
  return {
    name: 'UnauthorizedError',
    message: 'You do not own this ticket',
  };
}
