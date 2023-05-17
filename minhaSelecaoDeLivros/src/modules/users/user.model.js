import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const { Schema } = mongoose

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    secret: {
        type: String,
    }
},
    { timestamps: true }
)


//middleware
userSchema.pre('save', async function (next) { // essa lib n está atualizada para usar arrow function.
    let user = this
    console.log('userPassword ===>',user.password);
    if (!user.isModified('password')) return next()

    let hashedPassword = await bcrypt.hash(user.password, 10) // aqui está criptografando a senha aleatoriamente para trazer mais segurança. O '10' é o salt, e indica quantos caracteres serao usados na criptografia
    console.log('hashedPassword ===>', hashedPassword);

    user.password = hashedPassword // aqui está atribuindo o hash criado para a senha que irá para o bd

    next()
})

userSchema.methods.matchPassword = async function (userPassword) {
    const isMatch = await bcrypt.compare(userPassword, this.password)

    return isMatch
}

export const userModel = mongoose.model('User', userSchema)


