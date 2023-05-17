import Joi from 'joi'

export const newBook = Joi.object({
    name: Joi.string().required(),
    photo: Joi.string().optional()
})

