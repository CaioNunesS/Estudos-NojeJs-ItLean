import Joi from 'joi'

export const newLogin = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
})

