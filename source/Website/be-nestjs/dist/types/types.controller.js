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
exports.TypesController = void 0;
const common_1 = require("@nestjs/common");
const types_service_1 = require("./types.service");
const create_type_dto_1 = require("./dto/create-type.dto");
const update_type_dto_1 = require("./dto/update-type.dto");
const user_decorator_1 = require("../decorator/user.decorator");
const auth_global_decorator_1 = require("../decorator/auth_global.decorator");
const response_decorator_1 = require("../decorator/response.decorator");
let TypesController = class TypesController {
    constructor(typesService) {
        this.typesService = typesService;
    }
    create(createTypeDto, user) {
        return this.typesService.create(createTypeDto, user);
    }
    findAll(currentPage, limit, qs) {
        return this.typesService.findAll(+currentPage, +limit, qs);
    }
    findOne(id) {
        return this.typesService.findOne(id);
    }
    update(id, updateTypeDto, user) {
        return this.typesService.update(id, updateTypeDto, user);
    }
    remove(id, user) {
        return this.typesService.remove(id, user);
    }
};
exports.TypesController = TypesController;
__decorate([
    (0, common_1.Post)(),
    (0, response_decorator_1.ResponseMessage)("Create new Type"),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_type_dto_1.CreateTypeDto, Object]),
    __metadata("design:returntype", void 0)
], TypesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, auth_global_decorator_1.Public)(),
    (0, response_decorator_1.ResponseMessage)("Fetch List Type with paginate"),
    __param(0, (0, common_1.Query)("current")),
    __param(1, (0, common_1.Query)("pageSize")),
    __param(2, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", void 0)
], TypesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, auth_global_decorator_1.Public)(),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TypesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_type_dto_1.UpdateTypeDto, Object]),
    __metadata("design:returntype", void 0)
], TypesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], TypesController.prototype, "remove", null);
exports.TypesController = TypesController = __decorate([
    (0, common_1.Controller)('types'),
    __metadata("design:paramtypes", [types_service_1.TypesService])
], TypesController);
//# sourceMappingURL=types.controller.js.map