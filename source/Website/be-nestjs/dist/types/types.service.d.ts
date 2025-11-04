import { BadRequestException } from '@nestjs/common';
import { CreateTypeDto } from './dto/create-type.dto';
import { UpdateTypeDto } from './dto/update-type.dto';
import { IUser } from 'src/users/users.interface';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { TypeDocument } from './schemas/type.schema';
import mongoose from 'mongoose';
export declare class TypesService {
    private TypeModel;
    constructor(TypeModel: SoftDeleteModel<TypeDocument>);
    create(createTypeDto: CreateTypeDto, user: IUser): Promise<{
        _id: mongoose.Types.ObjectId;
        cratedAt: Date;
    }>;
    findAll(currentPage: number, limit: number, qs: string): Promise<{
        meta: {
            current: number;
            pageSize: number;
            pages: number;
            total: number;
        };
        result: Omit<mongoose.Document<unknown, {}, mongoose.Document<unknown, {}, import("./schemas/type.schema").Type> & import("./schemas/type.schema").Type & {
            _id: mongoose.Types.ObjectId;
        }> & mongoose.Document<unknown, {}, import("./schemas/type.schema").Type> & import("./schemas/type.schema").Type & {
            _id: mongoose.Types.ObjectId;
        } & Required<{
            _id: mongoose.Types.ObjectId;
        }>, never>[];
    }>;
    findOne(id: string): Promise<BadRequestException | (mongoose.Document<unknown, {}, mongoose.Document<unknown, {}, import("./schemas/type.schema").Type> & import("./schemas/type.schema").Type & {
        _id: mongoose.Types.ObjectId;
    }> & mongoose.Document<unknown, {}, import("./schemas/type.schema").Type> & import("./schemas/type.schema").Type & {
        _id: mongoose.Types.ObjectId;
    } & Required<{
        _id: mongoose.Types.ObjectId;
    }>)>;
    update(id: string, updateTypeDto: UpdateTypeDto, user: IUser): Promise<mongoose.UpdateWriteOpResult | BadRequestException>;
    remove(id: string, user: IUser): Promise<BadRequestException | {
        deleted: number;
    }>;
}
