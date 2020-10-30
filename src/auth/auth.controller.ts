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
import { LocalAuthGuard } from './local-auth.guard';
import { JwtAuthGuard } from './jwt-auth.guard';
// import { LocalAuthGuard } from '../common/guards/local-auth.guard';
// import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
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
  async login(@Body() req: authDTO) {
    console.log('req', req);
    return this.authService.login(req);
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

  // @UseGuards(JwtAuthGuard)
  @Get('/forgot-password')
  @ApiHeader({ name: 'username' })
  async getURLToken(@Req() req: Request) {
    const username = req.headers['username'].toString();
    return await this.authService.getURLToken(username);
  }

  // @UseGuards(ResetGrant)
  // @UseGuards(JwtAuthGuard)
  @ApiQuery({ name: 'token' })
  @ApiHeader({ name: 'password' })
  @Post('/reset-password')
  async resetPassword(@Req() req: Request) {
    const username = req.body['username']; // from RestGrant
    const password = req.headers['password'];
    return await this.authService.setPassword(username, password);
  }
}
