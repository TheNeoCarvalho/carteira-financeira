import { IsUUID, IsPositive } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateTransactionDto {
    @IsUUID()
    @ApiProperty()
    @IsNotEmpty({ message: 'O ID do usuário remetente não pode estar vazio' })
    receiverId: string;

    @IsPositive({ message: 'O valor deve ser positivo' })
    @ApiProperty()
    amount: number;
}
