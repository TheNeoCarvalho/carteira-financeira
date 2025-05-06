import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dtos/create-user.dto';
import * as argon2 from 'argon2';

@Injectable()
export class UserService {

    private readonly logger = new Logger(UserService.name);

    constructor(private prisma: PrismaService) { }

    async create(dto: CreateUserDto) {
        const hashedPassword = await argon2.hash(dto.password);

        this.logger.log('Usuário registrado com sucesso!!.');

        return this.prisma.user.create({
            data: {
                name: dto.name,
                email: dto.email,
                password: hashedPassword,
            },
        });
    }

    async findByEmail(email: string) {
        return this.prisma.user.findUnique({ where: { email } });
    }

    async findById(id: string) {
        return this.prisma.user.findUnique({ where: { id } });
    }

    async getProfile(id: string) {
        const user = await this.findById(id);
        if (!user) return null;

        const { password, ...rest } = user;
        return rest;
    }

}
