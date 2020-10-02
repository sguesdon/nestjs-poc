import _ from 'lodash';

export interface MongoQueryParams {
  offset ?: number,
  limit ?: number,
  query ?: string,
  sort ?: string,
  fields ?: string
}

export class MongoQuery {

  private offset: number = 0;
  private limit: number = 25;
  private query: Object = {};
  private sort: Object = {};
  private fields: Object = {};

  constructor(params : MongoQueryParams) {

      if(typeof params.offset !== 'undefined') {
        const offset = parseInt((params.offset).toString());
        if(offset === NaN || offset < 0) {
          throw new Error('invalid offset parameter')
        }
        this.offset = offset;
      }

      if(typeof params.limit !== 'undefined') {
        const limit = parseInt((params.limit).toString());
        if(limit === NaN || limit < 0) {
          throw new Error('invalid limit parameter')
        }
        this.limit = limit;
      }

      if(typeof params.query !== 'undefined') {
        try {
          params.query = JSON.parse(params.query);
        } catch(err) {
          throw new Error('query parameter parsing error');
        }
        if(typeof params.query !== 'object' || Array.isArray(params.query)) {
          throw new Error('invalid query paramter');
        }
        this.query = params.query;
      }

      if(typeof params.sort !== 'undefined') {
        try {
          params.sort = JSON.parse(params.sort);
        } catch(err) {
          throw new Error('sort parameter parsing error');
        }
        if(typeof params.sort !== 'object' || Array.isArray(params.sort)) {
          throw new Error('invalid sort paramter');
        }
        this.sort = params.sort;
      }

      if(typeof params.fields !== 'undefined') {
        try {
          params.fields = JSON.parse(params.fields);
        } catch(err) {
          throw new Error('fields parameter parsing error');
        }
        if(typeof params.fields !== 'object' || Array.isArray(params.fields)) {
          throw new Error('invalid fields paramter');
        }
        this.fields = params.fields;
      }
  }

  getOffset(): number {
    return this.offset;
  }

  setOffset(offset: number) {
    this.offset = offset;
  }

  getLimit(): number {
    return this.limit;
  }

  setLimit(offset: number) {
    this.offset = offset;
  }

  getQuery(): Object {
    return Object.assign({}, this.query);
  }

  setQuery(query: Object) {
    this.query = Object.assign({}, query);
  }

  haveQuery(): Boolean {
    return (Object.keys(this.query).length > 0) ? true : false;
  }

  mergeQuery(query: Object): void {
    this.setQuery(_.merge({}, this.getQuery(), query));
  }

  surroundQuery(query: Object): void {
    this.setQuery({
      $and: [
        this.getQuery(),
        query
      ]
    });
  }

  getSort(): Object {
    return this.sort;
  }

  setSort(sort: Object) {
    this.sort = sort;
  }

  haveSort(): Boolean {
    return (Object.keys(this.sort).length > 0) ? true : false;
  }

  getFields(): Object {
    return this.fields;
  }

  setFields(fields: Object) {
    this.fields = fields;
  }

  haveFields(): Boolean {
    return (Object.keys(this.fields).length > 0) ? true : false;
  }
}

export interface ElasticQueryParams {
  offset ?: number,
  limit ?: number,
  query ?: string,
  sort ?: string,
  fields ?: string
}

export class ElasticQuery {

  private offset: number = 0;
  private limit: number = 25;
  private query: Object = {};
  private sort: Array<any> = [];
  private fields: Array<any> = [];

  constructor(params : ElasticQueryParams) {

      if(typeof params.offset !== 'undefined') {
        const offset = parseInt((params.offset).toString());
        if(offset === NaN || offset < 0) {
          throw new Error('invalid offset parameter')
        }
        this.offset = offset;
      }

      if(typeof params.limit !== 'undefined') {
        const limit = parseInt((params.limit).toString());
        if(limit === NaN || limit < 0) {
          throw new Error('invalid limit parameter')
        }
        this.limit = limit;
      }

      if(typeof params.query !== 'undefined') {
        try {
          params.query = JSON.parse(params.query);
        } catch(err) {
          throw new Error('query parameter parsing error');
        }
        if(typeof params.query !== 'object' || Array.isArray(params.query)) {
          throw new Error('invalid query paramter');
        }
        this.query = params.query;
      }

      if(typeof params.sort !== 'undefined') {
        try {
          params.sort = JSON.parse(params.sort);
        } catch(err) {
          throw new Error('sort parameter parsing error');
        }
        if(typeof params.sort !== 'object' || !Array.isArray(params.sort)) {
          throw new Error('invalid sort paramter');
        }
        this.sort = params.sort;
      }

      if(typeof params.fields !== 'undefined') {
        try {
          params.fields = JSON.parse(params.fields);
        } catch(err) {
          throw new Error('fields parameter parsing error');
        }
        if(typeof params.fields !== 'object' || !Array.isArray(params.fields)) {
          throw new Error('invalid fields paramter');
        }
        this.fields = params.fields;
      }
  }

  getOffset(): number {
    return this.offset;
  }

  setOffset(offset: number) {
    this.offset = offset;
  }

  getLimit(): number {
    return this.limit;
  }

  setLimit(offset: number) {
    this.offset = offset;
  }

  getQuery(): Object {
    return Object.assign({}, this.query);
  }

  setQuery(query: Object) {
    this.query = Object.assign({}, query);
  }

  haveQuery(): Boolean {
    return (Object.keys(this.query).length > 0) ? true : false;
  }

  mergeQuery(query: Object): void {
    this.setQuery(_.merge({}, this.getQuery(), query));
  }

  surroundQuery(query: Object): void {
    this.setQuery({
      $and: [
        this.getQuery(),
        query
      ]
    });
  }

  getSort(): Array<any> {
    return this.sort;
  }

  setSort(sort: Array<any>) {
    this.sort = sort;
  }

  haveSort(): Boolean {
    return (this.sort.length > 0) ? true : false;
  }

  getFields(): Array<any> {
    return this.fields;
  }

  setFields(fields: Array<any>) {
    this.fields = fields;
  }

  haveFields(): Boolean {
    return (this.fields.length > 0) ? true : false;
  }

  build(): Object {

    const query : any = {
      from: this.getOffset(),
      size: this.getLimit()
    };

    if(this.haveQuery()) {
      query.query = this.getQuery();
    } else {
      query.query = {match_all: {}};
    }

    if(this.haveSort()) {
      query.sort = this.getSort();
    }

    if(this.haveFields()) {
      query.fields = this.getFields()
    }

    return query;
  }
}
