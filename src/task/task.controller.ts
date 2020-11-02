import {
  CacheKey,
  CacheTTL,
  Controller
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import {
  Crud,
  CrudController,
  CrudRequest,
  Override,
  ParsedRequest
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
  constructor(readonly service: TaskService) {}

  get base(): CrudController<Task> {
    return this;
  }
  @Override()
  @CacheKey('tasks')
  @CacheTTL(600)
  getMany(@ParsedRequest() req: CrudRequest) {
    return this.service.getAll('ngankhanh98');
  }
}
