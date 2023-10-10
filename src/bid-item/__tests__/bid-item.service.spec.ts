import { Test, TestingModule } from '@nestjs/testing';
import { BidItemService } from '../bid-item.service';
import { AccountService } from 'account/account.service';

describe('BidItemService', () => {
  let service: BidItemService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BidItemService, AccountService],
    }).compile();

    service = module.get<BidItemService>(BidItemService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
