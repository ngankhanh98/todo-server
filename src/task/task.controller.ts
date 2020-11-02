import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Crud, CrudController } from '@nestjsx/crud';
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
}
