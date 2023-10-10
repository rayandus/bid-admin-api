import { Module } from '@nestjs/common';
import { BidItemController } from './bid-item.controller';
import { BidItemService } from './bid-item.service';
import { AccountService } from 'account/account.service';

@Module({
  controllers: [BidItemController],
  providers: [BidItemService, AccountService],
  exports: [BidItemService],
})
export class BidItemModule {}
