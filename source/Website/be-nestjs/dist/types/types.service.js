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
exports.TypesService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const class_transformer_1 = require("class-transformer");
const api_query_params_1 = require("api-query-params");
const mongoose_2 = require("mongoose");
let TypesService = class TypesService {
    constructor(TypeModel) {
        this.TypeModel = TypeModel;
    }
    async create(createTypeDto, user) {
        try {
            const { name, description, logo } = createTypeDto;
            const newType = await this.TypeModel.create({
                name,
                description,
                logo,
                createdBy: {
                    _id: user._id,
                    email: user.email,
                    name: user.name,
                },
            });
            return {
                _id: newType._id,
                cratedAt: newType.createdAt,
            };
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Lỗi máy chủ nội bộ');
        }
    }
    async findAll(currentPage, limit, qs) {
        const { filter, sort, population } = (0, api_query_params_1.default)(qs);
        delete filter.current;
        delete filter.pageSize;
        let page = Math.max(1, +currentPage);
        let defaultLimit = +limit > 0 ? +limit : 10;
        let offset = (page - 1) * defaultLimit;
        if (filter.name && typeof filter.name === 'string') {
            filter.name = { $regex: new RegExp(filter.name, 'i') };
        }
        const totalItems = await this.TypeModel.countDocuments(filter);
        const totalPages = Math.ceil(totalItems / defaultLimit);
        const result = await this.TypeModel.find(filter)
            .skip(offset)
            .limit(defaultLimit)
            .sort(sort || { updatedAt: -1 })
            .populate(population || [])
            .exec();
        return {
            meta: {
                current: page,
                pageSize: defaultLimit,
                pages: totalPages,
                total: totalItems,
            },
            result,
        };
    }
    async findOne(id) {
        try {
            if (!mongoose_2.default.Types.ObjectId.isValid(id)) {
                throw new common_1.BadRequestException('ID không hợp lệ!');
            }
            return await this.TypeModel.findById(id);
        }
        catch (error) {
            if (error instanceof common_1.BadRequestException) {
                return error;
            }
            throw new common_1.InternalServerErrorException('Lỗi máy chủ nội bộ');
        }
    }
    async update(id, updateTypeDto, user) {
        try {
            const { name, description, logo } = updateTypeDto;
            if (!mongoose_2.default.Types.ObjectId.isValid(id)) {
                throw new common_1.BadRequestException('ID không hợp lệ');
            }
            const isExist = await this.TypeModel.findById(id);
            if (!isExist) {
                throw new common_1.BadRequestException('Không tìm thấy Type này!');
            }
            const newType = await this.TypeModel.updateOne({ _id: id }, {
                name,
                description,
                logo,
                updatedBy: {
                    _id: user._id,
                    email: user.email,
                    name: user.name,
                },
            });
            return newType;
        }
        catch (error) {
            if (error instanceof common_1.BadRequestException) {
                return error;
            }
            throw new common_1.InternalServerErrorException('Lỗi máy chủ nội bộ');
        }
    }
    async remove(id, user) {
        try {
            if (!mongoose_2.default.Types.ObjectId.isValid(id)) {
                throw new common_1.BadRequestException('ID không hợp lệ!');
            }
            const isExist = await this.TypeModel.findById(id);
            if (!isExist) {
                throw new common_1.BadRequestException('Không tìm thấy Type này!');
            }
            const removedType = await this.TypeModel.softDelete({ _id: id });
            return removedType;
        }
        catch (error) {
            if (error instanceof common_1.BadRequestException) {
                return error;
            }
            throw new common_1.InternalServerErrorException('Lỗi máy chủ nội bộ');
        }
    }
};
exports.TypesService = TypesService;
exports.TypesService = TypesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(class_transformer_1.Type.name)),
    __metadata("design:paramtypes", [Object])
], TypesService);
//# sourceMappingURL=types.service.js.map