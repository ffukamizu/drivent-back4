import { ApplicationError } from '@/protocols';

export function ticketNotPaidError(): ApplicationError {
  return {
    name: 'ticketNotPaidError',
    message: 'User does not have paid for the ticket.',
  };
}
