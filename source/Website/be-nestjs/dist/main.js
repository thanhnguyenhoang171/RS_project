"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const config_1 = require("@nestjs/config");
const common_1 = require("@nestjs/common");
const transform_interceptor_1 = require("./core/transform.interceptor");
const jwt_auth_guard_1 = require("./auth/guard/jwt-auth.guard");
const cookieParser = require("cookie-parser");
const path_1 = require("path");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const reflector = app.get(core_1.Reflector);
    app.useGlobalPipes(new common_1.ValidationPipe());
    app.use(cookieParser());
    app.useGlobalGuards(new jwt_auth_guard_1.JwtAuthGuard(reflector));
    const configService = app.get(config_1.ConfigService);
    app.useGlobalInterceptors(new transform_interceptor_1.TransformInterceptor(reflector));
    app.useStaticAssets((0, path_1.join)(__dirname, '..', 'public'));
    app.setGlobalPrefix("api");
    app.enableVersioning({
        type: common_1.VersioningType.URI,
        defaultVersion: ['1']
    });
    app.enableCors({
        origin: true,
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        preflightContinue: false,
        credentials: true,
    });
    const port = configService.get('PORT') || 3002;
    const host = configService.get('HOST');
    await app.listen(port, host);
    console.log(`Application is running on: http://${host}:${port}, Port: ${port}`);
}
bootstrap();
//# sourceMappingURL=main.js.map