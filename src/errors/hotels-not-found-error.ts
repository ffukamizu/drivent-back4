import { ApplicationError } from '@/protocols';

export function hotelsNotFoundError(): ApplicationError {
  return {
    name: 'hotelsNotFoundError',
    message: 'There are no hotels registered.',
  };
}
