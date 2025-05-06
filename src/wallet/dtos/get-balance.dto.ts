import { IsNotEmpty, IsPositive, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class GetBalanceDto {
    @IsUUID()
    @IsNotEmpty()
    @ApiProperty({ description: 'ID do usuário a ser buscado' })
    userId: string;

    @IsNotEmpty()
    @ApiProperty()
    balance: number;
}