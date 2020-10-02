import * as elasticsearch from 'elasticsearch';
import * as mongoose from 'mongoose';

export const coreProviders = [
  {
    provide: 'ELASTIC_CONNECTION',
    useFactory: (): Promise<typeof elasticsearch.Client> => {
        return new elasticsearch.Client({
            host: process.env.ELASTIC_HOST,
            log: process.env.ELASTIC_DEBUG_LEVEL,
            apiVersion: process.env.ELASTIC_API_VERSION
        });
    }
  },
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: (): Promise<typeof mongoose> =>
      mongoose.connect(
        process.env.MONGO_HOST,
        {
          useNewUrlParser: true,
          useUnifiedTopology: true
        }
      ),
  },
];
