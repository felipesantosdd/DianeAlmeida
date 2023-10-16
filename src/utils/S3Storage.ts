import { S3 } from "@aws-sdk/client-s3";
import path from "path";
import mime from "mime";
import { AppError } from "../error/error";
import { promises as fsPromises } from "fs";
import "dotenv/config";

class S3Storage {
    private client: S3;

    constructor() {
        this.client = new S3({
            region: 'us-east-2',
            credentials: {
                accessKeyId: process.env.AWS_ACECESS_KEY,
                secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
            },
        });
    }

    async saveFile(fileName: string): Promise<void> {
        const originalPath = path.resolve(`src/tmp/${fileName}`);
        const contentType = mime.getType(originalPath);

        if (!contentType) {
            throw new AppError('Tipo de conteúdo não encontrado para o arquivo', 404);
        }

        const fileContent = await fsPromises.readFile(originalPath);

        await this.client.send(new PutObjectCommand({
            Bucket: 'dianealmeida-modelos',
            Key: fileName,
            Body: fileContent,
            ContentType: contentType,
            ACL: 'public-read',
        }));
        
        await fsPromises.unlink(originalPath);
    }

    async getFile(fileName: string): Promise<Buffer> {
        const response = await this.client.send(new GetObjectCommand({
            Bucket: 'dianealmeida-modelos',
            Key: fileName,
        }));

        if (response.Body) {
            return response.Body;
        } else {
            throw new AppError('Arquivo não encontrado no S3', 404);
        }
    }
}

export default S3Storage;
