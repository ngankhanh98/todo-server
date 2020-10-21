import { Controller, HttpStatus, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userController: UserService) {}
  @Post()
  async register(@Req() req: Request, @Res() res: Response) {
    const { username, password } = req.body;
    
    try {
      await this.userController.create({ username, password });
      res.status(HttpStatus.CREATED).json('success');
    } catch (error) {
      res.status(HttpStatus.UNPROCESSABLE_ENTITY).json(error);
      throw error;
    }
  }
}
