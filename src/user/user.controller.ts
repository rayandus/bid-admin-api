import { Controller, Body, Post, Req, Get } from '@nestjs/common';
import { UserBody } from './user.dto';
import { UserService } from './user.service';
import { Public } from 'auth/auth.decorator';
import { Request } from 'common/types';
import { IUser } from './user.model';

@Controller('user')
export class UserController {
  constructor(private user: UserService) {}

  @Public()
  @Post('register')
  async register(@Body() body: UserBody): Promise<IUser> {
    const { email, password } = body;

    return await this.user.register(email, password);
  }

  @Get('me')
  async getMyProfile(@Req() req: Request): Promise<IUser | null> {
    const { userId } = req.user;

    const user = await this.user.findOneById(userId);

    return user;
  }
}
