import multer from "multer";
import crypto from "crypto";
import { resolve } from "path";
import { appError } from "../utils/appError.js";
import { __dirname } from "../utils/index.js";

export const discStorage = multer.diskStorage({
    destination: resolve(__dirname, '..', '..', './uploads'),
    filename: (req, file, cb) => {
        crypto.randomBytes(16, function (err, raw) {
            if (err) cb(err)

            cb(null, raw.toString('hex') + Date.now() + '.' + file.originalname.split('.').pop().trim()
            )
        });
    }
});

export const limits = {
    fileSize: parseInt(process.env.FILE_UPLOAD_SIZE_IN_BYTES)
}

export const imageFileFilter = (req, file, cb) => {
    if (!['image/png', 'image/jpg', 'image/jpeg'].includes(file.mimetype)) {
        return cb(
            new appError('Only jpg,jpeg,png formats are allowed', 422)
        );
    }
    cb(null, true);
}

