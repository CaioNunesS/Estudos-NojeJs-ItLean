import { verify } from 'jsonwebtoken'

export const isAuthenticated = (req, res, next) => {
    const authToken = req.headers.authorization

    if (!authToken) res.status(401).json({ message: 'Not authorized' })
    const [bearer, token] = authToken.split(' ')
    
    if (!bearer === 'bearer')
        res.status(401).json({ message: 'Badly formated token' })

    try {
        const {sub} = verify(token, process.env.JWT_SECRET)

        req.user_id = sub

        return next()
    } catch (error) {
        return res.status(401).json({
            message: 'Not authorized'
        })
    }
}