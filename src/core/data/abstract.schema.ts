import * as mongoose from 'mongoose';
import { QueryResult, emptyQueryResult } from './query-result';

export class AbstractSchema extends mongoose.Schema {

  constructor(... args) {
    super(... args);
    this.statics.search = this.search;
  }

  async search(...args) : Promise<any> {

    let typeError: any, rawResult: any;
    const me: any = this;

    if(typeof me.esSearch === 'undefined') {
      throw `search option not active for this data model`;
    }

    try {
      rawResult = await me.esSearch(...args);
    } catch(queryError) {

      try {
        typeError = JSON.parse(queryError.response).error.type;
      } catch(err) {
        throw queryError;
      }

      if(typeError === 'index_not_found_exception') {
        await me.esCreateMapping();
        return emptyQueryResult;
      }

      throw queryError;
    }

    return <QueryResult<object>> {
      total: rawResult.hits.total.value,
      data: rawResult.hits.hits.map((r) => ({ _id: r._id, ...r._source }))
    };
  }
}
