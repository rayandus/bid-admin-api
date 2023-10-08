import { Test, TestingModule } from '@nestjs/testing';
import { BidItemController } from '../bid-item.controller';

describe('BidItemController', () => {
  let controller: BidItemController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BidItemController],
    }).compile();

    controller = module.get<BidItemController>(BidItemController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
