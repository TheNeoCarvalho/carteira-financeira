import { Controller, Get, UseGuards, Req, Post, Body } from '@nestjs/common';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { UserService } from './user.service';
import { ApiTags, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { AddBalanceToUserDto } from './dtos/add-balance.dto';

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

    @Post('add-balance')
    @ApiResponse({ status: 200, description: 'Balance added successfully.' })
    @ApiBearerAuth()
    async addBalance(@Body() dto: AddBalanceToUserDto) {
        return this.userService.addBalance(dto);
    }
}
