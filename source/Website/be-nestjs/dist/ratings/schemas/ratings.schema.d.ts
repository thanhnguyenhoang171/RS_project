import mongoose, { HydratedDocument } from 'mongoose';
export type RatingDocument = HydratedDocument<Rating>;
export declare class Rating {
    typeId: mongoose.Schema.Types.ObjectId;
    productId: mongoose.Schema.Types.ObjectId;
    userId: mongoose.Schema.Types.ObjectId;
    comment: string;
    url: string;
    detectedEmotion: {
        class: string;
        confidenceScore: number;
    }[];
    commentEmotionAnalysis: string;
    status: string;
    isPositive: string;
    history: {
        status: string;
        updatedAt: Date;
        updatedBy: {
            _id: mongoose.Schema.Types.ObjectId;
            email: string;
        };
    }[];
    createdBy: {
        _id: mongoose.Schema.Types.ObjectId;
        email: string;
    };
    updatedBy: {
        _id: mongoose.Schema.Types.ObjectId;
        email: string;
    };
    deletedBy: {
        _id: mongoose.Schema.Types.ObjectId;
        email: string;
    };
    createdAt: Date;
    updatedAt: Date;
    isDeleted: boolean;
    deletedAt: Date;
}
export declare const RatingSchema: mongoose.Schema<Rating, mongoose.Model<Rating, any, any, any, mongoose.Document<unknown, any, Rating> & Rating & {
    _id: mongoose.Types.ObjectId;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Rating, mongoose.Document<unknown, {}, mongoose.FlatRecord<Rating>> & mongoose.FlatRecord<Rating> & {
    _id: mongoose.Types.ObjectId;
}>;
