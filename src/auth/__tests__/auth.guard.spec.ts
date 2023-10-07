import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '../auth.guard';
import { Reflector } from '@nestjs/core';

describe('AuthGuard', () => {
  let authGuard: AuthGuard;
  let jwtService: JwtService;
  let reflector: Reflector;

  beforeEach(() => {
    jwtService = {
      verifyAsync: jest.fn().mockReturnValue({}),
    } as any;

    reflector = {
      getAllAndOverride: jest.fn().mockReturnValue({}),
    } as any;

    authGuard = new AuthGuard(jwtService, reflector);
  });

  it('should be defined', () => {
    expect(authGuard).toBeDefined();
  });
});
