import S3Storage from "../../services/v1/S3Storage"

class UploadFilesController {
    async UploadImageService(file: Express.Multer.File): Promise<void> {
        const s3Storage = new S3Storage()

        await s3Storage.saveFile(file.filename)
    }

    async DeleteImageService(filename: string): Promise<void> {
        const s3Storage = new S3Storage();

        await s3Storage.deleteFile(filename);
    }
}
export default UploadFilesController