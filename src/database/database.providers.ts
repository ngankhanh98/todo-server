import { TypeOrmModule } from '@nestjs/typeorm';
export const databaseProvider = TypeOrmModule.forRoot({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'root',
  database: 'todo',
  entities: ['"dist/**/*.entity{.ts,.js}"'],
  synchronize: true,
  autoLoadEntities: true,
  keepConnectionAlive: true,
});
