import { ApplicationError } from '@/protocols';

export function ticketTypeNotFoundError(): ApplicationError {
  return {
    name: 'ticketTypeNotFoundError',
    message: 'This type of ticket not exist.',
  };
}
