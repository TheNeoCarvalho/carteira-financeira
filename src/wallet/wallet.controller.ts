import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { AddBalanceDto } from './dtos/add-balance.dto';
import { ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { CreateWalletDto } from './dtos/create-wallet.dto';

@Controller('wallet')
@ApiResponse({ status: 201, description: 'Transação registrada com sucesso!!.' })
@ApiResponse({ status: 400, description: 'Você não pode transferir para si mesmo' })
@ApiResponse({ status: 403, description: 'Você não tem saldo suficiente' })
@ApiResponse({ status: 500, description: 'Erro interno no servidor' })
@ApiBearerAuth()
@UseGuards(JwtGuard)
export class WalletController {
    constructor(private readonly walletService: WalletService) { }

    @Post()
    async create(@Body() createWalletDto: CreateWalletDto, @Request() req: any) {
        const userId = req.user.userId;
        createWalletDto.userId = userId;

        return this.walletService.createWallet(createWalletDto);
    }

    @Post('add-balance')
    async addBalance(@Body() dto: AddBalanceDto) {
        console.log('Wallet Controller:', dto);
        return this.walletService.addBalance(dto);
    }
}