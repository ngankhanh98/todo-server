import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { exceptionMessage } from 'src/constant';
import { User } from 'src/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { compare, hash } from '../common/utils';
import { createUserDTO } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly authRepository: Repository<User>,
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  public async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userService.FindOne(username);
    const verify = user ? await compare(password, user.password) : false;

    if (user && verify) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }

  // private async find(username: string) {
  //   try {
  //     return await this.authRepository.findOne({ username: username });
  //   } catch (error) {
  //     throw new InternalServerErrorException(error.message);
  //   }
  // }

  public async register(user: createUserDTO) {
    const newUser = new User();
    const { username, password, fullname, email } = user;

    const existedUser = await this.userService.FindOne(user.username);
    if (!existedUser)
      try {
        newUser.password = hash(password);
        newUser.username = username;
        newUser.fullname = fullname;
        newUser.email = email;
        return await this.authRepository.save(newUser);
      } catch (error) {
        throw new InternalServerErrorException(error.message);
      }

    throw new ConflictException(exceptionMessage.USER_ALREADY_EXIST);
  }

  public async getResetPwdToken(username: string) {
    const existedUser = await this.userService.FindOne(username);
    const payload = { username: username };

    if (!existedUser)
      throw new NotFoundException(exceptionMessage.USER_NOT_FOUND);

    return await this.jwtService.sign(payload, {
      secret: process.env.JWT_RESET_PWD_SECRET,
      expiresIn: process.env.JWT_EXPIRE,
    });
  }

  public async setPassword(username, newPassword) {
    return await this.authRepository.update(
      { username: username },
      { password: hash(newPassword) },
    );
  }
}