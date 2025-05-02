import { IsEmail, IsNotEmpty, MinLength } from '@nestjs/class-validator';

export class RegisterDto {
    @IsNotEmpty()
    name: string;

    @IsEmail()
    email: string;

    @MinLength(6)
    password: string;
}
