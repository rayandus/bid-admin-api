import { Injectable, ConflictException } from '@nestjs/common';
import UserModel, { User } from './user.model';

@Injectable()
export class UserService {
  async register(email: string, password: string): Promise<void> {
    const isExists = await this.isExists(email);

    if (isExists) {
      throw new ConflictException('User already exists');
    }

    const account = new UserModel({ email, password });

    await account.save();
  }

  async findOne(email: string): Promise<User | null> {
    return await UserModel.findOne({ email });
  }

  async getUserWithPasswordHash(email: string): Promise<User | null> {
    try {
      return (await UserModel.findOne({ email }).select('+password')) as User;
    } catch {
      return null;
    }
  }

  async isExists(email: string): Promise<boolean> {
    const matchedUser = await UserModel.findOne({ email });

    return !!matchedUser;
  }
}
