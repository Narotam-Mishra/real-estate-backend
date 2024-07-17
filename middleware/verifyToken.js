import jwt from 'jsonwebtoken'

export const verifyToken = (req, res, next) => {
    const token = req.cookies.token

    // if no token exist, then user should be allowed to access the routes
    if(!token) return res.status(401).json({ message: "Not Authenticated!!" });

    // verify JWT token
    jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, payload) => {
        if(err) return res.status(403).json({ message: "Token is not valid!!" });
        req.userId = payload.id;

        next()
    })
}