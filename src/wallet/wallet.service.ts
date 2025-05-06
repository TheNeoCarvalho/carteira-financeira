import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AddBalanceToUserDto } from '../user/dtos/add-balance.dto';
import { GetBalanceDto } from './dtos/get-balance.dto';
import { CreateWalletDto } from './dtos/create-wallet.dto';

@Injectable()
export class WalletService {

    private readonly logger = new Logger(WalletService.name);

    constructor(private prisma: PrismaService) { }

    async addBalance(dto: AddBalanceToUserDto) {

        console.log('Wallet Service:', dto);

        const wallet = await this.prisma.wallet.findUnique({
            where: { id: dto.walletId },
        });

        if (!wallet) {
            throw new NotFoundException('Carteira não encontrada');
        }

        this.logger.log('Valor adicionado com sucesso!!.');

        return await this.prisma.wallet.update({
            where: { id: dto.walletId },
            data: { balance: dto.amount },
        });
    }

    async createWallet(createWalletDto: CreateWalletDto) {
        const { userId, name, balance } = createWalletDto;

        this.logger.log('Carteira criada com sucesso!!.');

        return this.prisma.wallet.create({
            data: {
                userId,
                name,
                balance: balance || 0,
            },
        });
    }

    async getUserWallets(userId: string) {
        return this.prisma.wallet.findMany({
            where: { userId },
        });
    }

    async getBalance(getBalanceDto: GetBalanceDto) {
        const { userId } = getBalanceDto;

        this.logger.log('Valores da carteira exibidas com sucesso!!.');

        const wallets = await this.prisma.wallet.findMany({
            where: { userId },
        });

        return wallets.length > 0 ? wallets[0].balance : 0;
    }
}