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
exports.ProductsService = void 0;
const common_1 = require("@nestjs/common");
const products_schema_1 = require("./schemas/products.schema");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const api_query_params_1 = require("api-query-params");
let ProductsService = class ProductsService {
    constructor(ProductModel) {
        this.ProductModel = ProductModel;
    }
    async create(createProductDto, user) {
        const { name, type, price, description, isActive, image } = createProductDto;
        let newProduct = await this.ProductModel.create({
            name,
            type,
            price,
            description,
            isActive,
            image,
            createdBy: {
                _id: user._id,
                email: user.email,
            },
        });
        return {
            _id: newProduct?._id,
            createdAt: newProduct?.createdAt,
        };
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
        const totalItems = await this.ProductModel.countDocuments(filter);
        const totalPages = Math.ceil(totalItems / defaultLimit);
        const result = await this.ProductModel.find(filter)
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
        if (!mongoose_2.default.Types.ObjectId.isValid(id))
            return `not found Product`;
        return await this.ProductModel.findById(id);
    }
    async update(_id, updateProductDto, user) {
        const updated = await this.ProductModel.updateOne({ _id }, {
            ...updateProductDto,
            updatedBy: {
                _id: user._id,
                email: user.email,
            },
        });
        return updated;
    }
    async remove(_id, user) {
        if (!mongoose_2.default.Types.ObjectId.isValid(_id))
            return `not found Product`;
        await this.ProductModel.updateOne({ _id }, {
            deletedBy: {
                _id: user._id,
                email: user.email,
            },
        });
        return this.ProductModel.softDelete({
            _id,
        });
    }
};
exports.ProductsService = ProductsService;
exports.ProductsService = ProductsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(products_schema_1.Product.name)),
    __metadata("design:paramtypes", [Object])
], ProductsService);
//# sourceMappingURL=products.service.js.map