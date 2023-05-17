import { userModel } from '../users/user.model.js'
import jwt from 'jsonwebtoken'
import crypto from 'crypto'

export const login = async (req, res) => {
    let user = await userModel.findOne({ email: req.body.email })
    if (!user) return res.status(404).json({ message: 'User does not exists' })

    let isMatch = await user.matchPassword(req.body.password)
    if (!isMatch) return res.status(401).json({ message: 'Invalid username/password' })

    let randomSecret = crypto.randomBytes(32).toString('hex') // Cria 32 caracteres usando o 'hex' para transformar em hexadecimal

    await userModel.updateOne({ _id: user._id }, { $set: { randomSecret } })

    let token = jwt.sign({ sub: user._id }, randomSecret, {expiresIn: '1h'})

    const {password, __v, secret, ...exposedUser} = user.toObject()
    // console.log('password ===>', password);

    return res.json({
        data:{
            token,
            user: exposedUser
        }
    })
}