
import { Server } from "socket.io";

const io = new Server({
    cors: "http://localhost:5173/"
})

io.on("connection", (socket) => {
    console.log("socket Id:", socket.id);
    socket.on("test", (data) => {
        console.log("Real time data in socket:", data);
    })
})

io.listen("4341")