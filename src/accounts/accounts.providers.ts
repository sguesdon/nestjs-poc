import { Connection } from 'mongoose';
import { AccountsSchema } from './accounts.schema';
var mexp = require('mongoose-elasticsearch-xp').v7;

export const accountProviders = [
  {
    provide: 'ACCOUNT_MODEL',
    useFactory: (connection: Connection, elasticConnection: any) => {
      AccountsSchema.plugin(mexp, {esClient: elasticConnection});
      return connection.model('Account', AccountsSchema);
    },
    inject: ['DATABASE_CONNECTION', 'ELASTIC_CONNECTION'],
  },
];
