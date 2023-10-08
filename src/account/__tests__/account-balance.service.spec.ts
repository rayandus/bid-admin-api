import { Test, TestingModule } from '@nestjs/testing';
import { AccountBalanceService } from '../account-balance.service';

describe('AccountBalanceService', () => {
  let service: AccountBalanceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AccountBalanceService],
    }).compile();

    service = module.get<AccountBalanceService>(AccountBalanceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
