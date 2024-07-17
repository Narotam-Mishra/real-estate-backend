
import jwt from 'jsonwebtoken'

export const shouldBeLoggedIn = (req, res) => {
    console.log("User Id:", req.userId);
    res.status(200).json({ message: "You are Authenticated!"})
}



export const shouldBeAdmin = (req, res) => {
    const token = req.cookies.token

    // if no token exist, then user should be allowed to access the routes
    if(!token) return res.status(401).json({ message: "Not Authenticated!!" });

    // verify JWT token
    jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, payload) => {
        if(err) return res.status(403).json({ message: "Token is not valid!!" });

        // check user is Admin or not
        if(!payload.isAdmin){
            return res.status(403).json({ message: "Not authorized!!" });
        } 

    })

    res.status(200).json({ message: "You are Authenticated!"})
}