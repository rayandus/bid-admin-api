import { Injectable, ConflictException } from '@nestjs/common';
import UserModel, { IUser } from './user.model';
import { AccountService } from 'account/account.service';
import { config } from 'common/config';

@Injectable()
export class UserService {
  constructor(private accountService: AccountService) {}

  async register(email: string, password: string): Promise<IUser> {
    const isExists = await this.isExists(email);

    if (isExists) {
      throw new ConflictException('User already exists');
    }

    const user = new UserModel({ email, password });

    // Initialize balance
    await this.accountService.addBalance({ userId: user.id, currency: config.CURRENCY, amount: 0 });

    const updatedUser = await user.save();

    return updatedUser;
  }

  async findOne(email: string): Promise<IUser | null> {
    return await UserModel.findOne({ email });
  }

  async findOneById(id: string): Promise<IUser | null> {
    return await UserModel.findOne<IUser>({ _id: id });
  }

  async getUserWithPasswordHash(email: string): Promise<IUser | null> {
    try {
      return (await UserModel.findOne({ email }).select('+password')) as IUser;
    } catch {
      return null;
    }
  }

  async isExists(email: string): Promise<boolean> {
    const matchedUser = await UserModel.findOne({ email });

    return !!matchedUser;
  }
}
