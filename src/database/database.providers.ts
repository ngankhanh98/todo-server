import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { localDB, remoteDB } from '../config/database.config';
export const databaseProvider = TypeOrmModule.forRootAsync({
  imports: [
    ConfigModule.forRoot({
      load: [localDB],
      //TODO: switch to remoteDB before push master and deploy
      // load: [remoteDB],
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
