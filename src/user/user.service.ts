import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { User } from '../entities/user.entity';

@Injectable()
export class UserService extends TypeOrmCrudService<User> {
  constructor(@InjectRepository(User) userRepository) {
    super(userRepository);
  }

  // public async getDetail(username): Promise<getUserDTO> {
  //   try {
  //     const user = await this.find(username);
  //     return plainToClass(getUserDTO, user[0]);
  //   } catch (error) {
  //     throw new InternalServerErrorException(error.message);
  //   }
  // }

  // private async find(username: string) {
  //   try {
  //     return await this.userRepository.find({ username: username });
  //   } catch (error) {
  //     throw new InternalServerErrorException(error.message);
  //   }
  // }
}
