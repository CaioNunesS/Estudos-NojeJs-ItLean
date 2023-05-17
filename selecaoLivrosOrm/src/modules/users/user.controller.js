import UserModel from "./user.model.js";

export const listAll = async (req, res) => {
    let users = await UserModel.findAll({
        attributes: { exclude: ["password", "secret"] }
    })

    return res.json({ data: { users } })
}

export const findById = async (req, res) => {
    UserModel.findByPk(req.params.id).then((result) => res.json(result))
}

export const create = async (req, res) => {

    let data = await UserModel.create(req.body)
    const { id, name, email, updatedAt, createdAt, isAdmin } = data

    return res.status(201).json({ message: 'User created success', data: { id, name, email, isAdmin, updatedAt, createdAt } })
}

export const update = async (req, res) => {
    let user = await UserModel.findByPk(req.params.id)
    if (!user)
        return res.status(400).json({ message: 'User not found' })
    Object.assign(user, req.body)
    await user.save()
    return res.json({ message: 'Record updated' })
}

export const remove = async (req, res) => {
    const { userId } = req.params
    let user = await UserModel.findByPk(userId)
    console.log('user ===>', user);
    if (!user) return res.status(400).json({ message: "user not found." })

    await UserModel.destroy({
        where: {
            id: req.params.userId
        }
    })
    res.status(203).json({ message: "User deleted" })
}
