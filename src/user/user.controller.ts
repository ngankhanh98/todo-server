import { Body, Controller, HttpStatus, Post, Req, Res } from '@nestjs/common';
import { ApiParam, ApiResponse } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { createUserDTO } from './dto/user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Create success',
  })
  async register(@Body() user: createUserDTO) {
    return await this.userService.create(user);
  }
}
