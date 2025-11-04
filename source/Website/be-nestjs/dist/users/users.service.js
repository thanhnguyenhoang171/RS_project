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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const create_user_dto_1 = require("./dto/create-user.dto");
const mongoose_1 = require("@nestjs/mongoose");
const user_schema_1 = require("./schemas/user.schema");
const mongoose_2 = require("mongoose");
const bcryptjs_1 = require("bcryptjs");
const api_query_params_1 = require("api-query-params");
const role_schema_1 = require("../roles/schemas/role.schema");
const user_decorator_1 = require("../decorator/user.decorator");
const sample_data_1 = require("../databases/sample_data");
let UsersService = class UsersService {
    constructor(userModel, roleModel) {
        this.userModel = userModel;
        this.roleModel = roleModel;
        this.getHashPassword = (password) => {
            const salt = (0, bcryptjs_1.genSaltSync)(10);
            const hash = (0, bcryptjs_1.hashSync)(password, salt);
            return hash;
        };
        this.updateUserToken = async (refreshToken, _id) => {
            return await this.userModel.updateOne({ _id }, { refreshToken });
        };
        this.findUserByToken = async (refreshToken) => {
            return await this.userModel.findOne({ refreshToken })
                .populate({
                path: "role",
                select: { name: 1 }
            });
        };
    }
    async create(createUserDto, user) {
        const { name, email, password, role } = createUserDto;
        const isExist = await this.userModel.findOne({ email });
        if (isExist) {
            throw new common_1.BadRequestException(`Email: ${email} đã tồn tại trên hệ thống. Vui lòng sử dụng email khác.`);
        }
        const hashPassword = this.getHashPassword(password);
        let newUser = await this.userModel.create({
            name, email,
            password: hashPassword,
            role,
            createdBy: {
                _id: user._id,
                email: user.email
            }
        });
        return newUser;
    }
    async register(user) {
        const { name, email, password } = user;
        const isExist = await this.userModel.findOne({ email });
        if (isExist) {
            throw new common_1.BadRequestException(`Email: ${email} đã tồn tại trên hệ thống. Vui lòng sử dụng email khác.`);
        }
        const userRole = await this.roleModel.findOne({ name: sample_data_1.USER_ROLE });
        const hashPassword = this.getHashPassword(password);
        let newRegister = await this.userModel.create({
            name, email,
            password: hashPassword,
            role: userRole?._id
        });
        return newRegister;
    }
    async findAll(currentPage, limit, qs) {
        const { filter, sort, population } = (0, api_query_params_1.default)(qs);
        delete filter.current;
        delete filter.pageSize;
        let offset = (+currentPage - 1) * (+limit);
        let defaultLimit = +limit ? +limit : 10;
        const totalItems = (await this.userModel.find(filter)).length;
        const totalPages = Math.ceil(totalItems / defaultLimit);
        const result = await this.userModel.find(filter)
            .skip(offset)
            .limit(defaultLimit)
            .sort(sort)
            .select('-password')
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
    async findOne(id) {
        if (!mongoose_2.default.Types.ObjectId.isValid(id))
            return `not found user`;
        return await this.userModel.findOne({
            _id: id
        })
            .select("-password")
            .populate({ path: "role", select: { name: 1, _id: 1 } });
    }
    findOneByUsername(username) {
        return this.userModel.findOne({
            email: username
        }).populate({
            path: "role",
            select: { name: 1 }
        });
    }
    isValidPassword(password, hash) {
        return (0, bcryptjs_1.compareSync)(password, hash);
    }
    async update(_id, updateUserDto, user) {
        if (!mongoose_2.default.Types.ObjectId.isValid(_id)) {
            throw new common_1.BadRequestException("Id user không hợp lệ");
        }
        const { name, email, role, isActive } = updateUserDto;
        const updated = await this.userModel.updateOne({ _id }, {
            ...updateUserDto,
            updatedBy: {
                _id: user._id,
                email: user.email
            }
        });
        return updated;
    }
};
exports.UsersService = UsersService;
__decorate([
    __param(1, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto, Object]),
    __metadata("design:returntype", Promise)
], UsersService.prototype, "create", null);
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __param(1, (0, mongoose_1.InjectModel)(role_schema_1.Role.name)),
    __metadata("design:paramtypes", [Object, Object])
], UsersService);
//# sourceMappingURL=users.service.js.map