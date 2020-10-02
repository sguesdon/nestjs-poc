import { Module } from '@nestjs/common';
import { AccountsController } from './accounts.controller';
import { AccountsService } from './accounts.service';
import { accountProviders } from './accounts.providers';
import { CoreModule } from '../core';

@Module({
  imports: [CoreModule],
  controllers: [AccountsController],
  providers: [
    AccountsService,
    ... accountProviders,
  ],
})
export class AccountsModule {}
