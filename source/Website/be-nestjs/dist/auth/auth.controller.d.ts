import { AuthService } from './auth.service';
import { Request, Response } from 'express';
import { IUser } from 'src/users/users.interface';
import { RolesService } from 'src/roles/roles.service';
import { RegisterUserDto } from 'src/users/dto/create-user.dto';
export declare class AuthController {
    private authService;
    private rolesService;
    constructor(authService: AuthService, rolesService: RolesService);
    handleLogin(req: any, response: Response): Promise<{
        access_token: string;
        user: {
            _id: string;
            name: string;
            email: string;
            role: {
                _id: string;
                name: string;
            };
            permissions: {
                _id: string;
                name: string;
                path: string;
                module: string;
            }[];
        };
    }>;
    handleRegister(registerUserDto: RegisterUserDto): Promise<{
        _id: import("mongoose").Types.ObjectId;
        createdAt: Date;
    }>;
    handleGetAccount(user: IUser): Promise<{
        user: IUser;
    }>;
    handleRefreshToken(request: Request, response: Response): Promise<{
        access_token: string;
        user: {
            _id: import("mongoose").Types.ObjectId;
            name: string;
            email: string;
            role: import("mongoose").Schema.Types.ObjectId;
            permissions: import("../permissions/schemas/permission.schema").Permission[];
        };
    }>;
    handleLogout(response: Response, user: IUser): Promise<string>;
}
