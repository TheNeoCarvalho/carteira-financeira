import { IsEmail, IsNotEmpty, MinLength } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
    @IsNotEmpty({ message: 'Nome não pode ser vazio' })
    @ApiProperty({ description: 'Nome do usuário a ser adicionado' })
    name: string;

    @IsEmail({ message: 'Email inválido' })
    @IsNotEmpty()
    @ApiProperty({ description: 'Email do usuário a ser adicionado' })
    email: string;

    @MinLength(8, { message: 'A senha deve ter pelo menos 8 caracteres' })
    @IsNotEmpty()
    @ApiProperty({ description: 'Senha do usuário a ser adicionado' })
    password: string;
}
