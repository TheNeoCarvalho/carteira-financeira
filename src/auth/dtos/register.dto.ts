import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
    @IsNotEmpty()
    @ApiProperty()
    name: string;

    @IsEmail()
    @ApiProperty()
    email: string;

    @MinLength(6)
    @ApiProperty()
    password: string;
}