import { productModel } from "./product.model.js";

export const listProduct = async (req, res) => {
    let products = await productModel.find({}, { __v: 0 });
    return res.json({ data: { products } });
};

export const findProductById = async (req, res) => {
    let product = await productModel.findById(req.params.id).select("-__v");

    return res.json({ data: { product } });
};

export const addProduct = async (req, res) => {
    const image = `${process.env.URL_IMAGE}/${req.body.photo}`;
    const getProductDB = await productModel.findOne({ name: req.body.name });

    if (getProductDB) return res.status(400).json({ message: "Duplicated product" });

    let data = await productModel.create({...req.body, photo: image });

    const { _id, __v, ...product } = data.toObject();

    return res.status(201).json({ message: "Product successfully created", data: product });
};

export const updateProduct = async (req, res) => {
    let product = await productModel.findById(req.params.id);
    if (!product)
        return res
            .status(400)
            .json({ message: 'Product not found' });
    Object.assign(product, req.body);
    await product.save();
    return res.json({ message: 'Record updated' });
};

export const deleteProduct = async (req, res) => {
    let product = await productModel.findById(req.params.id);
    if (!product)
        return res
            .status(400)
            .json({ message: "Product not found" });

    const result = await productModel.deleteOne({ _id: req.params.id });
    return res.json(result);
};