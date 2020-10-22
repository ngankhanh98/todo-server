import {
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { Repository } from 'typeorm';
import { hash } from '../common/functions';
import { User } from '../entities/user.entity';
import { createUserDTO, getUserDTO } from './dto/user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  public async create(createUserDTO: createUserDTO) {
    const user = new User();
    const { username, password, fullname, email } = createUserDTO;

    const existed = await this.find(username);
    if (!existed.length) {
      try {
        user.password = hash(password);
        user.username = username;
        user.fullname = fullname;
        user.email = email;
        return await this.userRepository.save(user);
      } catch (error) {
        throw new InternalServerErrorException(error.message);
      }
    }

    throw new ConflictException('Username already exist');
  }

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
