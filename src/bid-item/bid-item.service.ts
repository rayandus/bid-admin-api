import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import BidItemModel, { BidItem, IBidItem as BidItemResponse } from './bid-item.model';

@Injectable()
export class BidItemService {
  constructor() {}

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

    const { startPrice } = bidItem;

    if (startPrice >= amount) {
      throw new BadRequestException('Bid amount is insufficient');
    }

    bidItem.currentBid = {
      bidderId: userId,
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
