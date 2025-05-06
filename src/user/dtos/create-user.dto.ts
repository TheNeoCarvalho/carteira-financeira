import { IsEmail, IsNotEmpty, MinLength } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
    @IsNotEmpty()
    @ApiProperty({ description: 'Nome do usuário a ser adicionado' })
    name: string;

    @IsEmail()
    @IsNotEmpty()
    @ApiProperty({ description: 'Email do usuário a ser adicionado' })
    email: string;

    @MinLength(6)
    @IsNotEmpty()
    @ApiProperty({ description: 'Senha do usuário a ser adicionado' })
    password: string;
}
