import { Model } from 'mongoose';
import { Injectable, Inject } from '@nestjs/common';
import { Account } from './account.interface';

import { AbstractService } from '../core/data';

@Injectable()
export class AccountsService extends AbstractService<Account> {
  constructor(@Inject('ACCOUNT_MODEL') model: Model<Account>) {
    super(model);
  }
}
