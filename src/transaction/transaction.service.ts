import {
    Injectable,
    BadRequestException,
    NotFoundException,
    ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTransactionDto } from './dtos/create-transaction.dto';

@Injectable()
export class TransactionService {
    constructor(private prisma: PrismaService) { }

    async transfer(senderId: string, dto: CreateTransactionDto) {
        if (senderId === dto.receiverId) {
            throw new BadRequestException('Você não pode transferir para si mesmo');
        }

        const sender = await this.prisma.user.findUnique({ where: { id: senderId } });
        const receiver = await this.prisma.user.findUnique({ where: { id: dto.receiverId } });

        if (!sender || !receiver) {
            throw new NotFoundException('Usuário não encontrado');
        }

        if (Number(sender.balance) < dto.amount) {
            throw new ForbiddenException('Saldo insuficiente');
        }

        return this.prisma.$transaction(async (tx) => {

            await tx.user.update({
                where: { id: senderId },
                data: { balance: { decrement: dto.amount } },
            });

            await tx.user.update({
                where: { id: dto.receiverId },
                data: { balance: { increment: dto.amount } },
            });

            return tx.transaction.create({
                data: {
                    senderId,
                    receiverId: dto.receiverId,
                    amount: dto.amount,
                    status: 'COMPLETED',
                },
            });
        });
    }

    async reverseTransaction(transactionId: string, requesterId: string) {
        const transaction = await this.prisma.transaction.findUnique({
            where: { id: transactionId },
        });

        if (!transaction) throw new NotFoundException('Transação não encontrada');
        if (transaction.status === 'REVERSED')
            throw new BadRequestException('Transação já foi revertida');

        if (transaction.senderId !== requesterId)
            throw new ForbiddenException('Você só pode reverter suas próprias transações');

        return this.prisma.$transaction(async (tx) => {

            const receiver = await tx.user.findUnique({ where: { id: transaction.receiverId } });
            if (!receiver || Number(receiver.balance) < Number(transaction.amount)) {
                throw new ForbiddenException('Saldo insuficiente do destinatário para reverter');
            }

            await tx.user.update({
                where: { id: transaction.receiverId },
                data: { balance: { decrement: transaction.amount } },
            });

            await tx.user.update({
                where: { id: transaction.senderId },
                data: { balance: { increment: transaction.amount } },
            });

            return tx.transaction.update({
                where: { id: transactionId },
                data: {
                    status: 'REVERSED',
                    reversedAt: new Date(),
                },
            });
        });
    }

    async getUserTransactions(userId: string) {
        return this.prisma.transaction.findMany({
            where: {
                OR: [{ senderId: userId }, { receiverId: userId }],
            },
            orderBy: { createdAt: 'desc' },
        });
    }
}
