
import bcrypt from "bcrypt";
import prisma from "../lib/prisma.js";
import jwt from "jsonwebtoken"

export const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // hash password
    const hashedPassword = await bcrypt.hash(password, 7);
    console.log("Hashed Password:", hashedPassword);

    // create a new user and save to DB
    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });
    console.log(newUser);
    res.status(201).json({ message: "User created successfully!!" });
  } catch (error) {
    console.log("Error while creating user:", error);
    res.status(500).json({ message: "Failed to create user!" });
  }
};

export const loginUser = async (req, res) => {
  const { username, password } = req.body

  try {
    // check if the user exists
    const user = await prisma.user.findUnique({
      where: {
        username
      }
    })

    // if no user exist then send error message
    if(!user) return res.status(401).json({ message: "Invalid credentials!" })

    // check if the password is correct
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if(!isPasswordValid) return res.status(401).json({ message: "Invalid Credentials!" });

    // generate cookie token and send to the user
    // res.setHeader("Set-Cookie", "test=" + "cookieValue").json({ message: "Login successful!!" })
    
    const expirationAge = 1000 * 60 * 60 * 24 * 7

    // jwt token 
    const token = jwt.sign(
      {
        id: user.id,
        isAdmin: true,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: expirationAge }
    );

    const { password: userPassword, ...userInfo } = user

    res.cookie("token", token, {
      httpOnly: true,
      // secure: true,
      maxAge: expirationAge,
    }).status(200).json(userInfo)
  } catch (error) {
    console.log("Error while login:", error);
    res.status(500).json({ message: "Failed to login!" });
  }
}

export const logoutUser = (req, res) => {
  res.clearCookie("token").status(200).json({ message: "Logout successful!!"})
}

