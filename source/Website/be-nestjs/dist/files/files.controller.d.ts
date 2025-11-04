export declare class FilesController {
    uploadFile(file: Express.Multer.File): {
        fileName: string;
    };
    uploadFileFeedback(file: Express.Multer.File): Promise<any>;
    private runPythonScript;
}
