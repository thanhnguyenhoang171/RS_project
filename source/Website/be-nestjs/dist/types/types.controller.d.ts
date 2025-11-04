import { TypesService } from './types.service';
import { CreateTypeDto } from './dto/create-type.dto';
import { UpdateTypeDto } from './dto/update-type.dto';
import { IUser } from 'src/users/users.interface';
export declare class TypesController {
    private readonly typesService;
    constructor(typesService: TypesService);
    create(createTypeDto: CreateTypeDto, user: IUser): Promise<{
        _id: import("mongoose").Types.ObjectId;
        cratedAt: Date;
    }>;
    findAll(currentPage: string, limit: string, qs: string): Promise<{
        meta: {
            current: number;
            pageSize: number;
            pages: number;
            total: number;
        };
        result: Omit<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./schemas/type.schema").Type> & import("./schemas/type.schema").Type & {
            _id: import("mongoose").Types.ObjectId;
        }> & import("mongoose").Document<unknown, {}, import("./schemas/type.schema").Type> & import("./schemas/type.schema").Type & {
            _id: import("mongoose").Types.ObjectId;
        } & Required<{
            _id: import("mongoose").Types.ObjectId;
        }>, never>[];
    }>;
    findOne(id: string): Promise<import("@nestjs/common").BadRequestException | (import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./schemas/type.schema").Type> & import("./schemas/type.schema").Type & {
        _id: import("mongoose").Types.ObjectId;
    }> & import("mongoose").Document<unknown, {}, import("./schemas/type.schema").Type> & import("./schemas/type.schema").Type & {
        _id: import("mongoose").Types.ObjectId;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>)>;
    update(id: string, updateTypeDto: UpdateTypeDto, user: IUser): Promise<import("mongoose").UpdateWriteOpResult | import("@nestjs/common").BadRequestException>;
    remove(id: string, user: IUser): Promise<import("@nestjs/common").BadRequestException | {
        deleted: number;
    }>;
}
