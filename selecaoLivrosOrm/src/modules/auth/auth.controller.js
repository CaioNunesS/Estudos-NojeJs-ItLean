import userModel from '../users/user.model.js'
import jwt from 'jsonwebtoken'

export const login = async (req, res) => {
    let user = await userModel.findOne({ where: {email: req.body.email} });
    if (!user) return res.status(404).json({ message: 'Invalid username/password' });

    let isMatch = await user.matchPasswords(req.body.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid username/password' });

    let token = jwt.sign({ sub: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    return res.json({
        data: {
            token
        }
    });
}

export const profile = async (req, res) => {
    let user = await userModel.findOne({ id: req.userId });

    const { id, name, email, isAdmin, createdAt, updatedAt  } = user

    return res.json({ data: { id, name, email, isAdmin, createdAt, updatedAt  } });
}







