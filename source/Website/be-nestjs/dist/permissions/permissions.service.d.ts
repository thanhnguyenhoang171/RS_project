import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { PermissionDocument } from './schemas/permission.schema';
import mongoose from 'mongoose';
import { IUser } from 'src/users/users.interface';
export declare class PermissionsService {
    private readonly permissionModel;
    constructor(permissionModel: SoftDeleteModel<PermissionDocument>);
    create(createPermissionDto: CreatePermissionDto, user: IUser): Promise<{
        _id: mongoose.Types.ObjectId;
        createdAt: Date;
    }>;
    findAll(currentPage: number, limit: number, qs: string): Promise<{
        meta: {
            current: number;
            pageSize: number;
            pages: number;
            total: number;
        };
        result: Omit<mongoose.Document<unknown, {}, mongoose.Document<unknown, {}, import("./schemas/permission.schema").Permission> & import("./schemas/permission.schema").Permission & {
            _id: mongoose.Types.ObjectId;
        }> & mongoose.Document<unknown, {}, import("./schemas/permission.schema").Permission> & import("./schemas/permission.schema").Permission & {
            _id: mongoose.Types.ObjectId;
        } & Required<{
            _id: mongoose.Types.ObjectId;
        }>, never>[];
    }>;
    checkExistPermission(_id: string): Promise<mongoose.Document<unknown, {}, mongoose.Document<unknown, {}, import("./schemas/permission.schema").Permission> & import("./schemas/permission.schema").Permission & {
        _id: mongoose.Types.ObjectId;
    }> & mongoose.Document<unknown, {}, import("./schemas/permission.schema").Permission> & import("./schemas/permission.schema").Permission & {
        _id: mongoose.Types.ObjectId;
    } & Required<{
        _id: mongoose.Types.ObjectId;
    }>>;
    findOne(_id: string): Promise<mongoose.Document<unknown, {}, mongoose.Document<unknown, {}, import("./schemas/permission.schema").Permission> & import("./schemas/permission.schema").Permission & {
        _id: mongoose.Types.ObjectId;
    }> & mongoose.Document<unknown, {}, import("./schemas/permission.schema").Permission> & import("./schemas/permission.schema").Permission & {
        _id: mongoose.Types.ObjectId;
    } & Required<{
        _id: mongoose.Types.ObjectId;
    }>>;
    update(_id: string, updatePermissionDto: UpdatePermissionDto, user: IUser): Promise<mongoose.UpdateWriteOpResult>;
    remove(_id: string, user: IUser): Promise<{
        deleted: number;
    }>;
}
