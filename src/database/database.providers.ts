import { TypeOrmModule } from '@nestjs/typeorm';
export const databaseProvider = TypeOrmModule.forRoot({
  type: 'mysql',
  host: 'www.db4free.net',
  port: 3306,
  username: 'ebanking',
  password: '123456789',
  database: 'ebanking',
  entities: ['"dist/**/*.entity{.ts,.js}"'],
  synchronize: true,
  autoLoadEntities: true,
  // keepConnectionAlive: true,
});
