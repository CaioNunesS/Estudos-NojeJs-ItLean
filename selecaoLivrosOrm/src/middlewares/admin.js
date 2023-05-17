import UserModel from "../modules/users/user.model.js";

export const isAdministrator = async (req, res, next) => {
    const admin = await UserModel.findByPk(req.userId);

    if (!admin.isAdmin === true) return res.status(401).json({ message: "unauthorized" });

    return next();
}