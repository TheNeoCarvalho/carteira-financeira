import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AddBalanceToUserDto } from '../user/dtos/add-balance.dto';
import { GetBalanceDto } from './dtos/get-balance.dto';
import { CreateWalletDto } from './dtos/create-wallet.dto';

@Injectable()
export class WalletService {
    constructor(private prisma: PrismaService) { }

    async addBalance(dto: AddBalanceToUserDto) {

        console.log('Wallet Service:', dto);

        const wallet = await this.prisma.wallet.findUnique({
            where: { id: dto.walletId },
        });

        if (!wallet) {
            throw new NotFoundException('Carteira não encontrada');
        }
        return await this.prisma.wallet.update({
            where: { id: dto.walletId },
            data: { balance: dto.amount },
        });
    }

    async createWallet(createWalletDto: CreateWalletDto) {
        const { userId, name } = createWalletDto;

        return this.prisma.wallet.create({
            data: {
                userId,
                name,
                balance: 0,
            },
        });
    }

    async getBalance(getBalanceDto: GetBalanceDto) {
        const { userId } = getBalanceDto;

        const wallets = await this.prisma.wallet.findMany({
            where: { userId },
        });

        return wallets.length > 0 ? wallets[0].balance : 0;
    }
}