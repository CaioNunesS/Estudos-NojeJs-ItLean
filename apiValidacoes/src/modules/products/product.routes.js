import { Router } from "express";
import { addProduct, deleteProduct, findProductById, listProduct, updateProduct } from "./product.controller.js";
import { newProduct } from "./product.validation.js";
import { asyncWrapper } from "../../middlewares/asyncWrapper.js";
import { isAuthenticated } from "../../middlewares/isAuthenticated.js";
import { validate } from "../../middlewares/validate.js";

// import multer from "multer";
// import { fileUpload, viewImage } from "./file.controller.js";
// import { diskStorage, imageFileFilter, limits } from "../../middlewares/fileUpload.js";

const productRoutes = Router();

productRoutes.get("/", isAuthenticated, asyncWrapper(listProduct));
productRoutes.get("/:id", isAuthenticated, asyncWrapper(findProductById));
productRoutes.post("/", validate(newProduct), asyncWrapper(addProduct));
productRoutes.put("/:id", isAuthenticated, validate(newProduct), asyncWrapper(updateProduct));
productRoutes.delete("/:id", isAuthenticated, asyncWrapper(deleteProduct));

export { productRoutes };