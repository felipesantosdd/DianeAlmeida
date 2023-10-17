import { S3Client, PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import path from "path";
import mime from "mime";
import multerConfig from '../config/multer';
import { AppError } from "../error/error";
import fs from "fs/promises";
import { Readable } from 'stream';

class S3Storage {
    private client: S3Client;

    constructor() {
        this.client = new S3Client({
            region: 'us-east-2',
            credentials: {
                accessKeyId: process.env.AWS_ACCESS_KEY,
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

        const fileContent = await fs.readFile(originalPath);

        await this.client.send(new PutObjectCommand({
            Bucket: 'dianealmeida-modelos',
            Key: fileName,
            Body: fileContent,
            ContentType: contentType,
            ACL: 'public-read',
        }));

        await fs.unlink(originalPath);
    }

    async getFile(fileName: string): Promise<Buffer> {
        const response = await this.client.send(new GetObjectCommand({
            Bucket: 'dianealmeida-modelos',
            Key: fileName,
        }));

        if (response.Body instanceof Readable) {
            // Stream the content and convert it to a buffer
            const chunks: Uint8Array[] = [];
            for await (const chunk of response.Body) {
                chunks.push(chunk);
            }
            return Buffer.concat(chunks);
        } else {
            throw new AppError('Arquivo não encontrado no S3', 404);
        }
    }
}

export default S3Storage;
