
import bcrypt from "bcrypt";
import prisma from "../lib/prisma.js";

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

export const loginUser = (req, res) => {
    console.log('login user API');
}

export const logoutUser = (req, res) => {
    console.log('logout user API');
}

