import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Queue } from 'bull';
import { InjectQueue } from '@nestjs/bull';
import { Task } from '../entities/task.entity';
import { getTaskDTO } from './dto/task.dto';

@Injectable()
export class TaskService extends TypeOrmCrudService<Task> {
  constructor(
    @InjectRepository(Task) private readonly taskRepository,
    @InjectQueue('task') private readonly taskQueue: Queue,
  ) {
    super(taskRepository);
  }

  async getTasksByCreator(username: string) {
    return this.taskRepository.find({ creator: username });
  }

  async addNewTask(task: getTaskDTO) {
    console.log('task', task);
    this.taskQueue.add('newTask', { data: task });
  }
}
