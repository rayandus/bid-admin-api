import { Test, TestingModule } from '@nestjs/testing';
import { BidItemController } from '../bid-item.controller';
import { AccountService } from 'account/account.service';
import { BidItemService } from 'bid-item/bid-item.service';

describe('BidItemController', () => {
  let controller: BidItemController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BidItemController],
      providers: [BidItemService, AccountService],
    }).compile();

    controller = module.get<BidItemController>(BidItemController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
