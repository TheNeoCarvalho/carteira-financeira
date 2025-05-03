import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dtos/register.dto';
import { LoginDto } from './dtos/login.dto';
import { ApiTags, ApiResponse } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('register')
    @ApiResponse({ status: 201, description: 'Usuário registrado com sucesso!!.' })
    register(@Body() dto: RegisterDto) {
        return this.authService.register(dto);
    }

    @Post('login')
    @ApiResponse({ status: 200, description: 'Usuário logado com sucesso!!.' })
    login(@Body() dto: LoginDto) {
        return this.authService.login(dto);
    }
}