import { CreateUserDto, RegisterUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User as UserM, UserDocument } from './schemas/user.schema';
import mongoose from 'mongoose';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { IUser } from './users.interface';
import { RoleDocument } from 'src/roles/schemas/role.schema';
export declare class UsersService {
    private userModel;
    private roleModel;
    constructor(userModel: SoftDeleteModel<UserDocument>, roleModel: SoftDeleteModel<RoleDocument>);
    getHashPassword: (password: string) => any;
    create(createUserDto: CreateUserDto, user: IUser): Promise<mongoose.Document<unknown, {}, mongoose.Document<unknown, {}, UserM> & UserM & {
        _id: mongoose.Types.ObjectId;
    }> & mongoose.Document<unknown, {}, UserM> & UserM & {
        _id: mongoose.Types.ObjectId;
    } & Required<{
        _id: mongoose.Types.ObjectId;
    }>>;
    register(user: RegisterUserDto): Promise<mongoose.Document<unknown, {}, mongoose.Document<unknown, {}, UserM> & UserM & {
        _id: mongoose.Types.ObjectId;
    }> & mongoose.Document<unknown, {}, UserM> & UserM & {
        _id: mongoose.Types.ObjectId;
    } & Required<{
        _id: mongoose.Types.ObjectId;
    }>>;
    findAll(currentPage: number, limit: number, qs: string): Promise<{
        meta: {
            current: number;
            pageSize: number;
            pages: number;
            total: number;
        };
        result: Omit<mongoose.Document<unknown, {}, mongoose.Document<unknown, {}, UserM> & UserM & {
            _id: mongoose.Types.ObjectId;
        }> & mongoose.Document<unknown, {}, UserM> & UserM & {
            _id: mongoose.Types.ObjectId;
        } & Required<{
            _id: mongoose.Types.ObjectId;
        }>, never>[];
    }>;
    findOne(id: string): Promise<(mongoose.Document<unknown, {}, mongoose.Document<unknown, {}, UserM> & UserM & {
        _id: mongoose.Types.ObjectId;
    }> & mongoose.Document<unknown, {}, UserM> & UserM & {
        _id: mongoose.Types.ObjectId;
    } & Required<{
        _id: mongoose.Types.ObjectId;
    }>) | "not found user">;
    findOneByUsername(username: string): mongoose.Query<mongoose.Document<unknown, {}, mongoose.Document<unknown, {}, UserM> & UserM & {
        _id: mongoose.Types.ObjectId;
    }> & mongoose.Document<unknown, {}, UserM> & UserM & {
        _id: mongoose.Types.ObjectId;
    } & Required<{
        _id: mongoose.Types.ObjectId;
    }>, mongoose.Document<unknown, {}, mongoose.Document<unknown, {}, UserM> & UserM & {
        _id: mongoose.Types.ObjectId;
    }> & mongoose.Document<unknown, {}, UserM> & UserM & {
        _id: mongoose.Types.ObjectId;
    } & Required<{
        _id: mongoose.Types.ObjectId;
    }>, {}, mongoose.Document<unknown, {}, UserM> & UserM & {
        _id: mongoose.Types.ObjectId;
    }, "findOne">;
    isValidPassword(password: string, hash: string): any;
    update(_id: string, updateUserDto: UpdateUserDto, user: IUser): Promise<mongoose.UpdateWriteOpResult>;
    updateUserToken: (refreshToken: string, _id: string) => Promise<mongoose.UpdateWriteOpResult>;
    findUserByToken: (refreshToken: string) => Promise<mongoose.Document<unknown, {}, mongoose.Document<unknown, {}, UserM> & UserM & {
        _id: mongoose.Types.ObjectId;
    }> & mongoose.Document<unknown, {}, UserM> & UserM & {
        _id: mongoose.Types.ObjectId;
    } & Required<{
        _id: mongoose.Types.ObjectId;
    }>>;
}
