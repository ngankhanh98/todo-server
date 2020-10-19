import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { repository } from 'src/constant';

@Injectable()
export class UserService {
  constructor(
    @Inject(repository.USER) private readonly userRepository: Repository<User>,
  ) {}
  async load(username) {
    return await this.userRepository.find({ username: username });
  }
  async find(condition) {
    return await this.userRepository.find({
      where: condition,
    });
  }
  async insert({ username, password }) {
    return await this.userRepository.insert({ username, password });
  }
}
