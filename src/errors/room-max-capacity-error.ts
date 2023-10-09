import { ApplicationError } from '@/protocols';

export function roomMaxCapacityError(): ApplicationError {
  return {
    name: 'roomMaxCapacityError',
    message: 'This room is at max capacity.',
  };
}
