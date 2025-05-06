import { IsNotEmpty, IsPositive, IsUUID } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AddBalanceToUserDto {
    @IsUUID()
    @IsNotEmpty()
    @ApiProperty({ description: 'ID do usuário a ser adicionado' })
    walletId: string;

    @IsNotEmpty()
    @IsPositive({ message: 'O valor deve ser positivo' })
    @ApiProperty({ description: 'O valor a ser adicionado' })
    amount: number;
}