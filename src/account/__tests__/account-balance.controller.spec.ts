import { Test, TestingModule } from '@nestjs/testing';
import { AccountBalanceController } from '../account-balance.controller';

describe('AccountBalanceController', () => {
  let controller: AccountBalanceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AccountBalanceController],
    }).compile();

    controller = module.get<AccountBalanceController>(AccountBalanceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
