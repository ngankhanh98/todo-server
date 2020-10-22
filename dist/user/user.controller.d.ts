import { createUserDTO, getUserDTO } from './dto/user.dto';
import { UserService } from './user.service';
export declare class UserController {
    private userService;
    constructor(userService: UserService);
    register(user: createUserDTO): Promise<getUserDTO>;
    getDetail(req: any): Promise<getUserDTO>;
}
