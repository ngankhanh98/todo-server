import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Cache } from 'cache-manager';

import { Task } from '../entities/task.entity';

@Injectable()
export class TaskService extends TypeOrmCrudService<Task> {
  constructor(
    // @Inject(CACHE_MANAGER) private readonly cacheManager,
    @InjectRepository(Task) private readonly taskRepository,
  ) {
    super(taskRepository);
  }

  // public async FindAll() {
  //   const response =
  //     (await this.cacheManager.get('tasks')) ??
  //     (await this.taskRepository.find({}));
  //   this.cacheManager.set('tasks', response, 20);
  //   return response;
  // }
}
