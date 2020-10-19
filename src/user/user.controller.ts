import {
  Controller,
  Res,
  HttpStatus,
  Post,
  Req,
  Get,
  Param,
} from '@nestjs/common';
import { error } from 'console';
import { Request, Response } from 'express';

import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userController: UserService) {}
  @Get(':username')
  async getDetail(@Param() params, @Res() res: Response) {
    const { username } = params;
    try {
      const result = await this.userController.load(username);
      res.status(HttpStatus.OK).json(result);
    } catch (error) {
      res.status(HttpStatus.FORBIDDEN).json(error);
    }
  }

  // @Post('login')
  // async login(@Req() req: Request, @Res() res: Response) {

  // }

  @Post('register')
  async register(@Req() req: Request, @Res() res: Response) {
    const { username, password } = req.body;

    const notExist = await this.userController
      .find({ username })
      .then(result => result.length === 0)
      .catch(error => console.error(error));

    if (notExist) {
      try {
        await this.userController.insert({ username, password });
        res.status(HttpStatus.OK);
      } catch (error) {
        console.log('error', error);
        res.status(HttpStatus.EXPECTATION_FAILED).json(error);
      }
    }
  }
}
