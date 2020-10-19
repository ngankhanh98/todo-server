import { Module } from '@nestjs/common';

import { DatabaseModule } from '../database/database.module';
import { UserProvider } from './user.provider';
import { UserService } from './user.service';
import { UserController } from './user.controller';
@Module({
  imports: [DatabaseModule],
  providers: [UserService, ...UserProvider],
  controllers: [UserController],
})
export class UserModule {}
