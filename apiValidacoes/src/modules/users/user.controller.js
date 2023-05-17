import { userModel } from "./user.model.js";

export const index = async (req, res) => {
  let users = await userModel.find({}, { password: 0, __v: 0 })
  return res.json({ data: { users } })
}

export const create = async (req, res) => {
    let data = await userModel.create(req.body)

    const { password, __v, ...user } = data.toObject()

    return res.status(201).json({ message: 'User created success', data: user })
}

export const update = async (req, res) => {
  let user = await userModel.findById(req.params.id)
  if (!user)
    return res
      .status(httpStatus.BAD_REQUEST)
      .json({ message: 'User not found' })
  Object.assign(user, req.body)
  await user.save()
  return res.json({ message: 'Record updated' })
}
