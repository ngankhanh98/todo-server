import {
  HttpException,
  HttpStatus,
  Injectable
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
        const hashPassword = hash(password);
        user.password = hashPassword;
        [user.username, user.fullname, user.email, user.password] = [
          username,
          fullname,
          email,
          hashPassword,
        ];
        return await this.userRepository.save(user);
      } catch (error) {
        throw new HttpException(
          error.message,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }

    throw new HttpException('Username already exist', HttpStatus.CONFLICT);
  }

  public async getDetail(username): Promise<getUserDTO> {
    const user = await this.find(username);
    return plainToClass(getUserDTO, user[0]);
  }

  private async find(username: string) {
    return await this.userRepository.find({ username: username });
  }
}
