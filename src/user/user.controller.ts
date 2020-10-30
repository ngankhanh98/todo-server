import {
  Controller,
  Get,
  Request,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiHeader, ApiTags } from '@nestjs/swagger';
import { Crud, CrudController, CrudRequestInterceptor } from '@nestjsx/crud';
import { plainToClass } from 'class-transformer';
import { User } from 'src/entities/user.entity';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { getUserDTO } from './dto/user.dto';
import { UserService } from './user.service';

@ApiTags('User')
@UseGuards(JwtAuthGuard)
@Crud({
  model: {
    type: User,
  },
  routes: {
    exclude: [
      'createOneBase',
      'createManyBase',
      'getManyBase',
      'replaceOneBase',
    ],
  },
  params: {
    username: {
      field: 'username',
      type: 'string',
      primary: true,
    },
  },
  serialize: {
    get: getUserDTO,
    update: getUserDTO,
  },
})
@ApiHeader({
  name: 'access-token',
})
@Controller('user')
export class UserController implements CrudController<User> {
  constructor(public service: UserService) {}

  @UseInterceptors(CrudRequestInterceptor)
  @Get('/me')
  async getMe(@Request() req) {
    const username = req['user'];
    return plainToClass(getUserDTO, await this.service.FindOne(username));
  }
}
