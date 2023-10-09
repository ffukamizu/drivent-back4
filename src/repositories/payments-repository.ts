import { Payment } from '@prisma/client';
import { prisma } from '@/config';

async function findPayment(ticketId: number) {
  return prisma.payment.findFirst({ where: { ticketId } });
}

async function createPayment(data: CreatePayment) {
  return prisma.payment.create({
    data,
  });
}
type CreatePayment = Omit<Payment, 'id' | 'createdAt' | 'updatedAt'>;

export const paymentRepository = { findPayment, createPayment };
