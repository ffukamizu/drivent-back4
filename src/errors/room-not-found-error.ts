import { ApplicationError } from '@/protocols';

export function roomNotFoundError(): ApplicationError {
  return {
    name: 'roomNotFoundError',
    message: 'This room not exist.',
  };
}
