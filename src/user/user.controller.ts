import {
  Body,
  Controller,
  Get,
  Headers,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { ApiHeader, ApiResponse } from '@nestjs/swagger';
import { createUserDTO } from './dto/user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Create new user success',
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'User already exist',
  })
  async register(@Body() user: createUserDTO) {
    try {
      return await this.userService.create(user);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @Get()
  @ApiHeader({
    name: 'access-token',
    description: 'Access token',
  })
  async getDetail(@Headers() headers: any) {
    const accessToken = headers['access-token'];
    try {
      return await this.userService.getDetail(accessToken);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
}
