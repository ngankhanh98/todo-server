import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { authDTO } from './dto/auth.dto';

import { compare } from '../common/functions';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly authRepository: Repository<User>,
  ) {}

  async login(user: authDTO) {
    const { password } = user;

    const ret = await this.find(user);
    if (!ret.length) throw Error('User not found');

    try {
      return compare(password, ret[0].password);
    } catch (error) {
      throw Error(error);
    }
  }

  async find(user: authDTO) {
    return await this.authRepository.find({ username: user.username });
  }
}
