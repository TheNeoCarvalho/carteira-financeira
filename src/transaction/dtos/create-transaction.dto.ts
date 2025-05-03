import { IsNotEmpty, IsUUID, IsPositive } from 'class-validator';

export class CreateTransactionDto {
    @IsUUID()
    receiverId: string;

    @IsPositive()
    amount: number;
}
