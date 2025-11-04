import mongoose from 'mongoose';
export declare class CreateUserDto {
    name: string;
    email: string;
    password: string;
    role: mongoose.Schema.Types.ObjectId;
}
export declare class RegisterUserDto {
    name: string;
    email: string;
    password: string;
}
