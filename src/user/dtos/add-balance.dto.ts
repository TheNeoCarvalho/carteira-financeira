import { IsNotEmpty, IsPositive, IsUUID } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AddBalanceToUserDto {
    @IsUUID()
    @IsNotEmpty()
    @ApiProperty({ description: 'ID do usuário a ser adicionado' })
    @IsNotEmpty()
    walletId: string;

    @IsNotEmpty()
    @IsPositive()
    @ApiProperty({ description: 'O valor a ser adicionado' })
    amount: number;
}