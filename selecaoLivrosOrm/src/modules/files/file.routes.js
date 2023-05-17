import { Router } from "express";
import multer from "multer";
import { fileUploadBookPhoto, viewImage, deleteFile } from "./file.controller.js";
import { discStorage, limits, imageFileFilter } from "../../middlewares/fileUpload.js";
import { isAuthenticated } from '../../middlewares/isAuthenticated.js'

const fileRoutes = Router();

fileRoutes.post("/:bookId", isAuthenticated, multer({ storage: discStorage, limits, fileFilter: imageFileFilter }).single("file"), fileUploadBookPhoto);
fileRoutes.get("/:imageName", isAuthenticated, viewImage);
fileRoutes.delete("/:imageName", isAuthenticated, deleteFile)

export { fileRoutes };