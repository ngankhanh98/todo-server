import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { localDB } from '../config/database.config';
export const databaseProvider = TypeOrmModule.forRootAsync({
  imports: [
    ConfigModule.forRoot({
      load: [localDB],
    }),
  ],
  inject: [ConfigService],
  useFactory: (configService: ConfigService): TypeOrmModuleOptions => {
    return {
      ...configService.get('database'),
      cache: true,
      entities: ['"dist/**/*.entity{.ts,.js}"'],
    };
  },
});
