import {
  Injectable,
  InternalServerErrorException
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { getUserDTO } from './dto/user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  public async getDetail(username): Promise<getUserDTO> {
    try {
      const user = await this.find(username);
      return plainToClass(getUserDTO, user[0]);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  private async find(username: string) {
    try {
      return await this.userRepository.find({ username: username });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
