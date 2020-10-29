// export default () => ({
//   type: process.env.TYPEORM_CONNECTION,
//   host: process.env.TYPEORM_HOST,
//   port: parseInt(process.env.TYPEORM_PORT, 10),
//   username: process.env.TYPEORM_USERNAME,
//   password: process.env.TYPEORM_PASSWORD,
//   database: process.env.TYPEORM_DATABASE,
//   synchronize: process.env.TYPEORM_SYNCHRONIZE,
//   autoLoadEntities: process.env.TYPEORM_AUTO_LOAD_ENTITIES,
//   keepConnectionAlive: process.env.TYPEORM_KEEP_CONNECTION_ALIVE,
// });

import { registerAs } from '@nestjs/config';

export const localDB = registerAs('database', () => ({
  type: process.env.TYPEORM_CONNECTION,
  host: process.env.TYPEORM_HOST,
  port: parseInt(process.env.TYPEORM_PORT, 10),
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE,
  synchronize: process.env.TYPEORM_SYNCHRONIZE,
  autoLoadEntities: process.env.TYPEORM_AUTO_LOAD_ENTITIES,
  keepConnectionAlive: process.env.TYPEORM_KEEP_CONNECTION_ALIVE,
}));

export const remoteDB = registerAs('database', () => ({
  type: process.env.TYPEORM_CONNECTION,
  host: process.env.REMOTE_TYPEORM_HOST,
  port: parseInt(process.env.REMOTE_TYPEORM_PORT, 10),
  username: process.env.REMOTE_TYPEORM_USERNAME,
  password: process.env.REMOTE_TYPEORM_PASSWORD,
  database: process.env.REMOTE_TYPEORM_DATABASE,
  synchronize: process.env.TYPEORM_SYNCHRONIZE,
  autoLoadEntities: process.env.TYPEORM_AUTO_LOAD_ENTITIES,
  keepConnectionAlive: process.env.TYPEORM_KEEP_CONNECTION_ALIVE,
}));
