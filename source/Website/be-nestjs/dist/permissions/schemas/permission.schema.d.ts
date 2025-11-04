import mongoose, { HydratedDocument } from 'mongoose';
export type PermissionDocument = HydratedDocument<Permission>;
export declare class Permission {
    name: string;
    path: string;
    method: string;
    module: string;
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
    updatedAt: Date;
    isDeleted: boolean;
}
export declare const PermissionSchema: mongoose.Schema<Permission, mongoose.Model<Permission, any, any, any, mongoose.Document<unknown, any, Permission> & Permission & {
    _id: mongoose.Types.ObjectId;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Permission, mongoose.Document<unknown, {}, mongoose.FlatRecord<Permission>> & mongoose.FlatRecord<Permission> & {
    _id: mongoose.Types.ObjectId;
}>;
