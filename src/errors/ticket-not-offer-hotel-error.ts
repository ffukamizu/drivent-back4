import { ApplicationError } from '@/protocols';

export function ticketNotOfferHotel(): ApplicationError {
  return {
    name: 'ticketNotOfferHotel',
    message: 'Ticket user select does not offer hotel.',
  };
}
