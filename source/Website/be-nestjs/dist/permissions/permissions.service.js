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
exports.PermissionsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const api_query_params_1 = require("api-query-params");
const mongoose_2 = require("mongoose");
let PermissionsService = class PermissionsService {
    constructor(permissionModel) {
        this.permissionModel = permissionModel;
    }
    async create(createPermissionDto, user) {
        const { name, path, method, module } = createPermissionDto;
        const isExist = await this.permissionModel.findOne({ path, method });
        if (isExist) {
            throw new common_1.BadRequestException(`Permission với apiPath=${path} , method=${method} đã tồn tại!`);
        }
        let newPermission = await this.permissionModel.create({
            name,
            path,
            method,
            module,
            createdBy: {
                _id: user._id,
                name: user.name,
                email: user.email
            }
        });
        return {
            _id: newPermission?._id,
            createdAt: newPermission?.createdAt
        };
    }
    async findAll(currentPage, limit, qs) {
        const { sort, filter, population } = (0, api_query_params_1.default)(qs);
        delete filter.current;
        delete filter.pageSize;
        const offset = (+currentPage - 1) * (+limit);
        const defaultLimit = +limit ? +limit : 10;
        const totalItems = (await this.permissionModel.find(filter)).length;
        const totalPages = Math.ceil(totalItems / defaultLimit);
        const result = await this.permissionModel.find(filter)
            .skip(offset)
            .limit(defaultLimit)
            .sort(sort)
            .populate(population)
            .exec();
        return {
            meta: {
                current: currentPage,
                pageSize: limit,
                pages: totalPages,
                total: totalItems
            },
            result
        };
    }
    async checkExistPermission(_id) {
        if (!mongoose_2.default.Types.ObjectId.isValid(_id)) {
            throw new common_1.BadRequestException("ID không hợp lệ!");
        }
        const user = await this.permissionModel.findOne({ _id });
        if (!user) {
            throw new common_1.NotFoundException("Permission này không tồn tại!");
        }
        return user;
    }
    async findOne(_id) {
        try {
            return await this.checkExistPermission(_id);
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException || error instanceof common_1.BadRequestException) {
                throw error;
            }
            throw new common_1.InternalServerErrorException("Lỗi máy chủ nội bộ");
        }
    }
    async update(_id, updatePermissionDto, user) {
        try {
            await this.checkExistPermission(_id);
            const { name, path, method, module } = updatePermissionDto;
            const updatedPermission = await this.permissionModel.updateOne({ _id }, {
                name, path, module, method, updatedBy: {
                    _id: user._id,
                    email: user.email,
                    name: user.name
                }
            });
            return updatedPermission;
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException || error instanceof common_1.BadRequestException) {
                throw error;
            }
            throw new common_1.InternalServerErrorException("Lỗi máy chủ nội bộ");
        }
    }
    async remove(_id, user) {
        try {
            await this.checkExistPermission(_id);
            const result = await this.permissionModel.softDelete({ _id });
            await this.permissionModel.updateOne({ _id }, {
                deletedBy: {
                    _id: user._id,
                    email: user.email,
                    name: user.name
                }
            });
            return result;
        }
        catch (error) {
            if (error instanceof common_1.BadRequestException || error instanceof common_1.NotFoundException) {
                throw error;
            }
            throw new common_1.InternalServerErrorException("Lỗi máy chủ nội bộ");
        }
    }
};
exports.PermissionsService = PermissionsService;
exports.PermissionsService = PermissionsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('Permission')),
    __metadata("design:paramtypes", [Object])
], PermissionsService);
//# sourceMappingURL=permissions.service.js.map