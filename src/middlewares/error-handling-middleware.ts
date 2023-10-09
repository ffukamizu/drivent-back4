import { Request, Response, NextFunction } from 'express';
import httpStatus from 'http-status';
import { ApplicationError, RequestError } from '@/protocols';

export function handleApplicationErrors(
  err: RequestError | ApplicationError | Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
) {
  if (err.name === 'CannotEnrollBeforeStartDateError') {
    return res.status(httpStatus.BAD_REQUEST).send({
      message: err.message,
    });
  }

  if (err.name === 'ConflictError' || err.name === 'DuplicatedEmailError') {
    return res.status(httpStatus.CONFLICT).send({
      message: err.message,
    });
  }

  if (err.name === 'InvalidCredentialsError' || err.name === 'JsonWebTokenError') {
    return res.status(httpStatus.UNAUTHORIZED).send({
      message: err.message,
    });
  }

  if (err.name === 'InvalidDataError') {
    return res.status(httpStatus.BAD_REQUEST).send({
      message: err.message,
    });
  }

  if (err.name === 'NotFoundError') {
    return res.status(httpStatus.NOT_FOUND).send({
      message: err.message,
    });
  }

  if (err.name === 'DuplicatedEmailError') {
    return res.status(httpStatus.CONFLICT).send({
      message: err.message,
    });
  }

  if (err.name === 'UnauthorizedError') {
    return res.status(httpStatus.UNAUTHORIZED).send({
      message: err.message,
    });
  }

  if (err.name === 'EnrollmentNotFoundError') {
    return res.status(httpStatus.NOT_FOUND).send({
      message: err.message,
    });
  }

  if (err.name === 'ticketNotFoundError') {
    return res.status(httpStatus.NOT_FOUND).send({
      message: err.message,
    });
  }

  if (err.name === 'ticketTypeNotFoundError') {
    return res.sendStatus(httpStatus.NOT_FOUND);
  }

  if (err.name === 'ticketNotPaidError') {
    return res.sendStatus(httpStatus.PAYMENT_REQUIRED);
  }

  if (err.name === 'ticketNotOfferHotel') {
    return res.sendStatus(httpStatus.PAYMENT_REQUIRED);
  }

  if (err.name === 'hotelsNotFoundError') {
    return res.sendStatus(httpStatus.NOT_FOUND);
  }

  if (err.name === 'bookingNotFoundError') {
    return res.sendStatus(httpStatus.NOT_FOUND);
  }

  if (err.name === 'roomNotFoundError') {
    return res.sendStatus(httpStatus.NOT_FOUND);
  }

  if (err.name === 'roomMaxCapacityError') {
    return res.sendStatus(httpStatus.FORBIDDEN);
  }

  if (err.name === 'bookingAlreadyExistError') {
    return res.sendStatus(httpStatus.FORBIDDEN);
  }

  if (err.name === 'bookingForbiddenError') {
    return res.sendStatus(httpStatus.FORBIDDEN);
  }

  if (err.name === 'InvalidCEPError') {
    return res.status(httpStatus.BAD_REQUEST).send({
      message: err.message,
    });
  }

  if (err.name === 'CannotListHotelsError') {
    return res.status(httpStatus.PAYMENT_REQUIRED).send(err.message);
  }

  if (err.hasOwnProperty('status') && err.name === 'RequestError') {
    return res.status((err as RequestError).status).send({
      message: err.message,
    });
  }

  /* eslint-disable-next-line no-console */
  console.error(err);
  res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
    error: 'InternalServerError',
    message: 'Internal Server Error',
  });
}
