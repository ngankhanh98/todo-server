import { Repository } from 'typeorm';
import { User } from 'src/entities/user.entity';
import { authDTO } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private readonly authRepository;
    private readonly jwtService;
    constructor(authRepository: Repository<User>, jwtService: JwtService);
    validateUser(user: authDTO): Promise<any>;
    login(user: authDTO): Promise<{
        accessToken: string;
    }>;
    private find;
}
