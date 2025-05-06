import { Controller, Post, Body, UseGuards, Request, Get, Req } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { AddBalanceDto } from './dtos/add-balance.dto';
import { ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { CreateWalletDto } from './dtos/create-wallet.dto';

@Controller('wallets')
@ApiResponse({ status: 201, description: 'Transação registrada com sucesso!!.' })
@ApiResponse({ status: 400, description: 'Você não pode transferir para si mesmo' })
@ApiResponse({ status: 403, description: 'Você não tem saldo suficiente' })
@ApiResponse({ status: 500, description: 'Erro interno no servidor' })
@ApiBearerAuth()
@UseGuards(JwtGuard)
export class WalletController {

    constructor(private readonly walletService: WalletService) { }


    @Get()
    @ApiResponse({ status: 200, description: 'Carteiras carregadas com sucesso!!.' })
    @ApiResponse({ status: 403, description: 'Você não tem permissão para acessar essas carteiras' })
    @ApiResponse({ status: 500, description: 'Erro interno no servidor' })
    async getUserWallets(@Req() req: Request & { user: { userId: string } }) {
        return this.walletService.getUserWallets(req.user.userId);
    }

    @Post()
    @ApiResponse({ status: 200, description: 'Carteira criada com sucesso.' })
    @ApiResponse({ status: 403, description: 'Você não tem permissão para visualizar essas carteiras' })
    @ApiResponse({ status: 500, description: 'Erro interno no servidor' })
    async create(@Body() createWalletDto: CreateWalletDto, @Request() req: any) {
        const userId = req.user.userId;
        createWalletDto.userId = userId;

        return this.walletService.createWallet(createWalletDto);
    }

    @Post('add-balance')
    @ApiResponse({ status: 200, description: 'Valor adiciona a carteira com sucesso.' })
    @ApiResponse({ status: 403, description: 'Você não tem permissão para visualizar essas carteiras' })
    @ApiResponse({ status: 500, description: 'Erro interno no servidor' })
    async addBalance(@Body() dto: AddBalanceDto) {
        console.log('Wallet Controller:', dto);
        return this.walletService.addBalance(dto);
    }
}