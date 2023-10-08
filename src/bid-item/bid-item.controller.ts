import { Body, Controller, Post, Req, Get, Put, Param } from '@nestjs/common';
import { Request } from 'common/types';
import { BidItemService } from './bid-item.service';
import {
  CreateBidItemBody,
  PlaceBidItemBody,
  PlaceBidItemParam,
  createBidItemBodySchema,
  placeBidItemBodySchema,
  placeBidItemParamSchema,
} from './bid-item.dto';
import { IBidItem as BidItemResponse, BidItemStatusEnum } from './bid-item.model';
import { JoiValidationPipe } from 'common/validation-pipe/joi-validation.pipe';

@Controller('bid-item')
export class BidItemController {
  constructor(private bidItemService: BidItemService) {}

  @Post()
  async create(
    @Req() req: Request,
    @Body(new JoiValidationPipe(createBidItemBodySchema)) body: CreateBidItemBody,
  ): Promise<BidItemResponse> {
    const { userId } = req.user;

    const { name, startPrice, expiryDuration, isActive } = body;

    const bidItem = await this.bidItemService.create({
      userId,
      name,
      startPrice,
      expiryDuration,
      isActive,
      ...(isActive ? { expiryStartDateTime: new Date() } : {}),
      status: BidItemStatusEnum.ONGOING,
    });

    return bidItem;
  }

  @Put(':bidItemId')
  async placeBid(
    @Req() req: Request,
    @Param(new JoiValidationPipe(placeBidItemParamSchema)) param: PlaceBidItemParam,
    @Body(new JoiValidationPipe(placeBidItemBodySchema)) body: PlaceBidItemBody,
  ): Promise<BidItemResponse> {
    const { userId } = req.user;
    const { bidItemId } = param;
    const { amount } = body;

    return this.bidItemService.placeBid({
      userId,
      bidItemId,
      amount,
    });
  }

  @Get()
  async list(@Req() req: Request): Promise<BidItemResponse[]> {
    const { userId } = req.user;

    return await this.bidItemService.list({ userId });
  }

  @Get('all')
  async listAll(): Promise<BidItemResponse[]> {
    return await this.bidItemService.list({ isActive: true });
  }
}
