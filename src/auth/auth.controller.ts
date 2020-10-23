import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { ApiOkResponse, ApiResponse, ApiTags } from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { authDTO, createUserDTO } from './dto/auth.dto';
import { exceptionMessage } from '../constant';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  @ApiOkResponse({
    description: 'Authenticated',
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: exceptionMessage.PASSWORD_INCORRECT,
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: exceptionMessage.INTERNAL_ERROR,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: exceptionMessage.USER_NOT_FOUND,
  })
  async login(@Body() user: authDTO) {
    await this.authService.validateUser(user);
    return await this.authService.login(user);
  }

  @Post('/register')
  @ApiOkResponse({
    status: HttpStatus.CREATED,
    description: exceptionMessage.USER_CREATED,
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: exceptionMessage.INTERNAL_ERROR,
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: exceptionMessage.USER_ALREADY_EXIST,
  })
  async register(@Body() user: createUserDTO) {
    await this.authService.register(user);
  }
}
