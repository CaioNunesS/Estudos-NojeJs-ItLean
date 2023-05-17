import Joi from 'joi'

export const newBook = Joi.object({
    title: Joi.string().required(),
    yearOfRelease: Joi.number(),
    author: Joi.string()

})

