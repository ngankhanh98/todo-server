import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Req,
} from '@nestjs/common';
import { ApiHeader, ApiResponse, ApiTags } from '@nestjs/swagger';
import { plainToClass } from 'class-transformer';
import { createUserDTO, getUserDTO } from './dto/user.dto';
import { UserService } from './user.service';

@ApiTags('User')
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
  async register(@Body() user: createUserDTO): Promise<getUserDTO> {
    return await plainToClass(getUserDTO, this.userService.create(user));
  }

  @Get()
  @ApiHeader({
    name: 'access-token',
    description: 'Access token',
  })
  async getDetail(@Req() req: any) {
    const { username } = req;
    return await this.userService.getDetail(username);
  }
}
