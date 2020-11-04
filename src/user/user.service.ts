import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { User } from '../entities/user.entity';
import { Cron, CronExpression, SchedulerRegistry } from '@nestjs/schedule';

@Injectable()
export class UserService extends TypeOrmCrudService<User> {
  constructor(
    @InjectRepository(User) private readonly userRepository,
    private schedulerRegistry: SchedulerRegistry,
  ) {
    super(userRepository);
  }
  private readonly logger = new Logger(UserService.name);

  public async findUserByUsername(username: string) {
    return this.userRepository.findOne({ username: username });
  }
}
