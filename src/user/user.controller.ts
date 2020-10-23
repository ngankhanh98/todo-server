import {
  Body,
  Controller,
  Get,
  UseGuards,
  UseInterceptors
} from '@nestjs/common';
import { ApiHeader, ApiTags } from '@nestjs/swagger';
import {
  Crud,
  CrudController,
  CrudRequest,
  CrudRequestInterceptor
} from '@nestjsx/crud';
import { plainToClass } from 'class-transformer';
import { Request } from 'express';
import { User } from 'src/entities/user.entity';
import { Guard } from '../common/guards/auth.guard';
import { getUserDTO } from './dto/user.dto';
import { UserService } from './user.service';

@ApiTags('User')
@UseGuards(Guard)
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
  async getMe(@Body() req: Request): Promise<getUserDTO> {
    const username = req['username']
    return plainToClass(getUserDTO, await this.service.getDetail(username));
  }
}
