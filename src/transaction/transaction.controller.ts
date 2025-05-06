import { Controller, Post, Body, UseGuards, Req, Param, Get } from '@nestjs/common';
import { Request } from 'express';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { TransactionService } from './transaction.service';
import { CreateTransactionDto } from './dtos/create-transaction.dto';
import { ApiTags, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('transactions')
@Controller('transactions')
@UseGuards(JwtGuard)
export class TransactionController {
    constructor(
        private readonly transactionService: TransactionService
    ) { }

    @Post()
    @ApiResponse({ status: 201, description: 'Transação registrada com sucesso!!.' })
    @ApiResponse({ status: 400, description: 'Você não pode transferir para si mesmo' })
    @ApiResponse({ status: 403, description: 'Você não tem saldo suficiente' })
    @ApiResponse({ status: 500, description: 'Erro interno no servidor' })
    @ApiBearerAuth()
    async transfer(@Req() req: Request & { user: { userId: string } }, @Body() dto: CreateTransactionDto) {
        const senderId = req.user.userId;
        return this.transactionService.transfer(senderId, dto);
    }

    @Post(':id/revert')
    @ApiResponse({ status: 201, description: 'Transação revertida com sucesso!!.' })
    @ApiResponse({ status: 400, description: 'Operação já realizada' })
    @ApiResponse({ status: 403, description: 'Você só pode reverter suas próprias transações' })
    @ApiResponse({ status: 500, description: 'Erro interno no servidor' })
    @ApiBearerAuth()
    async reverse(@Req() req: Request & { user: { userId: string } }, @Param('id') id: string) {
        return this.transactionService.reverseTransaction(id, req.user.userId);
    }

    @Get()
    @ApiResponse({ status: 200, description: 'Transações garregadas com sucesso!!.' })
    @ApiResponse({ status: 403, description: 'Você não tem permissão para acessar essas transações' })
    @ApiResponse({ status: 500, description: 'Erro interno no servidor' })
    @ApiBearerAuth()
    async getUserTransactions(@Req() req: Request & { user: { userId: string } }) {
        return this.transactionService.getUserTransactions(req.user.userId);
    }
}
