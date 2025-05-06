import { Test } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as argon2 from 'argon2';

describe('AuthService', () => {
    let service: AuthService;
    let userService: Partial<UserService>;
    let jwtService: Partial<JwtService>;

    beforeEach(async () => {
        userService = {
            findByEmail: jest.fn().mockResolvedValue({
                id: '133db5d7-2d39-46c5-bd87-f0735178661',
                email: 'manoel@gmail.com',
                password: await argon2.hash('manoel12345'),
            }),
        };

        jwtService = {
            sign: jest.fn().mockReturnValue('mock-token'),
        };

        const module = await Test.createTestingModule({
            providers: [
                AuthService,
                { provide: UserService, useValue: userService },
                { provide: JwtService, useValue: jwtService },
            ],
        }).compile();

        service = module.get(AuthService);
    });

    it('should validate and return token', async () => {
        const token = await service.login({
            email: 'manoel@gmail.com',
            password: 'manoel12345',
        });

        expect(token.access_token).toBe('mock-token');
    });
});
