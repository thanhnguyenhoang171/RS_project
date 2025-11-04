import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { IUser } from 'src/users/users.interface';
import { RegisterUserDto } from 'src/users/dto/create-user.dto';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';
import { RolesService } from 'src/roles/roles.service';
export declare class AuthService {
    private usersService;
    private jwtService;
    private configService;
    private rolesService;
    constructor(usersService: UsersService, jwtService: JwtService, configService: ConfigService, rolesService: RolesService);
    validateUser(username: string, pass: string): Promise<any>;
    login(user: IUser, response: Response): Promise<{
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
    register(user: RegisterUserDto): Promise<{
        _id: import("mongoose").Types.ObjectId;
        createdAt: Date;
    }>;
    createRefreshToken: (payload: any) => string;
    processNewToken: (refreshToken: string, response: Response) => Promise<{
        access_token: string;
        user: {
            _id: import("mongoose").Types.ObjectId;
            name: string;
            email: string;
            role: import("mongoose").Schema.Types.ObjectId;
            permissions: import("../permissions/schemas/permission.schema").Permission[];
        };
    }>;
    logout: (response: Response, user: IUser) => Promise<string>;
}
