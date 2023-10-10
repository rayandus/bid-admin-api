import { Controller, Post, Body, Req, Get } from '@nestjs/common';
import { DepositBody, depositBodySchema } from './account.dto';
import { Request } from 'common/types';
import { AccountService } from './account.service';
import { Account } from './account.model';
import { JoiValidationPipe } from 'common/validation-pipe/joi-validation.pipe';

@Controller('account')
export class AccountController {
  constructor(private accountBalanceService: AccountService) {}

  @Post('deposit')
  async deposit(@Req() req: Request, @Body(new JoiValidationPipe(depositBodySchema)) body: DepositBody) {
    const { userId } = req.user;
    const { amount } = body;

    const updatedBalance = await this.accountBalanceService.addBalance({ userId, amount });

    return updatedBalance;
  }

  @Get('balance')
  async getBalance(@Req() req: Request): Promise<Account | null> {
    const { userId } = req.user;

    return await this.accountBalanceService.getBalance(userId);
  }
}
