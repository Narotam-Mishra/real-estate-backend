
import prisma from "../lib/prisma.js";

export const getPosts = async (req, res) => {
    const query = req.query;
    // console.log(query);
    try {
        const posts = await prisma.post.findMany({
            where: {
                city: query.city || undefined,
                type: query.type || undefined,
                property: query.property || undefined,
                bedroom: parseInt(query.bedroom) || undefined,
                price: {
                    gte: parseInt(query.minPrice) || 0,
                    lte: parseInt(query.maxPrice) || 10000,
                }
            }
        })
        
        res.status(200).json(posts);
        // setTimeout(() => {
        //     res.status(200).json(posts);
        // }, 1000)
    } catch (error) {
        console.log("Error while fetching posts:", error)
        res.status(500).json({ message: "Failed to get posts" })
    }
}

export const getPostById = async (req, res) => {
    const id = req.params.id;
    try {
        const singlePost = await prisma.post.findUnique({
            where: { id },
            include: {
                postDetail: true,
                user: {
                    select: {
                        username: true,
                        avatar: true,
                    }
                }
            }
        })
        res.status(200).json(singlePost)
    } catch (error) {
        console.log("Error while fetching posts:", error)
        res.status(500).json({ message: "Failed to get post by Id" })
    }
}

export const addPost = async (req, res) => {
    const postFromBody = req.body
    const tokenUserId = req.userId

    try {
        const newPost = await prisma.post.create({
            data: {
                ...postFromBody.postData,
                userId: tokenUserId,
                postDetail: {
                    create: postFromBody.postDetail,
                },
            },
        });
        res.status(200).json(newPost)
    } catch (error) {
        console.log("Error while fetching posts:", error)
        res.status(500).json({ message: "Failed to add post" })
    }
}

export const updatePost = async (req, res) => {
    try {
        res.status(200).json()
    } catch (error) {
        console.log("Error while fetching posts:", error)
        res.status(500).json({ message: "Failed to update post" })
    }
}

export const deletePost = async (req, res) => {
    const id = req.params.id;
    const tokenUserId = req.userId

    try {
        const singlepost = await prisma.post.findUnique({
            where: { id }
        })

        // only authenticated user allowed to delete post
        if(singlepost.userId !== tokenUserId){
            return res.status(403).json({ message: "Not Authorized to delete post!" })
        }
        
        const postToBeDel = await prisma.post.delete({
            where: { id },
        });

        res.status(200).json({ postToBeDel, message: "Post deleted successfully!!"})
    } catch (error) {
        console.log("Error while fetching posts:", error)
        res.status(500).json({ message: "Failed to delete post" })
    }
}