import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';

import { AuthService } from './auth.service';
import { authDTO } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post()
  async login(@Body() user: authDTO) {
    try {
      const isValid = await this.authService.validateUser(user);
      if (isValid) return await this.authService.login(user);
      throw new HttpException('Password wrong', HttpStatus.FORBIDDEN);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
