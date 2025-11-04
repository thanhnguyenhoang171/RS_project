import { Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { IUser } from 'src/users/users.interface';
import { RolesService } from 'src/roles/roles.service';
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    private rolesService;
    private configService;
    constructor(rolesService: RolesService, configService: ConfigService);
    validate(payload: IUser): Promise<{
        _id: string;
        name: string;
        email: string;
        role: {
            _id: string;
            name: string;
        };
        permissions: import("../../permissions/schemas/permission.schema").Permission[];
    }>;
}
export {};
