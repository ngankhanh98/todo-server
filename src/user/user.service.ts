import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SchedulerRegistry } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { User } from '../entities/user.entity';

@Injectable()
export class UserService extends TypeOrmCrudService<User> {
  constructor(
    @InjectRepository(User) private readonly userRepository,
    private schedulerRegistry: SchedulerRegistry,
    private readonly jwtService: JwtService,
  ) {
    super(userRepository);
  }
  private readonly logger = new Logger(UserService.name);

  public async findUserByUsername(username: string) {
    return this.userRepository.findOne({ username: username });
  }

  // FIXME: I don't know if I placed it properly, or this should go for auth.service
  // however, I place it here with the attention using JWT_AUTH_SECRET, differ from auth.service
  // using JWT_RESET_SECRET
  public async getAccessToken(user: any) {
  
    const payload = { username: user.username };
    const accessToken = this.jwtService.sign(payload);
    this.logger.debug(accessToken);
    this.logger.debug(this.jwtService);

    return await { accessToken: accessToken };
  }
}
