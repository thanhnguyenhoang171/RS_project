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
var DatabasesService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabasesService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const mongoose_1 = require("@nestjs/mongoose");
const permission_schema_1 = require("../permissions/schemas/permission.schema");
const role_schema_1 = require("../roles/schemas/role.schema");
const user_schema_1 = require("../users/schemas/user.schema");
const users_service_1 = require("../users/users.service");
const sample_data_1 = require("./sample_data");
let DatabasesService = DatabasesService_1 = class DatabasesService {
    constructor(userModel, permissionModel, roleModel, configService, userService) {
        this.userModel = userModel;
        this.permissionModel = permissionModel;
        this.roleModel = roleModel;
        this.configService = configService;
        this.userService = userService;
        this.logger = new common_1.Logger(DatabasesService_1.name);
    }
    async onModuleInit() {
        const isInit = this.configService.get("SHOULD_INIT");
        if (Boolean(isInit)) {
            const countUser = await this.userModel.count({});
            const countPermission = await this.permissionModel.count({});
            const countRole = await this.roleModel.count({});
            if (countPermission === 0) {
                await this.permissionModel.insertMany(sample_data_1.INIT_PERMISSIONS);
            }
            if (countRole === 0) {
                const permissions = await this.permissionModel.find({}).select("_id");
                await this.roleModel.insertMany([
                    {
                        name: sample_data_1.ADMIN_ROLE,
                        description: "Quản trị viên hệ thống",
                        isActive: true,
                        permissions: permissions
                    },
                    {
                        name: sample_data_1.USER_ROLE,
                        description: "Người dùng/Ứng viên sử dụng hệ thống",
                        isActive: true,
                        permissions: []
                    }
                ]);
            }
            if (countUser === 0) {
                const adminRole = await this.roleModel.findOne({ name: sample_data_1.ADMIN_ROLE });
                const userRole = await this.roleModel.findOne({ name: sample_data_1.USER_ROLE });
                await this.userModel.insertMany([
                    {
                        name: "I'm admin",
                        email: "admin@gmail.com",
                        password: this.userService.getHashPassword(this.configService.get("INIT_PASSWORD")),
                        role: adminRole?._id
                    },
                    {
                        name: "Nguyễn Hoàng THanh",
                        email: "thanh@gmail.com",
                        password: this.userService.getHashPassword(this.configService.get("INIT_PASSWORD")),
                        role: adminRole?._id
                    },
                    {
                        name: "Nguyễn Lê Minh Khuê",
                        email: "khue@gmail.com",
                        password: this.userService.getHashPassword(this.configService.get("INIT_PASSWORD")),
                        role: userRole?._id
                    },
                ]);
            }
            if (countUser > 0 && countRole > 0 && countPermission > 0) {
                this.logger.log('>>> ALREADY INIT SAMPLE DATA...');
            }
        }
    }
};
exports.DatabasesService = DatabasesService;
exports.DatabasesService = DatabasesService = DatabasesService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __param(1, (0, mongoose_1.InjectModel)(permission_schema_1.Permission.name)),
    __param(2, (0, mongoose_1.InjectModel)(role_schema_1.Role.name)),
    __metadata("design:paramtypes", [Object, Object, Object, config_1.ConfigService,
        users_service_1.UsersService])
], DatabasesService);
//# sourceMappingURL=databases.service.js.map