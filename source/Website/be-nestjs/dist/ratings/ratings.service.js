"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RatingsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const api_query_params_1 = require("api-query-params");
const mongoose_2 = require("mongoose");
const ratings_schema_1 = require("./schemas/ratings.schema");
let RatingsService = class RatingsService {
    constructor(ratingModel) {
        this.ratingModel = ratingModel;
    }
    async create(createRatingDto, user) {
        const { typeId, productId, comment } = createRatingDto;
        const { email, _id } = user;
        const newRating = await this.ratingModel.create({
            typeId,
            productId,
            userId: _id,
            status: 'PENDING',
            comment,
            createdBy: {
                _id,
                email,
            },
            history: [
                {
                    status: 'PENDING',
                    updatedAt: new Date(),
                    updatedBy: {
                        _id: user._id,
                        email: user.email,
                    },
                },
            ],
        });
        return {
            _id: newRating?._id,
            createdAt: newRating?.createdAt,
        };
    }
    async findAll(currentPage, limit, qs) {
        const { filter, sort, population, projection } = (0, api_query_params_1.default)(qs);
        delete filter.current;
        delete filter.pageSize;
        let offset = (+currentPage - 1) * +limit;
        let defaultLimit = +limit ? +limit : 10;
        const totalItems = (await this.ratingModel.find(filter)).length;
        const totalPages = Math.ceil(totalItems / defaultLimit);
        const result = await this.ratingModel
            .find(filter)
            .skip(offset)
            .limit(defaultLimit)
            .sort(sort)
            .populate(population)
            .select(projection)
            .exec();
        return {
            meta: {
                current: currentPage,
                pageSize: limit,
                pages: totalPages,
                total: totalItems,
            },
            result,
        };
    }
    async findOne(id) {
        if (!mongoose_2.default.Types.ObjectId.isValid(id)) {
            throw new common_1.BadRequestException('not found rating');
        }
        return await this.ratingModel.findById(id);
    }
    async findByUsers(user) {
        return await this.ratingModel
            .find({
            userId: user._id,
        })
            .sort('-createdAt')
            .populate([
            {
                path: 'typeId',
                select: { name: 1 },
            },
            {
                path: 'productId',
                select: { name: 1 },
            },
        ]);
    }
    async update(_id, status, user) {
        if (!mongoose_2.default.Types.ObjectId.isValid(_id)) {
            throw new common_1.BadRequestException('not found rating');
        }
        const updated = await this.ratingModel.updateOne({ _id }, {
            status,
            updatedBy: {
                _id: user._id,
                email: user.email,
            },
            $push: {
                history: {
                    status: status,
                    updatedAt: new Date(),
                    updatedBy: {
                        _id: user._id,
                        email: user.email,
                    },
                },
            },
        });
        return updated;
    }
    async remove(id, user) {
        await this.ratingModel.updateOne({ _id: id }, {
            deletedBy: {
                _id: user._id,
                email: user.email,
            },
        });
        return this.ratingModel.softDelete({
            _id: id,
        });
    }
    async getTotal() {
        const totalItems = await this.ratingModel.countDocuments();
        return { totalItems: totalItems };
    }
    async getPositive() {
        const positiveRatings = (await this.ratingModel.find({ isPositive: 'Có' }))
            .length;
        return { positiveRatings: positiveRatings };
    }
    async getNegative() {
        const negativeRatings = (await this.ratingModel.find({ isPositive: 'Không' })).length;
        return { negativeRatings: negativeRatings };
    }
    async getPositiveComment() {
        const positive = (await this.ratingModel.find({ commentEmotionAnalysis: 'Positive' })).length;
        return { positiveComments: positive };
    }
    async getNegativeComment() {
        const negative = (await this.ratingModel.find({ commentEmotionAnalysis: 'Negative' })).length;
        return { negativeComments: negative };
    }
    async getNeutralComment() {
        const neutral = (await this.ratingModel.find({ commentEmotionAnalysis: 'Neutral' })).length;
        return { neutralComments: neutral };
    }
};
exports.RatingsService = RatingsService;
exports.RatingsService = RatingsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(ratings_schema_1.Rating.name)),
    __metadata("design:paramtypes", [Object])
], RatingsService);
//# sourceMappingURL=ratings.service.js.map