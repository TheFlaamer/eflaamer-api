import aws, { S3} from 'aws-sdk'
import path from 'path'
import multerConfig from '../../config/v1/multer'
import mime from 'mime'
import fs from 'fs'

class S3Storage {
    private client: S3

    constructor() {
        this.client = new aws.S3({
            region: 'us-east-1'
        })
    }

    async saveFile(filename: string): Promise<void> {
        const originalPath = path.resolve(multerConfig.directory, filename)
        const ContentType = mime.getType(originalPath)

        if(!ContentType) {
            throw new Error ("File not found")
        }

        const fileContent = await fs.promises.readFile(originalPath)
        this.client.putObject({
            Bucket: "teste", //onde vai armazenar
            Key: filename,
            ACL: 'public-read',//tipo do arquivo, se pode ser baixado, publico etc
            Body: fileContent,
            ContentType
        }).promise()

        await fs.promises.unlink(originalPath)
    }

    async deleteFile(filename: string): Promise<void> {
        this.client.deleteObject({
            Bucket: "teste",
            Key: filename
        }).promise()
    }
}

export default S3Storage