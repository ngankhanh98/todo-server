import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { ApiForbiddenResponse, ApiOkResponse } from '@nestjs/swagger';
import { createUserDTO } from './dto/user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  @ApiOkResponse({
    status: HttpStatus.CREATED,
    description: 'Create new user success',
  })
  @ApiForbiddenResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'Create new user fail',
  })
  async register(@Body() user: createUserDTO) {
    return await this.userService.create(user);
  }
}
