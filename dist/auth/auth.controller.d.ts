import { AuthService } from './auth.service';
import { authDTO } from './dto/auth.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    login(user: authDTO): Promise<{
        accessToken: string;
    }>;
}
