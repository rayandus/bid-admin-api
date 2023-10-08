import { Controller, Post, Body, Req, Get } from '@nestjs/common';
import { DepositBody } from './account.dto';
import { Request } from 'common/types';
import { AccountService } from './account.service';
import { Account } from './account.model';
import { config } from 'common/config';

@Controller('account')
export class AccountController {
  constructor(private accountBalanceService: AccountService) {}

  @Post('deposit')
  async deposit(@Req() req: Request, @Body() body: DepositBody) {
    const { userId } = req.user;
    const { amount } = body;

    const updatedBalance = await this.accountBalanceService.deposit({ userId, currency: config.CURRENCY, amount });

    return updatedBalance;
  }

  @Get('balance')
  async getBalance(@Req() req: Request): Promise<Account | null> {
    const { userId } = req.user;

    return await this.accountBalanceService.getBalance(userId);
  }
}
