import { Controller, Get, UseGuards, Req, Post, Body } from '@nestjs/common';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { UserService } from './user.service';
import { ApiTags, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';

@Controller('users')
@ApiTags('Users')
@ApiBearerAuth()
@UseGuards(JwtGuard)
export class UserController {

    constructor(private userService: UserService) { }

    @Get('me')
    @ApiResponse({ status: 200, description: 'Usuário logado com sucesso.' })
    @ApiResponse({ status: 401, description: 'Unauthorized.' })
    @ApiResponse({ status: 500, description: 'Erro interno no servidor.' })
    async getProfile(@Req() req: any) {
        return this.userService.getProfile(req.user.userId);
    }
}
