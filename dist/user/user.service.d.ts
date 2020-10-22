import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { createUserDTO, getUserDTO } from './dto/user.dto';
export declare class UserService {
    private readonly userRepository;
    constructor(userRepository: Repository<User>);
    create(createUserDTO: createUserDTO): Promise<User>;
    getDetail(username: any): Promise<getUserDTO>;
    private find;
}
