import { Controller, Post, Body, UseGuards, Req, Param, Get } from '@nestjs/common';
import { Request } from 'express';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { TransactionService } from './transaction.service';
import { CreateTransactionDto } from './dtos/create-transaction.dto';

@Controller('transactions')
@UseGuards(JwtGuard)
export class TransactionController {
    constructor(private readonly transactionService: TransactionService) { }

    @Post()
    async transfer(@Req() req: Request & { user: { userId: string } }, @Body() dto: CreateTransactionDto) {
        const senderId = req.user.userId;
        return this.transactionService.transfer(senderId, dto);
    }

    @Post(':id/reverse')
    async reverse(@Req() req: Request & { user: { userId: string } }, @Param('id') id: string) {
        return this.transactionService.reverseTransaction(id, req.user.userId);
    }

    @Get()
    async getUserTransactions(@Req() req: Request & { user: { userId: string } }) {
        return this.transactionService.getUserTransactions(req.user.userId);
    }
}
