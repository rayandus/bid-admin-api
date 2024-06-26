import { Body, Controller, Post, Req, Get, HttpCode } from '@nestjs/common';
import { AuthService, SignInResponse } from './auth.service';
import { Public } from './auth.decorator';
import { LoginBodyDto, loginBodySchema } from './auth.dto';
import { UsePipes } from '@nestjs/common/decorators';
import { JoiValidationPipe } from 'common/validation-pipe/joi-validation.pipe';
import { HttpStatus } from '@nestjs/common/enums';
import { Request } from 'common/types';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('login')
  @UsePipes(new JoiValidationPipe(loginBodySchema))
  async login(@Body() body: LoginBodyDto): Promise<SignInResponse> {
    const { email, password } = body;

    return this.authService.login(email, password);
  }

  @HttpCode(HttpStatus.OK)
  @Post('logout')
  async logout(@Req() req: Request) {
    const { email } = req.user;

    this.authService.logout(email);
  }

  @Get('profile')
  getProfile(@Req() req: Request) {
    return req.user;
  }
}
