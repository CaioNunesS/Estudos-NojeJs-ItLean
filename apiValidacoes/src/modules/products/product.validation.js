import Joi from "joi";

export const newProduct = Joi.object({
    name: Joi.string().required(),
    price: Joi.number().required(),
    stock: Joi.number().required(),
    photo: Joi.string().optional()
});