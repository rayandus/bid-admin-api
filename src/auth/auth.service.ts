import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'user/user.service';
import * as bcrypt from 'bcrypt';

export interface SignInResponse {
  token: string;
}

@Injectable()
export class AuthService {
  constructor(
    private user: UserService,
    private jwtService: JwtService,
  ) {}

  async login(email: string, password: string): Promise<SignInResponse> {
    const user = await this.user.getUserWithPasswordHash(email);

    if (!user) {
      throw new UnauthorizedException();
    }

    const isPasswordMatched = await bcrypt.compare(password, user.password);

    if (!isPasswordMatched) {
      throw new UnauthorizedException();
    }

    const payload = { sub: user.id, email: user.email, userId: user._id };
    const token = await this.jwtService.signAsync(payload);

    user.isLoggedIn = true;
    await user.save();

    return { token };
  }

  async logout(email: string): Promise<void> {
    const user = await this.user.findOne(email);

    if (!user) {
      return;
    }

    user.isLoggedIn = false;
    await user.save();
  }
}
