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
exports.FilesController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const http_exception_filter_1 = require("../core/http-exception.filter");
const auth_global_decorator_1 = require("../decorator/auth_global.decorator");
const response_decorator_1 = require("../decorator/response.decorator");
const python_shell_1 = require("python-shell");
const path = require("path");
let FilesController = class FilesController {
    uploadFile(file) {
        return {
            fileName: file.filename
        };
    }
    async uploadFileFeedback(file) {
        if (!file) {
            throw new common_1.BadRequestException('No file uploaded');
        }
        const filePath = path.resolve(file.path);
        const pythonOptions = {
            scriptPath: path.resolve(__dirname, '../../src/python-model-AI/'),
            pythonPath: path.resolve(__dirname, '../../env/Scripts/python.exe'),
            args: [filePath],
            pythonOptions: ['-u'],
            encoding: 'utf-8',
        };
        try {
            const results = await this.runPythonScript('emotion_detection.py', pythonOptions);
            const combinedResults = results.join('');
            const jsonMatch = combinedResults.match(/{.*}/s);
            if (!jsonMatch) {
                throw new Error('Invalid result from Python script');
            }
            const parsedResults = JSON.parse(jsonMatch[0]);
            return {
                fileName: file.filename,
                detectedEmotion: parsedResults.results,
                outputImage: parsedResults.output_image,
            };
        }
        catch (error) {
            console.error('Error running Python script:', error.message);
            throw new Error('Error processing image');
        }
    }
    runPythonScript(scriptName, options) {
        return new Promise((resolve, reject) => {
            const shell = new python_shell_1.PythonShell(scriptName, options);
            let resultData = [];
            shell.on('message', (message) => {
                resultData.push(message);
            });
            shell.end((err) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(resultData);
                }
            });
        });
    }
};
exports.FilesController = FilesController;
__decorate([
    (0, auth_global_decorator_1.Public)(),
    (0, common_1.Post)('upload'),
    (0, response_decorator_1.ResponseMessage)("Upload Single File"),
    (0, common_1.UseFilters)(new http_exception_filter_1.HttpExceptionFilter()),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('fileUpload')),
    __param(0, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], FilesController.prototype, "uploadFile", null);
__decorate([
    (0, common_1.Post)('upload-feedback'),
    (0, auth_global_decorator_1.Public)(),
    (0, response_decorator_1.ResponseMessage)('Upload single file'),
    (0, common_1.UseFilters)(new http_exception_filter_1.HttpExceptionFilter()),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('fileUpload')),
    __param(0, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], FilesController.prototype, "uploadFileFeedback", null);
exports.FilesController = FilesController = __decorate([
    (0, common_1.Controller)('files')
], FilesController);
//# sourceMappingURL=files.controller.js.map