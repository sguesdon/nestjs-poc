import { Model, Document, Types } from 'mongoose';
import { MongoQuery, MongoQueryParams, ElasticQuery, ElasticQueryParams } from '../rest';
import { QueryResult, emptyQueryResult } from './query-result';

export class AbstractService<T extends Document> {

  constructor(private model: Model<T>) {}

  async create(data: T): Promise<T> {
    const record = new this.model(data);
    return await record.save();
  }

  async findById(id: string) : Promise<T> {
    return await this.model.findById(id);
  }

  async search(query ?: ElasticQuery) : Promise<QueryResult<T>> {
    return this.model.search(query.build());
  }

  async update(id: string, data: T): Promise<T> {
    const record = await this.findById(id);
    record.overwrite(data);
    return await record.save();
  }

  async patch(id: string, data: T): Promise<T> {
    const record = await this.findById(id);
    record.set(data);
    return await record.save();
  }

  async estimatedDocumentCount(query ?: MongoQuery): Promise<number> {
    return await this.model.estimatedDocumentCount(<any> query.getQuery()).exec();
  }

  async find(query ?: MongoQuery | Object, lean: boolean = true): Promise<T[]> {

    if(query instanceof Object) {
      query = new MongoQuery(<MongoQueryParams> { query });
    }

    const dataQuery = this.model.find(<any> query.getQuery());
    dataQuery.select(query.getFields());
    dataQuery.limit(query.getLimit());
    dataQuery.skip(query.getOffset());
    dataQuery.sort(query.getSort());
    dataQuery.setOptions({lean});
    return await dataQuery.exec();
  }

  async delete(id: string): Promise<void> {
    const record = await this.findById(id);
    await record.remove();
  }
}
