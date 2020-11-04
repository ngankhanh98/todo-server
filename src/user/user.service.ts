import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { User } from '../entities/user.entity';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class UserService extends TypeOrmCrudService<User> {
  constructor(@InjectRepository(User) private readonly userRepository) {
    super(userRepository);
  }
  private readonly logger = new Logger(UserService.name);

  @Cron('45 * * * * *')
  public async findUserByUsername(username: string) {
    this.logger.log(this.findUserByUsername.name);
    return this.userRepository.findOne({ username: username });
  }
}
