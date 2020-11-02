import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';

import { Task } from '../entities/task.entity';

@Injectable()
export class TaskService extends TypeOrmCrudService<Task> {
  constructor(@InjectRepository(Task) private readonly taskRepository) {
    super(taskRepository);
  }

  public async FindAll() {
    return this.taskRepository.find({});
  }
}
