import {
  Controller,
  Get,
  Req
} from '@nestjs/common';
import { ApiHeader, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
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
