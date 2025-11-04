"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PublicPermission = exports.IS_PUBLIC_PERMISSION = exports.Public = exports.IS_PUBLIC_KEY = void 0;
const common_1 = require("@nestjs/common");
exports.IS_PUBLIC_KEY = 'isPublic';
const Public = () => (0, common_1.SetMetadata)(exports.IS_PUBLIC_KEY, true);
exports.Public = Public;
exports.IS_PUBLIC_PERMISSION = 'isPublicPermission';
const PublicPermission = () => (0, common_1.SetMetadata)(exports.IS_PUBLIC_PERMISSION, true);
exports.PublicPermission = PublicPermission;
//# sourceMappingURL=auth_global.decorator.js.map