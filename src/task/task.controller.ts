import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import {
  Crud,
  CrudController,
  CrudRequest,
  Override,
  ParsedRequest,
} from '@nestjsx/crud';

import { Task } from '../entities/task.entity';
import { TaskService } from './task.service';

@Crud({
  model: {
    type: Task,
  },
})
@ApiTags('Task')
@Controller('task')
export class TaskController implements CrudController<Task> {
  constructor(private readonly service: TaskService) {}

  @Override()
  async getMany(@ParsedRequest() req: CrudRequest) {
    // return await this.service.FindAll()
    const result = await this.service.FindAll();
    console.log('result', result);
    return result;
  }
}
