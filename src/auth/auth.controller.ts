import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import {
  ApiAcceptedResponse,
  ApiBasicAuth,
  ApiCreatedResponse,
  ApiDefaultResponse,
  ApiOkResponse,
  ApiResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { authDTO } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post()
  @ApiCreatedResponse({
    status: HttpStatus.CREATED,
    description: 'Authenticated',
  })
  @ApiUnauthorizedResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthenticated',
  })
  async login(@Body() user: authDTO) {
    return await this.authService.login(user);
  }
}
