import { CreateRatingDto } from './dto/create-rating.dto';
import { IUser } from 'src/users/users.interface';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import mongoose from 'mongoose';
import { Rating, RatingDocument } from './schemas/ratings.schema';
export declare class RatingsService {
    private ratingModel;
    constructor(ratingModel: SoftDeleteModel<RatingDocument>);
    create(createRatingDto: CreateRatingDto, user: IUser): Promise<{
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
        result: Omit<mongoose.Document<unknown, {}, mongoose.Document<unknown, {}, Rating> & Rating & {
            _id: mongoose.Types.ObjectId;
        }> & mongoose.Document<unknown, {}, Rating> & Rating & {
            _id: mongoose.Types.ObjectId;
        } & Required<{
            _id: mongoose.Types.ObjectId;
        }>, never>[];
    }>;
    findOne(id: string): Promise<mongoose.Document<unknown, {}, mongoose.Document<unknown, {}, Rating> & Rating & {
        _id: mongoose.Types.ObjectId;
    }> & mongoose.Document<unknown, {}, Rating> & Rating & {
        _id: mongoose.Types.ObjectId;
    } & Required<{
        _id: mongoose.Types.ObjectId;
    }>>;
    findByUsers(user: IUser): Promise<Omit<mongoose.Document<unknown, {}, mongoose.Document<unknown, {}, Rating> & Rating & {
        _id: mongoose.Types.ObjectId;
    }> & mongoose.Document<unknown, {}, Rating> & Rating & {
        _id: mongoose.Types.ObjectId;
    } & Required<{
        _id: mongoose.Types.ObjectId;
    }>, never>[]>;
    update(_id: string, status: string, user: IUser): Promise<mongoose.UpdateWriteOpResult>;
    remove(id: string, user: IUser): Promise<{
        deleted: number;
    }>;
    getTotal(): Promise<{
        totalItems: number;
    }>;
    getPositive(): Promise<{
        positiveRatings: number;
    }>;
    getNegative(): Promise<{
        negativeRatings: number;
    }>;
    getPositiveComment(): Promise<{
        positiveComments: number;
    }>;
    getNegativeComment(): Promise<{
        negativeComments: number;
    }>;
    getNeutralComment(): Promise<{
        neutralComments: number;
    }>;
}
