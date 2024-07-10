
import express from "express";

const app = express();

app.use('/api/test', (req,res) => {
    res.send("Express up and running");
})

console.log("test");

const portno = 8800
app.listen(portno, () => {
    console.log(`Server is running on port: ${portno}`);
})