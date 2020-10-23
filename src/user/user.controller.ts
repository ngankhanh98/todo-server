import {
  Body,
  Controller,
  Get,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ApiTags } from '@nestjs/swagger';
import {
  Crud,
  CrudController,
  CrudRequest,
  CrudRequestInterceptor,
  ParsedRequest,
} from '@nestjsx/crud';
import { plainToClass } from 'class-transformer';
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
@Controller('user')
export class UserController implements CrudController<User> {
  constructor(public service: UserService) {}

  @UseInterceptors(CrudRequestInterceptor)
  @Get('/me')
  async getMe(@Body() req: CrudRequest): Promise<getUserDTO> {
    const { username } = req;
    return plainToClass(getUserDTO, await this.service.getDetail(username));
  }
}
