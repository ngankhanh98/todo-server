import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Crud, CrudController } from '@nestjsx/crud';

import { User } from '../entities/user.entity';
import { UserService } from './user.service';

@ApiTags('User')
@Crud({
  model: {
    type: User,
  },
  params: {
    username: {
      field: 'username',
      type: 'string',
      primary: true,
    },
  },
})
@Controller('user')
export class UserController implements CrudController<User> {
  constructor(public service: UserService) {}
}
