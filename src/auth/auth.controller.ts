import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  ApiHeader,
  ApiHeaders,
  ApiOkResponse,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Request } from 'express';
import { ResetGrant } from 'src/common/guards/resetGrant.guard';
import { exceptionMessage } from '../constant';
import { AuthService } from './auth.service';
import { authDTO, createUserDTO } from './dto/auth.dto';

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

  @Get('/forgot-password')
  @ApiHeader({ name: 'username' })
  async getURLToken(@Req() req: Request) {
    const username = req.headers['username'].toString();
    return await this.authService.getURLToken(username);
  }

  @UseGuards(ResetGrant)
  @ApiQuery({ name: 'token' })
  @ApiHeader({ name: 'password' })
  @Post('/reset-password')
  async resetPassword(@Req() req: Request) {
    const username = req.body['username']; // from RestGrant
    const password = req.headers['password'];
    return await this.authService.setPassword(username, password);
  }
}
