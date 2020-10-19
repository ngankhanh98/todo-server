import { Connection } from 'typeorm';

import { User } from './user.entity';
import { database, repository } from '../constant';

export const UserProvider = [
  {
    provide: repository.USER,
    useFactory: (connection: Connection) => connection.getRepository(User),
    inject: [database.DATABASE_CONNECTION],
  },
];
