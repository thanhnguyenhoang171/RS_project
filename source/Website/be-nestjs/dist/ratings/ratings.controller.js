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
exports.RatingsController = void 0;
const common_1 = require("@nestjs/common");
const ratings_service_1 = require("./ratings.service");
const create_rating_dto_1 = require("./dto/create-rating.dto");
const response_decorator_1 = require("../decorator/response.decorator");
const user_decorator_1 = require("../decorator/user.decorator");
const auth_global_decorator_1 = require("../decorator/auth_global.decorator");
let RatingsController = class RatingsController {
    constructor(ratingsService) {
        this.ratingsService = ratingsService;
    }
    async create(createRatingDto, user) {
        return this.ratingsService.create(createRatingDto, user);
    }
    getRatingByUser(user) {
        return this.ratingsService.findByUsers(user);
    }
    findAll(currentPage, limit, qs) {
        return this.ratingsService.findAll(+currentPage, +limit, qs);
    }
    getPositiveRatings() {
        return this.ratingsService.getPositive();
    }
    getPositiveComments() {
        return this.ratingsService.getPositiveComment();
    }
    getNegativeRatings() {
        return this.ratingsService.getNegative();
    }
    getNegativeComments() {
        return this.ratingsService.getNegativeComment();
    }
    getNeutralComments() {
        return this.ratingsService.getNeutralComment();
    }
    findOne(id) {
        return this.ratingsService.findOne(id);
    }
    getTotal() {
        return this.ratingsService.getTotal();
    }
    updateStatus(id, status, user) {
        return this.ratingsService.update(id, status, user);
    }
    remove(id, user) {
        return this.ratingsService.remove(id, user);
    }
};
exports.RatingsController = RatingsController;
__decorate([
    (0, common_1.Post)(),
    (0, response_decorator_1.ResponseMessage)("Create a new user rating"),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_rating_dto_1.CreateRatingDto, Object]),
    __metadata("design:returntype", Promise)
], RatingsController.prototype, "create", null);
__decorate([
    (0, common_1.Post)('by-user'),
    (0, response_decorator_1.ResponseMessage)("Get rating by User"),
    __param(0, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], RatingsController.prototype, "getRatingByUser", null);
__decorate([
    (0, common_1.Get)(),
    (0, response_decorator_1.ResponseMessage)("Fetch all user rating with paginate"),
    __param(0, (0, common_1.Query)("current")),
    __param(1, (0, common_1.Query)("pageSize")),
    __param(2, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", void 0)
], RatingsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)("positive-ratings"),
    (0, auth_global_decorator_1.Public)(),
    (0, response_decorator_1.ResponseMessage)("Get total positive rating"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], RatingsController.prototype, "getPositiveRatings", null);
__decorate([
    (0, common_1.Get)("positive-comments"),
    (0, auth_global_decorator_1.Public)(),
    (0, response_decorator_1.ResponseMessage)("Get total positive comments"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], RatingsController.prototype, "getPositiveComments", null);
__decorate([
    (0, common_1.Get)("negative-ratings"),
    (0, auth_global_decorator_1.Public)(),
    (0, response_decorator_1.ResponseMessage)("Get total negative ratings"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], RatingsController.prototype, "getNegativeRatings", null);
__decorate([
    (0, common_1.Get)("negative-comments"),
    (0, auth_global_decorator_1.Public)(),
    (0, response_decorator_1.ResponseMessage)("Get total negative comments"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], RatingsController.prototype, "getNegativeComments", null);
__decorate([
    (0, common_1.Get)("neutral-comments"),
    (0, auth_global_decorator_1.Public)(),
    (0, response_decorator_1.ResponseMessage)("Get total neutral comments"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], RatingsController.prototype, "getNeutralComments", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, response_decorator_1.ResponseMessage)("Fetch a user rating by id"),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], RatingsController.prototype, "findOne", null);
__decorate([
    (0, auth_global_decorator_1.Public)(),
    (0, common_1.Post)('total-items'),
    (0, response_decorator_1.ResponseMessage)("Total user ratings"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], RatingsController.prototype, "getTotal", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, response_decorator_1.ResponseMessage)("Update status user rating"),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)("status")),
    __param(2, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", void 0)
], RatingsController.prototype, "updateStatus", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, response_decorator_1.ResponseMessage)("Delete a user rating by id"),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], RatingsController.prototype, "remove", null);
exports.RatingsController = RatingsController = __decorate([
    (0, common_1.Controller)('ratings'),
    __metadata("design:paramtypes", [ratings_service_1.RatingsService])
], RatingsController);
//# sourceMappingURL=ratings.controller.js.map