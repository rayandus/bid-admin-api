import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth/auth.guard';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { UserModule } from './user/user.module';
import { AccountController } from './account/account.controller';
import { AccountService } from './account/account.service';
import { AccountModule } from './account/account.module';
import { BidItemController } from './bid-item/bid-item.controller';
import { BidItemService } from './bid-item/bid-item.service';
import { BidItemModule } from './bid-item/bid-item.module';
import { AppController } from 'app.controller';

@Module({
  imports: [AuthModule, UserModule, AccountModule, BidItemModule],
  controllers: [AppController, UserController, AccountController, BidItemController],
  providers: [
    UserService,
    AccountService,
    BidItemService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
