import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Logger,
  Post,
  Req,
  Request,
  UseGuards,
} from '@nestjs/common';
import {
  ApiHeader,
  ApiOkResponse,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtResetPwdGuard } from 'src/common/guards/jwt-resetpwd.guard';
import { UserService } from 'src/user/user.service';
import { LocalAuthGuard } from '../common/guards/local-auth.guard';
import { exceptionMessage } from '../constant';
import { AuthService } from './auth.service';
import { authDTO, createUserDTO, resetPwdDTO } from './dto/auth.dto';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private readonly userService: UserService,
  ) {}

  private readonly logger = new Logger(AuthController.name);

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
    this.logger.debug(req);    
    return await this.authService.login(req);
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
    this.logger.debug(user);
    await this.authService.register(user);
  }

  @Get('/forgot-password')
  @ApiHeader({ name: 'username' })
  async getURLToken(@Req() req: Request) {
    const username = req.headers['username'].toString();
    return await this.authService.getResetPwdToken(username);
  }

  @UseGuards(JwtResetPwdGuard)
  @ApiQuery({ name: 'token' })
  @Post('/reset-password')
  async resetPassword(@Request() req, @Body() request: resetPwdDTO) {
    const username = req['user'];
    const password = req.body['password'];

    return await this.authService.setPassword(username, password);
  }

  
}
