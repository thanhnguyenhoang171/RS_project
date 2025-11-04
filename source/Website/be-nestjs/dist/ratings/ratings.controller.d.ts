import { RatingsService } from './ratings.service';
import { CreateRatingDto } from './dto/create-rating.dto';
import { IUser } from 'src/users/users.interface';
export declare class RatingsController {
    private readonly ratingsService;
    constructor(ratingsService: RatingsService);
    create(createRatingDto: CreateRatingDto, user: IUser): Promise<{
        _id: import("mongoose").Types.ObjectId;
        createdAt: Date;
    }>;
    getRatingByUser(user: IUser): Promise<Omit<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./schemas/ratings.schema").Rating> & import("./schemas/ratings.schema").Rating & {
        _id: import("mongoose").Types.ObjectId;
    }> & import("mongoose").Document<unknown, {}, import("./schemas/ratings.schema").Rating> & import("./schemas/ratings.schema").Rating & {
        _id: import("mongoose").Types.ObjectId;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>, never>[]>;
    findAll(currentPage: string, limit: string, qs: string): Promise<{
        meta: {
            current: number;
            pageSize: number;
            pages: number;
            total: number;
        };
        result: Omit<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./schemas/ratings.schema").Rating> & import("./schemas/ratings.schema").Rating & {
            _id: import("mongoose").Types.ObjectId;
        }> & import("mongoose").Document<unknown, {}, import("./schemas/ratings.schema").Rating> & import("./schemas/ratings.schema").Rating & {
            _id: import("mongoose").Types.ObjectId;
        } & Required<{
            _id: import("mongoose").Types.ObjectId;
        }>, never>[];
    }>;
    getPositiveRatings(): Promise<{
        positiveRatings: number;
    }>;
    getPositiveComments(): Promise<{
        positiveComments: number;
    }>;
    getNegativeRatings(): Promise<{
        negativeRatings: number;
    }>;
    getNegativeComments(): Promise<{
        negativeComments: number;
    }>;
    getNeutralComments(): Promise<{
        neutralComments: number;
    }>;
    findOne(id: string): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./schemas/ratings.schema").Rating> & import("./schemas/ratings.schema").Rating & {
        _id: import("mongoose").Types.ObjectId;
    }> & import("mongoose").Document<unknown, {}, import("./schemas/ratings.schema").Rating> & import("./schemas/ratings.schema").Rating & {
        _id: import("mongoose").Types.ObjectId;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    getTotal(): Promise<{
        totalItems: number;
    }>;
    updateStatus(id: string, status: string, user: IUser): Promise<import("mongoose").UpdateWriteOpResult>;
    remove(id: string, user: IUser): Promise<{
        deleted: number;
    }>;
}
