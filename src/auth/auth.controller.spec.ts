import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { RegisterDto } from './dtos/register.dto';
import { LoginDto } from './dtos/login.dto';

describe('AuthController', () => {
    let controller: AuthController;
    let authService: Partial<AuthService>;

    beforeEach(async () => {
        authService = {
            register: jest.fn().mockResolvedValue({ id: 'user-1' }),
            login: jest.fn().mockResolvedValue({ access_token: 'mock-token' }),
        };

        const module: TestingModule = await Test.createTestingModule({
            controllers: [AuthController],
            providers: [{ provide: AuthService, useValue: authService }],
        }).compile();

        controller = module.get<AuthController>(AuthController);
    });

    it('should register a user', async () => {
        const dto: RegisterDto = { name: 'Test User', email: 'test@example.com', password: '123456' };
        const result = await controller.register(dto);
        expect(result).toHaveProperty('id');
    });

    it('should login a user', async () => {
        const dto: LoginDto = { email: 'test@example.com', password: '123456' };
        const result = await controller.login(dto);
        expect(result.access_token).toBe('mock-token');
    });
});