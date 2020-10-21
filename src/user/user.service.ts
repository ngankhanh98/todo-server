import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { createUserDTO } from './dto/user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}
  create(createUserDTO: createUserDTO): Promise<User> {
    const user = new User();
    user.username = createUserDTO.username;
    user.password = createUserDTO.password;

    return this.userRepository.save(user);
  }
}
