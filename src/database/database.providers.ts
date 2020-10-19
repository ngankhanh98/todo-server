import { createConnection } from 'typeorm';
import { database } from '../constant';
export const databaseProviders = [
  {
    provide: database.DATABASE_CONNECTION,
    useFactory: async () =>
      await createConnection({
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: 'root',
        database: 'todo',
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        synchronize: true,
      }),
  },
];
