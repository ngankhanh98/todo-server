import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from 'src/entities/user.entity';
import { authDTO } from './dto/auth.dto';
import { compare } from '../common/functions';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly authRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  public async validateUser(user: authDTO) {
    const users = await this.find(user);
    if (users.length) {
      try {
        const result = await compare(user.password, users[0].password);
        return result;
      } catch (error) {
        throw Error(error);
      }
    }
    throw Error('User not found');
  }

  public async login(user: authDTO) {
    const payload = { username: user.username };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
  private async find(user: authDTO) {
    return await this.authRepository.find({ username: user.username });
  }
}
