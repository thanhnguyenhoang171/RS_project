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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const roles_service_1 = require("../roles/roles.service");
const auth_global_decorator_1 = require("../decorator/auth_global.decorator");
const local_auth_guard_1 = require("./guard/local-auth.guard");
const response_decorator_1 = require("../decorator/response.decorator");
const create_user_dto_1 = require("../users/dto/create-user.dto");
const user_decorator_1 = require("../decorator/user.decorator");
let AuthController = class AuthController {
    constructor(authService, rolesService) {
        this.authService = authService;
        this.rolesService = rolesService;
    }
    handleLogin(req, response) {
        return this.authService.login(req.user, response);
    }
    handleRegister(registerUserDto) {
        return this.authService.register(registerUserDto);
    }
    async handleGetAccount(user) {
        const temp = await this.rolesService.findOne(user.role._id);
        user.permissions = temp.permissions;
        return { user };
    }
    handleRefreshToken(request, response) {
        const refreshToken = request.cookies["refresh_token"];
        return this.authService.processNewToken(refreshToken, response);
    }
    handleLogout(response, user) {
        return this.authService.logout(response, user);
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, auth_global_decorator_1.Public)(),
    (0, common_1.UseGuards)(local_auth_guard_1.LocalAuthGuard),
    (0, common_1.Post)('/login'),
    (0, response_decorator_1.ResponseMessage)("User Login"),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "handleLogin", null);
__decorate([
    (0, auth_global_decorator_1.Public)(),
    (0, response_decorator_1.ResponseMessage)("Register a new user"),
    (0, common_1.Post)('/register'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.RegisterUserDto]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "handleRegister", null);
__decorate([
    (0, response_decorator_1.ResponseMessage)("Get user information"),
    (0, common_1.Get)('/account'),
    __param(0, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "handleGetAccount", null);
__decorate([
    (0, auth_global_decorator_1.Public)(),
    (0, response_decorator_1.ResponseMessage)("Get User by refresh token"),
    (0, common_1.Get)('/refresh'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "handleRefreshToken", null);
__decorate([
    (0, response_decorator_1.ResponseMessage)("Logout User"),
    (0, common_1.Post)('/logout'),
    __param(0, (0, common_1.Res)({ passthrough: true })),
    __param(1, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "handleLogout", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)("auth"),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        roles_service_1.RolesService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map