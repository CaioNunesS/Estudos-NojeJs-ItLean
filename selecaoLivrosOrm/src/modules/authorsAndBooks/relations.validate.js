import Joi from "joi";

export const newRelation = Joi.object({
    authorId: Joi.string().required(),
    bookId: Joi.string().required()
});