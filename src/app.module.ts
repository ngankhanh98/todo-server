import { CacheInterceptor, CacheModule, Module, Logger } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database/database.module';
import { TaskController } from './task/task.controller';
import { TaskModule } from './task/task.module';
import { UserModule } from './user/user.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    UserModule,
    DatabaseModule,
    AuthModule,
    TaskModule,
    CacheModule.register(),
    ScheduleModule.forRoot(),
    Logger
  ],
  controllers: [AppController, TaskController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
  ],
})
export class AppModule {}
