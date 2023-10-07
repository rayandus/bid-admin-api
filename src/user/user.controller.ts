import { Controller, Body, Post } from '@nestjs/common';
import { UserBody } from './user.dto';
import { UserService } from './user.service';
import { Public } from 'auth/auth.decorator';

@Controller('user')
export class UserController {
  constructor(private user: UserService) {}

  @Public()
  @Post('register')
  async register(@Body() body: UserBody) {
    const { email, password } = body;

    await this.user.register(email, password);

    return {};
  }
}
