import mongoose from "mongoose";

const { Schema } = mongoose;

const productSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        stock: {
            type: Number,
            required: true,
        },
        photo: {
            type: String
        }
    },
    { timestamps: true }
);

export const productModel = mongoose.model("Product", productSchema);