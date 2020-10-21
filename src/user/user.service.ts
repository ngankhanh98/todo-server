import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { hash } from '../common/functions';
import { User } from '../entities/user.entity';
import { createUserDTO } from './dto/user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDTO: createUserDTO) {
    const user = new User();
    const { username, password, fullname, email } = createUserDTO;

    const existed = await this.find(username);
    if (existed.length) throw Error('Username already exist');

    try {
      const hashPassword = hash(password);
      user.password = hashPassword;
      [user.username, user.fullname, user.email] = [username, fullname, email];
    } catch (error) {
      throw Error(error);
    }

    return await this.userRepository.save(user);
  }

  async find(username: string) {
    return await this.userRepository.find({ username: username });
  }
}
