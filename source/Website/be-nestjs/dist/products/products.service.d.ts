import { CreateProductDto } from './dto/create-products.dto';
import { UpdateProductDto } from './dto/update-products.dto';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { ProductDocument, Product } from './schemas/products.schema';
import { IUser } from 'src/users/users.interface';
import mongoose from 'mongoose';
export declare class ProductsService {
    private ProductModel;
    constructor(ProductModel: SoftDeleteModel<ProductDocument>);
    create(createProductDto: CreateProductDto, user: IUser): Promise<{
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
        result: Omit<mongoose.Document<unknown, {}, mongoose.Document<unknown, {}, Product> & Product & {
            _id: mongoose.Types.ObjectId;
        }> & mongoose.Document<unknown, {}, Product> & Product & {
            _id: mongoose.Types.ObjectId;
        } & Required<{
            _id: mongoose.Types.ObjectId;
        }>, never>[];
    }>;
    findOne(id: string): Promise<(mongoose.Document<unknown, {}, mongoose.Document<unknown, {}, Product> & Product & {
        _id: mongoose.Types.ObjectId;
    }> & mongoose.Document<unknown, {}, Product> & Product & {
        _id: mongoose.Types.ObjectId;
    } & Required<{
        _id: mongoose.Types.ObjectId;
    }>) | "not found Product">;
    update(_id: string, updateProductDto: UpdateProductDto, user: IUser): Promise<mongoose.UpdateWriteOpResult>;
    remove(_id: string, user: IUser): Promise<{
        deleted: number;
    } | "not found Product">;
}
