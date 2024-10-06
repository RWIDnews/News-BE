import { AuthService } from './auth.service';
import { RegisterDto, LoginDto } from './dto/auth.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    register(body: RegisterDto): Promise<{
        id: number;
        email: string;
        fullName: string;
        role: import(".prisma/client").$Enums.Role;
        createdAt: Date;
        updatedAt: Date;
    }>;
    login(body: LoginDto): Promise<{
        access_token: string;
    } | {
        message: string;
    }>;
}
