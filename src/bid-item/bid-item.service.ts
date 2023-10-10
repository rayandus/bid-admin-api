import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import BidItemModel, { BidItem, IBidItem as BidItemResponse } from './bid-item.model';
import { AccountService } from 'account/account.service';

@Injectable()
export class BidItemService {
  constructor(private accountService: AccountService) {}

  async create(data: BidItem): Promise<BidItemResponse> {
    const item = new BidItemModel(data);

    return await item.save();
  }

  async placeBid({
    userId,
    bidItemId,
    amount,
  }: {
    userId: string;
    bidItemId: string;
    amount: number;
  }): Promise<BidItemResponse> {
    const bidItem = await BidItemModel.findById(bidItemId);

    if (!bidItem) {
      throw new NotFoundException();
    }

    const { currentPrice, currentBid } = bidItem;

    if (currentPrice >= amount) {
      throw new BadRequestException('Bid amount is insufficient');
    }

    if (currentBid) {
      await this.accountService.refund({ userId: currentBid.userId, amount: currentBid.amount });
    }

    await this.accountService.deductBalance({ userId, amount });

    bidItem.currentBid = {
      userId,
      amount,
    };

    return await bidItem.save();
  }

  async list({ isActive, userId }: { isActive?: boolean; userId?: string }): Promise<BidItemResponse[]> {
    const filters = {
      ...(userId ? { userId } : {}),
      ...(isActive !== undefined ? { isActive } : {}),
    };

    return await BidItemModel.find(filters);
  }
}
