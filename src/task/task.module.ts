import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from 'src/entities/task.entity';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { BullModule } from '@nestjs/bull';
import { TaskProcessor } from './task.processor';

@Module({
  imports: [
    TypeOrmModule.forFeature([Task]),
    BullModule.registerQueue({ name: 'task' }),
  ],
  providers: [TaskService, TaskProcessor],
  exports: [TaskService],
  controllers: [TaskController],
})
export class TaskModule {}
