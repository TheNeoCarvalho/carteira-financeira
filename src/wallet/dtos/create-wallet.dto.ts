import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { IsPositive } from '@nestjs/class-validator';

export class CreateWalletDto {
    @IsNotEmpty()
    @ApiProperty({ description: 'ID do usuário a ser adicionado' })
    userId: string;

    @IsNotEmpty()
    @ApiProperty({ description: 'Nome da carteira' })
    name: string;

    @IsNotEmpty()
    @IsPositive({ message: 'O valor deve ser positivo' })
    @ApiProperty({ description: 'Saldo inicial da carteira' })
    balance: number;
}