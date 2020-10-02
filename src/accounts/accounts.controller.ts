import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { MongoQuery, RestMongoQuery, ElasticQuery, RestElasticQuery } from '../core/rest';
import { QueryResult } from '../core/data';

import { AccountsService } from './accounts.service';
import { Account } from './account.interface';

@Controller('accounts')
export class AccountsController {

  constructor(private accountsService: AccountsService) {}

  @Get()
  async find(@RestMongoQuery() query: MongoQuery): Promise<{data: Account[], total: number}> {
    const [data, total] = await Promise.all([
      this.accountsService.find(query),
      this.accountsService.estimatedDocumentCount(query)
    ]);
    return {data, total};
  }

  @Get('search')
  async search(@RestElasticQuery() query: ElasticQuery) : Promise<QueryResult<Account>> {
    return await this.accountsService.search(query);
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<Account> {
    return await this.accountsService.findById(id);
  }

  @Post()
  async create(@Body() data: any): Promise<Account> {
    return await this.accountsService.create(data);
  }

  @Put(':id')
  async update(@Body() data: any, @Param('id') id: string): Promise<Account> {
    return await this.accountsService.update(id, data);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    await this.accountsService.delete(id);
  }
}
