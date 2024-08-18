
import { Server } from "socket.io";
import { getUsers } from "../controllers/userController.js";

const io = new Server({
    cors: "http://localhost:5173/"
})

let onlineUsers = []

const addUser = (userId, socketId) => {
    const userExists = onlineUsers.find((user) => user.userId === userId);
    if(!userExists){
        onlineUsers.push({ userId, socketId });
    }
}

const removeUser = (socketId) => {
    onlineUsers = onlineUsers.filter((user) => user.socketId !== socketId);
}

const getUser = (userId) => {
    return onlineUsers.find((user) => user.userId === userId)
}

io.on("connection", (socket) => {
    socket.on("newUser", (userId) => {
        addUser(userId, socket.id);
        console.log("List of Online Users:",onlineUsers);
    });

    socket.on("sendMessage", ({ receiverId, data }) => {
        // console.log("Message data:",data)
        const receiver = getUsers(receiverId);
        io.to(receiver.socketId).emit("getMessage", data)
    })

    socket.on("disconnect", () => {
        removeUser(socket.id);
    })
})

io.listen("4341")