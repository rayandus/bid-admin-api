import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '../auth.guard';
import { Reflector } from '@nestjs/core';
import { UserService } from 'user/user.service';

describe('AuthGuard', () => {
  let authGuard: AuthGuard;
  let jwtService: JwtService;
  let reflector: Reflector;
  let userService: UserService;

  beforeEach(() => {
    jwtService = {
      verifyAsync: jest.fn().mockReturnValue({}),
    } as any;

    reflector = {
      getAllAndOverride: jest.fn().mockReturnValue({}),
    } as any;

    // TO DO: Fix. Do not mock
    userService = {
      findOne: jest.fn().mockReturnValue({}),
    } as any;

    authGuard = new AuthGuard(jwtService, reflector, userService);
  });

  it('should be defined', () => {
    expect(authGuard).toBeDefined();
  });
});
