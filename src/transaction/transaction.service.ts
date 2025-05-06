import {
    Injectable,
    BadRequestException,
    NotFoundException,
    ForbiddenException,
    Logger,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTransactionDto } from './dtos/create-transaction.dto';
import { Decimal } from '@prisma/client/runtime/library';

@Injectable()
export class TransactionService {

    private readonly logger = new Logger(TransactionService.name);

    constructor(private prisma: PrismaService) { }

    async transfer(senderId: string, dto: CreateTransactionDto) {
        if (senderId === dto.receiverId) {
            throw new BadRequestException('Você não pode transferir para si mesmo');
        }

        const senderWallets = await this.prisma.wallet.findMany({ where: { userId: senderId } });
        const receiverWallets = await this.prisma.wallet.findMany({ where: { userId: dto.receiverId } });

        if (senderWallets.length === 0 || receiverWallets.length === 0) {
            throw new NotFoundException('Wallet do usuário não encontrada');
        }

        const senderWallet = senderWallets[0];
        const receiverWallet = receiverWallets[0];

        if (Number(senderWallet.balance) < dto.amount) {
            throw new ForbiddenException('Saldo insuficiente');
        }

        return this.prisma.$transaction(async (tx) => {

            await tx.wallet.update({
                where: { id: senderWallet.id },
                data: { balance: { decrement: dto.amount } },
            });

            await tx.wallet.update({
                where: { id: receiverWallet.id },
                data: { balance: { increment: dto.amount } },
            });

            this.logger.log('Transação registrada com sucesso!!.');

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

        this.logger.log('Transação revertida com sucesso!!.');

        return this.prisma.$transaction(async (tx) => {

            const receiverWallets = await tx.wallet.findMany({ where: { userId: transaction.receiverId } });
            const senderWallets = await tx.wallet.findMany({ where: { userId: transaction.senderId } });

            if (receiverWallets.length === 0 || senderWallets.length === 0) {
                throw new NotFoundException('Wallet do usuário não encontrada');
            }

            const receiverWallet = receiverWallets[0];
            const senderWallet = senderWallets[0];

            if (Number(receiverWallet.balance) < Number(transaction.amount)) {
                throw new ForbiddenException('Saldo insuficiente do destinatário para reverter');
            }

            await tx.wallet.update({
                where: { id: receiverWallet.id },
                data: { balance: { decrement: Number(transaction.amount) } },
            });

            await tx.wallet.update({
                where: { id: senderWallet.id },
                data: { balance: { increment: Number(transaction.amount) } },
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

        this.logger.log('Transações carregadas com sucesso!!.');

        return this.prisma.transaction.findMany({
            where: {
                OR: [{ senderId: userId }, { receiverId: userId }],
            },
            orderBy: { createdAt: 'desc' },
        });
    }
}
