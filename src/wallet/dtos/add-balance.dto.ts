import { IsNotEmpty, IsPositive, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AddBalanceDto {
    @IsUUID()
    @IsNotEmpty()
    @ApiProperty({ description: 'ID do usuário a ser adicionado' })
    walletId: string;

    @IsNotEmpty()
    @IsPositive()
    @ApiProperty({ description: 'O valor a ser adicionado' })
    amount: number;
}