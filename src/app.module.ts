import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database/database.module';
import { TaskController } from './task/task.controller';
import { TaskModule } from './task/task.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [UserModule, DatabaseModule, AuthModule, TaskModule],
  controllers: [AppController, TaskController],
  providers: [AppService],
})
export class AppModule {}
