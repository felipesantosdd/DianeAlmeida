import AWS from "aws-sdk";
import path from "path";
import mime from "mime";
import multerConfig from '../config/multer'
import { AppError } from "../error/error";
import fs from "fs";
import "dotenv/config";

class S3Storage {
    private client: AWS.S3

    constructor() {
        this.client = new AWS.S3({
            accessKeyId: process.env.AWS_ACECESS_KEY,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
            region: 'us-east-2',
        })
    }

    async saveFile(fileName: string): Promise<void> {
        const originalPath = path.resolve(`src/tmp/${fileName}`);

        const contentType = mime.getType(originalPath);

        if (!contentType) {
            throw new AppError('Tipo de conteúdo não encontrado para o arquivo', 404);
        }

        const fileContent = await fs.promises.readFile(originalPath);

        await this.client.putObject({
            Bucket: `dianealmeida-modelos`,
            Key: fileName,
            Body: fileContent,
            ContentType: contentType,
            ACL: 'public-read'
        }).promise();

        await fs.promises.unlink(originalPath);
    }

    async getFile(fileName: string): Promise<Buffer> {
        const response = await this.client.getObject({
            Bucket: 'dianealmeida-modelos',
            Key: fileName,
        }).promise();


        if (response.Body) {
            return response.Body as Buffer;
        } else {
            throw new AppError('Arquivo não encontrado no S3', 404);
        }
    }
}


export default S3Storage;
