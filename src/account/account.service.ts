import { Injectable } from '@nestjs/common';
import AccountModel, { Account } from './account.model';
import { config } from 'common/config';

@Injectable()
export class AccountService {
  async addBalance({
    userId,
    currency = config.CURRENCY,
    amount,
  }: {
    userId: string;
    currency?: string;
    amount: number;
  }): Promise<Account | null> {
    const updatedBalance = await AccountModel.updateBalance({ userId, currency, amount, mode: 'add' });

    return updatedBalance;
  }

  async deductBalance({
    userId,
    currency = config.CURRENCY,
    amount,
  }: {
    userId: string;
    currency?: string;
    amount: number;
  }): Promise<Account | null> {
    const updatedBalance = await AccountModel.updateBalance({ userId, currency, amount, mode: 'minus' });

    return updatedBalance;
  }

  async refund({
    userId,
    currency = config.CURRENCY,
    amount,
  }: {
    userId: string;
    currency?: string;
    amount: number;
  }): Promise<Account | null> {
    const updatedBalance = await AccountModel.updateBalance({ userId, currency, amount, mode: 'add' });

    return updatedBalance;
  }

  async getBalance(userId: string): Promise<Account | null> {
    return await AccountModel.findOne({ userId });
  }
}
