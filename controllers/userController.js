import prisma from "../lib/prisma.js";
import bcrypt from 'bcrypt'

export const getUsers = async (req, res) => {
    try {
        const users = await prisma.user.findMany()
        res.status(200).json(users)
    } catch (error) {
        console.log("Error while getting users:", error)
        res.status(500).json({ message: "Failed to get users!!" })
    }
}

export const getUser = async (req, res) => {
    const id = req.params.id;
    try {
        const singleUser = await prisma.user.findUnique({
            where: {
                id
            }
        })
        res.status(200).json(singleUser)
    } catch (error) {
        console.log("Error while getting user:", error)
        res.status(500).json({ message: "Failed to get user by id!!" })
    }
}


export const updateUser = async (req, res) => {
    const id = req.params.id;
    const tokenUserId = req.userId;
    const { password, avatar, ...inputs } = req.body;

    if(id !== tokenUserId){
        return res.status(403).json({ message: "Not Authorized!!" })
    }

    let updatedPassword = null;
    try {
        if(password){
            updatedPassword = await bcrypt.hash(password, 7)
        }
        const updatedUser = await prisma.user.update({
            where: { id },
            data: {
                ...inputs,
                ...(updatedPassword && { password: updatedPassword }),
                ...(avatar && { avatar }),
            },
        })
        const { password:userPassword, ...rest } = updatedUser

        res.status(200).json(rest);
    } catch (error) {
        console.log("Error while updating users:", error)
        res.status(500).json({ message: "Failed to update user!!" })
    }
}


export const deleteUser = async (req, res) => {
    const id = req.params.id;
    const tokenUserId = req.userId;

    if(id !== tokenUserId){
        return res.status(403).json({ message: "Not Authorized!!" })
    }

    try {
        await prisma.user.delete({
            where: { id },
        });
        res.status(200).json({ message: "User deleted successfully!"});
    } catch (error) {
        console.log("Error while deleting users:", error)
        res.status(500).json({ message: "Failed to delete user!!" })
    }
}

export const savePost = async (req, res) => {
    const postId = req.body.postId;
    const tokenUserId = req.userId;

    try {
        const savedPst = await prisma.savedPost.findUnique({
            where: {
                userId_postId: {
                    userId: tokenUserId,
                    postId,
                },
            },
        });

        if(savedPst){
            await prisma.savedPost.delete({
                where: {
                    id: savedPst.id,
                },
            });
            res.status(200).json({ message: "Post removed from saved list" });
        }else{
            await prisma.savedPost.create({
                data: {
                    userId: tokenUserId,
                    postId,
                },
            });
            res.status(200).json({ message: "Post saved successfully!!" });
        }
    } catch (error) {
        console.log("Error while deleting users:", error)
        res.status(500).json({ message: "Failed to delete user!!" })
    }
}

export const profilePosts = async (req, res) => {
    const tokenUserId = req.params.userId

    try {
        const userPosts = await prisma.post.findMany({
            where: {
                userId: tokenUserId
            }
        })

        const saved = await prisma.savedPost.findMany({
            where: {
                userId: tokenUserId
            },
            include: {
                post: true,
            }
        })
        const savedPosts = saved.map((item) => item.post)
        res.status(200).json({ userPosts, savePost });
    } catch (error) {
        console.log("Error while getting user:", error)
        res.status(500).json({ message: "Failed to get profile posts!" })
    }
}
