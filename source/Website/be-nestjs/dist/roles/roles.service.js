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
exports.RolesService = void 0;
const common_1 = require("@nestjs/common");
const role_schema_1 = require("./schemas/role.schema");
const mongoose_1 = require("@nestjs/mongoose");
const api_query_params_1 = require("api-query-params");
const mongoose_2 = require("mongoose");
const sample_data_1 = require("../databases/sample_data");
let RolesService = class RolesService {
    constructor(roleModel) {
        this.roleModel = roleModel;
    }
    async create(createRoleDto, user) {
        const { name, description, isActive, permissions } = createRoleDto;
        const isExist = await this.roleModel.findOne({ name });
        if (isExist) {
            throw new common_1.BadRequestException(`Role với name="${name}" đã tồn tại!`);
        }
        const newRole = await this.roleModel.create({
            name, description, isActive, permissions,
            createdBy: {
                _id: user._id,
                email: user.email
            }
        });
        return {
            _id: newRole?._id,
            createdAt: newRole?.createdAt
        };
    }
    async findAll(currentPage, limit, qs) {
        const { filter, sort, population, projection } = (0, api_query_params_1.default)(qs);
        delete filter.current;
        delete filter.pageSize;
        let offset = (+currentPage - 1) * (+limit);
        let defaultLimit = +limit ? +limit : 10;
        const totalItems = (await this.roleModel.find(filter)).length;
        const totalPages = Math.ceil(totalItems / defaultLimit);
        const result = await this.roleModel.find(filter)
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
                total: totalItems
            },
            result
        };
    }
    async findOne(id) {
        if (!mongoose_2.default.Types.ObjectId.isValid(id)) {
            throw new common_1.BadRequestException("not found role");
        }
        return (await this.roleModel.findById(id)).populate({
            path: "permissions",
            select: { _id: 1, path: 1, name: 1, method: 1, module: 1 }
        });
    }
    async update(_id, updateRoleDto, user) {
        if (!mongoose_2.default.Types.ObjectId.isValid(_id)) {
            throw new common_1.BadRequestException("not found role");
        }
        const { name, description, isActive, permissions } = updateRoleDto;
        const updated = await this.roleModel.updateOne({ _id }, {
            name, description, isActive, permissions,
            updatedBy: {
                _id: user._id,
                email: user.email
            }
        });
        return updated;
    }
    async remove(id, user) {
        const foundRole = await this.roleModel.findById(id);
        if (foundRole.name === sample_data_1.ADMIN_ROLE) {
            throw new common_1.BadRequestException("Không thể xóa role ADMIN");
        }
        await this.roleModel.updateOne({ _id: id }, {
            deletedBy: {
                _id: user._id,
                email: user.email
            }
        });
        return this.roleModel.softDelete({
            _id: id
        });
    }
};
exports.RolesService = RolesService;
exports.RolesService = RolesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(role_schema_1.Role.name)),
    __metadata("design:paramtypes", [Object])
], RolesService);
//# sourceMappingURL=roles.service.js.map