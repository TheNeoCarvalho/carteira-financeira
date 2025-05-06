import { IsNotEmpty, IsPositive, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class GetBalanceDto {
    @IsUUID()
    @IsNotEmpty()
    @ApiProperty({ description: 'ID do usuário a ser buscado' })
    userId: string;

    @IsNotEmpty()
    @IsPositive({ message: 'O valor deve ser positivo' })
    @ApiProperty({ description: 'Valor da carteira' })
    balance: number;
}