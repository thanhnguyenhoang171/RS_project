import mongoose, { HydratedDocument } from 'mongoose';
export type UserDocument = HydratedDocument<User>;
export declare class User {
    name: string;
    email: string;
    password: string;
    role: mongoose.Schema.Types.ObjectId;
    refreshToken: string;
    updatedBy: {
        _id: mongoose.Schema.Types.ObjectId;
        name: string;
    };
    createdBy: {
        _id: mongoose.Schema.Types.ObjectId;
        name: string;
    };
    deletedBy: {
        _id: mongoose.Schema.Types.ObjectId;
        name: string;
    };
    createdAt: Date;
}
export declare const UserSchema: mongoose.Schema<User, mongoose.Model<User, any, any, any, mongoose.Document<unknown, any, User> & User & {
    _id: mongoose.Types.ObjectId;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, User, mongoose.Document<unknown, {}, mongoose.FlatRecord<User>> & mongoose.FlatRecord<User> & {
    _id: mongoose.Types.ObjectId;
}>;
