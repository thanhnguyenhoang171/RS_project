import mongoose from "mongoose";
export declare class CreateRatingDto {
    url: string;
    comment: string;
    status: string;
    detectedEmotion: {
        class: string;
        confidenceScore: number;
    }[];
    typeId: mongoose.Schema.Types.ObjectId;
    productId: mongoose.Schema.Types.ObjectId;
}
