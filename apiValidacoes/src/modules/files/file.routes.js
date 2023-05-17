import { Router } from "express";
import multer from "multer";
import { fileUpload, fileUploadProductPhoto, viewImage } from "./file.controller.js";
import { discStorage, limits, imageFileFilter } from "../../middlewares/fileUpload.js";

const fileRoutes = Router();

fileRoutes.post("/:bookId", multer({ storage: discStorage, limits, fileFilter: imageFileFilter }).single("file"), fileUploadProductPhoto);
fileRoutes.get("/:imageName", viewImage);

export { fileRoutes };