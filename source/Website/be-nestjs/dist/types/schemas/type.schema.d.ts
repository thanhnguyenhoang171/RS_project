import mongoose, { HydratedDocument } from 'mongoose';
export type TypeDocument = HydratedDocument<Type>;
export declare class Type {
    name: string;
    description: string;
    logo: string;
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
export declare const TypeSchema: mongoose.Schema<Type, mongoose.Model<Type, any, any, any, mongoose.Document<unknown, any, Type> & Type & {
    _id: mongoose.Types.ObjectId;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Type, mongoose.Document<unknown, {}, mongoose.FlatRecord<Type>> & mongoose.FlatRecord<Type> & {
    _id: mongoose.Types.ObjectId;
}>;
