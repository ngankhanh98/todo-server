import {
  ConflictException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { exceptionMessage, secret } from 'src/constant';
import { User } from 'src/entities/user.entity';
import { getUserDTO } from 'src/user/dto/user.dto';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { compare, hash } from '../common/functions';
import { authDTO, createUserDTO } from './dto/auth.dto';

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
    const verify = await compare(password, user.password);

    if (user && verify) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  // public async login(user: authDTO) {
  //   const payload = { username: user.username };
  //   const info = plainToClass(getUserDTO, await this.find(user.username));
  //   const accessToken = this.jwtService.sign(payload, {
  //     secret: secret.loginSecret,
  //     expiresIn: secret.expire,
  //   });
  //   return { ...info, accessToken };
  // }

  async login(user: any) {
    const payload = { username: user.username };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }

  private async find(username: string) {
    try {
      return await this.authRepository.findOne({ username: username });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  public async register(user: createUserDTO) {
    const newUser = new User();
    const { username, password, fullname, email } = user;

    const foundUser = await this.find(user.username);
    if (!foundUser)
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

  public async getURLToken(username: string) {
    const foundUser = await this.find(username);
    const payload = { username: username };
    if (!foundUser)
      throw new NotFoundException(exceptionMessage.USER_NOT_FOUND);
    return await this.jwtService.sign(payload, {
      secret: secret.resetPwdSecret,
      expiresIn: secret.expire,
    });
  }

  public async setPassword(username, newPassword) {
    return await this.authRepository.update(
      { username: username },
      { password: hash(newPassword) },
    );
  }
}
