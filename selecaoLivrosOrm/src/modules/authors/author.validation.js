import Joi from 'joi'

export const newAuthor = Joi.object({
    name: Joi.string().required(),
})