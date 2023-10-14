import { request } from "express";
import multer from "multer";
import path from "path";
import crypto from "crypto";


const tmpFolder = path.resolve(__dirname, '..', 'tmp')
console.log(tmpFolder)
export default {
    directory: tmpFolder,
    storage: multer.diskStorage({
        destination: tmpFolder,
        filename(request, file, callback) {
            const filehash = crypto.randomBytes(10).toString(`hex`)

            const fileName = `${filehash}-${file.originalname}`

            return callback(null, fileName)
        }
    })

}