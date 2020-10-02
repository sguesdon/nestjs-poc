import { createParamDecorator, ExecutionContext, HttpException, HttpStatus } from '@nestjs/common';
import { MongoQuery, MongoQueryParams, ElasticQuery, ElasticQueryParams } from './query';

export const RestMongoQuery = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    try {
      return new MongoQuery(<MongoQueryParams> request.query);
    } catch(err) {
      throw new HttpException({
          status: HttpStatus.BAD_REQUEST,
          error: err.message,
        },
        HttpStatus.BAD_REQUEST
      );
    }
  },
);

export const RestElasticQuery = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    try {
      return new ElasticQuery(<ElasticQueryParams> request.query);
    } catch(err) {
      throw new HttpException({
          status: HttpStatus.BAD_REQUEST,
          error: err.message,
        },
        HttpStatus.BAD_REQUEST
      );
    }
  },
)
