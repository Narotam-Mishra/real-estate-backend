import prisma from "../lib/prisma.js";

export const addMessage = async (req, res) => {
    try {
        res.status(200).json(chats)
    } catch (error) {
        console.log("Error while getting users:", error)
        res.status(500).json({ message: "Failed to add messages!!" })
    }
}