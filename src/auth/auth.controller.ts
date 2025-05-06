import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dtos/register.dto';
import { LoginDto } from './dtos/login.dto';
import { ApiTags, ApiResponse } from '@nestjs/swagger';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('register')
    @ApiResponse({ status: 201, description: 'Usuário registrado com sucesso!!.' })
    @ApiResponse({ status: 400, description: 'Erro ao registrar usuário.' })
    @ApiResponse({ status: 500, description: 'Erro interno do servidor.' })
    register(@Body() dto: RegisterDto) {
        return this.authService.register(dto);
    }

    @Post('login')
    @ApiResponse({ status: 200, description: 'Usuário logado com sucesso!!.' })
    @ApiResponse({ status: 401, description: 'Credenciais inválidas.' })
    @ApiResponse({ status: 500, description: 'Erro interno do servidor.' })
    login(@Body() dto: LoginDto) {
        return this.authService.login(dto);
    }
}