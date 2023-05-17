import { existsSync } from "fs";
import { resolve } from "path";
import { productModel } from "../products/product.model.js";

export const fileUpload = (req, res) => {
    // if (!req.file) return res.status(422).json({
    //     message: "Please select a file"
    // });

    // return res.json({
    //     data: req.file
    // });

    if(req.file) return res.json({data: req.file});
    return res.status(422).json({message: "please, select a file."});
    
};

export const viewImage = (req, res) => {
    const { imageName } = req.params;
    const imagePath = resolve('uploads', imageName);

    if (!existsSync(imagePath)) return res.status(404).json({ message: "Image not found" });

    return res.sendFile(imagePath);
};

export const fileUploadProductPhoto = async (req, res) => {
    const { productId } = req.params;

    const getProductDB = await productModel.findById(productId);

    if (!req.file) return res.status(422).json({ message: "Please select a file" });

    await productModel.updateOne({ _id: getProductDB.id }, { $set: { photo: `${process.env.URL_IMAGE}/${req.file.filename}` }});

    return res.json({ data: req.file });
};