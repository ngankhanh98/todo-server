import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { User } from '../entities/user.entity';

@Injectable()
export class UserService extends TypeOrmCrudService<User> {
  constructor(@InjectRepository(User) private readonly userRepository) {
    super(userRepository);
  }
  public async findOneTaskByOwner(username: string) {
    return this.userRepository.findOne({ username: username });
  }
}
