"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MulterConfigService = void 0;
const common_1 = require("@nestjs/common");
const fs = require("fs");
const multer_1 = require("multer");
const path = require("path");
let MulterConfigService = class MulterConfigService {
    constructor() {
        this.getRootPath = () => {
            return process.cwd();
        };
    }
    ensureExists(targetDirectory) {
        fs.mkdir(targetDirectory, { recursive: true }, (error) => {
            if (!error) {
                console.log("Directory successfully created, or it already exists!");
                return;
            }
            switch (error.code) {
                case 'EEXIST':
                    console.error(`Error: The requested location "${targetDirectory}" exists, but it's not a directory.`);
                    break;
                case 'ENOTDIR':
                    console.error(`Error: The parent directory contains a file with the same name as the directory you're trying to create: "${path.dirname(targetDirectory)}".`);
                    break;
                case 'EACCES':
                    console.error(`Error: Permission denied when trying to create "${targetDirectory}".`);
                    break;
                default:
                    console.error(`Error: An unexpected error occurred - ${error.message}`);
                    break;
            }
        });
    }
    createMulterOptions() {
        return {
            storage: (0, multer_1.diskStorage)({
                destination: (req, file, cb) => {
                    const folder = req?.headers?.folder_type ?? 'default';
                    this.ensureExists(`public/images/${folder}`);
                    cb(null, path.join(this.getRootPath(), `public/images/${folder}`));
                },
                filename: (req, file, cb) => {
                    let extensionName = path.extname(file.originalname);
                    let baseName = path.basename(file.originalname, extensionName);
                    let finalName = `${baseName}-${Date.now()}${extensionName}`;
                    cb(null, finalName);
                }
            }),
            fileFilter: (req, file, cb) => {
                const allowedFileTypes = ['jpg', 'jpeg', 'png', 'gif', 'pdf', 'doc', 'docx'];
                const fileExtension = file.originalname.split('.').pop().toLowerCase();
                const isValidFileType = allowedFileTypes.includes(fileExtension);
                if (!isValidFileType) {
                    cb(new common_1.HttpException('Định dạng file không hợp lệ', common_1.HttpStatus.UNPROCESSABLE_ENTITY), null);
                }
                else {
                    cb(null, true);
                }
            },
            limits: {
                fileSize: 1024 * 1024 * 10
            }
        };
    }
};
exports.MulterConfigService = MulterConfigService;
exports.MulterConfigService = MulterConfigService = __decorate([
    (0, common_1.Injectable)()
], MulterConfigService);
//# sourceMappingURL=multer.config.js.map