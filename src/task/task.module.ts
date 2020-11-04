import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MulterModule } from '@nestjs/platform-express';
import { TypeOrmModule } from '@nestjs/typeorm';
import multer from 'src/config/multer.config';
import { Task } from 'src/entities/task.entity';
import { TaskController } from './task.controller';
import { TaskProcessor } from './task.processor';
import { TaskService } from './task.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Task]),
    BullModule.registerQueue({ name: 'task' }),
    MulterModule.registerAsync({
      imports: [
        ConfigModule.forRoot({
          load: [multer],
        }),
      ],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        ...configService.get('multer'),
      }),
    }),
  ],
  providers: [TaskService, TaskProcessor],
  exports: [TaskService],
  controllers: [TaskController],
})
export class TaskModule {}
