import { existsSync, unlinkSync } from "fs";
import { resolve } from "path";
import BookModel from "../books/book.model.js";

export const viewImage = (req, res) => {
    const { imageName } = req.params;
    const imagePath = resolve('uploads', imageName);

    if (!existsSync(imagePath)) return res.status(404).json({ message: "Image not found" });

    return res.sendFile(imagePath);
};

export const fileUploadBookPhoto = async (req, res) => {
    const { bookId } = req.params;

    const getBookDB = await BookModel.findByPk(bookId);
    let photo = `${process.env.URL_IMAGE}/${req.file.filename}`

    if (!req.file) return res.status(422).json({ message: "Please select a file" });

    await getBookDB.update({ photo })
    return res.json({ data: req.file });
};

export const deleteFile = (req, res) => {
    const {imageName} = req.params

    const imagePath = resolve('uploads', imageName);

    if (!existsSync(imagePath)) return res.status(404).json({ message: "Image not found" });
    unlinkSync(imagePath)

    res.status(202).json({message: "file deleted with success"})
}