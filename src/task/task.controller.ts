import {
  Body,
  CacheKey,
  CacheTTL,
  Controller,
  Post,
  Request,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiHeader, ApiTags } from '@nestjs/swagger';
import {
  Crud,
  CrudController,
  CrudRequestInterceptor,
  Override,
} from '@nestjsx/crud';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { Task } from '../entities/task.entity';
import { getTaskDTO } from './dto/task.dto';
import { TaskService } from './task.service';

@UseGuards(JwtAuthGuard)
@ApiHeader({ name: 'access-token' })

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
  getMany(@Request() req) {
    const username = req['user'];
    return this.service.getTasksByCreator(username);
  }

  @UseInterceptors(CrudRequestInterceptor)
  @Post('/new-task')
  async addNewTask(@Body() req: getTaskDTO) {
    return this.service.addNewTask(req);
  }
}
