import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateWalletDto {
    @IsNotEmpty()
    @ApiProperty({ description: 'ID do usuário a ser adicionado' })
    userId: string;

    @IsNotEmpty()
    @ApiProperty({ description: 'Nome da carteira' })
    name: string;

    @IsNotEmpty()
    @ApiProperty({ description: 'Saldo inicial da carteira' })
    balance: number;
}