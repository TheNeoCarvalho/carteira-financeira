import { IsUUID, IsPositive } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTransactionDto {
    @IsUUID()
    @ApiProperty()
    receiverId: string;

    @IsPositive()
    @ApiProperty()
    amount: number;
}
