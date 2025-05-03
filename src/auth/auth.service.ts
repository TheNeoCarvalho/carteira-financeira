import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { RegisterDto } from './dtos/register.dto';
import { LoginDto } from './dtos/login.dto';
import * as argon2 from 'argon2';

@Injectable()
export class AuthService {
    private readonly logger = new Logger(AuthService.name);

    constructor(
        private userService: UserService,
        private jwtService: JwtService
    ) { }

    async register(dto: RegisterDto) {
        const user = await this.userService.create(dto);
        this.logger.log('Usuário registrado com sucesso!!.');
        return this.generateToken(user.id, user.email);
    }

    async login(dto: LoginDto) {
        const user = await this.userService.findByEmail(dto.email);

        if (!user) {
            throw new UnauthorizedException('Credenciais inválidas');
        }

        const isMatch = await argon2.verify(user.password, dto.password);

        if (!isMatch) {
            throw new UnauthorizedException('Credenciais inválidas');
        }

        this.logger.log('Usuário logado com sucesso!!.');
        return this.generateToken(user.id, user.email);
    }

    generateToken(userId: string, email: string) {
        const payload = { sub: userId, email };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}
