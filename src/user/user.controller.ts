import { Controller, Get, UseGuards, Req, Post, Body } from '@nestjs/common';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { UserService } from './user.service';
import { ApiTags, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
@UseGuards(JwtGuard)
export class UserController {

    constructor(private userService: UserService) { }

    @Get('me')
    @ApiResponse({ status: 200, description: 'User logged in successfully.' })
    @ApiBearerAuth()
    async getProfile(@Req() req: any) {
        return this.userService.getProfile(req.user.userId);
    }
}
