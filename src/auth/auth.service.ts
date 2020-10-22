import {
  ConflictException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { exceptionMessage } from 'src/constant';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { compare, hash } from '../common/functions';
import { authDTO, createUserDTO } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly authRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  public async validateUser(user: authDTO) {
    const users = await this.find(user);
    if (users.length) {
      try {
        const isValid = await compare(user.password, users[0].password);
        if (!isValid)
          throw new ForbiddenException(exceptionMessage.PASSWORD_INCORRECT);
        return true;
      } catch (error) {
        throw new InternalServerErrorException(error.message);
      }
    }
    throw new NotFoundException(exceptionMessage.USER_NOT_FOUND);
  }

  public async login(user: authDTO) {
    const payload = { username: user.username };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
  private async find(user: authDTO | createUserDTO) {
    return await this.authRepository.find({ username: user.username });
  }

  public async register(user: createUserDTO) {
    const newUser = new User();
    const { username, password, fullname, email } = user;

    const existed = await this.find(user);
    if (!existed.length) {
      try {
        newUser.password = hash(password);
        newUser.username = username;
        newUser.fullname = fullname;
        newUser.email = email;
        return await this.authRepository.save(newUser);
      } catch (error) {
        throw new InternalServerErrorException(error.message);
      }
    }

    throw new ConflictException(exceptionMessage.USER_ALREADY_EXIST);
  }
}
