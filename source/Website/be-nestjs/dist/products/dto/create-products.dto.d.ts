import mongoose from 'mongoose';
declare class Types {
    _id: mongoose.Schema.Types.ObjectId;
    name: string;
    logo: string;
}
export declare class CreateProductDto {
    name: string;
    description: string;
    type: Types;
    price: number;
    image: string;
    isActive: string;
}
export {};
