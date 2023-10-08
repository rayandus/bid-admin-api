import { Injectable } from '@nestjs/common';
import AccountModel, { Account } from './account.model';

@Injectable()
export class AccountService {
  async deposit({
    userId,
    currency,
    amount,
  }: {
    userId: string;
    currency: string;
    amount: number;
  }): Promise<Account | null> {
    const updatedBalance = await AccountModel.deposit({ userId, currency, amount });

    return updatedBalance;
  }

  async getBalance(userId: string): Promise<Account | null> {
    return await AccountModel.findOne({ userId });
  }
}
