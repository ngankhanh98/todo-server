import {
  CacheKey,
  CacheTTL,
  Controller,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiHeader, ApiTags } from '@nestjs/swagger';
import { Crud, CrudController, Override } from '@nestjsx/crud';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { Task } from '../entities/task.entity';
import { TaskService } from './task.service';

@UseGuards(JwtAuthGuard)
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

  @ApiHeader({ name: 'access-token' })
  @Override()
  @CacheKey('tasks')
  @CacheTTL(600)
  getMany(@Request() req) {
    const username = req['user'];
    return this.service.getTasksByCreator(username);
  }
}
