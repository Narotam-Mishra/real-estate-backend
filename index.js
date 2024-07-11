
import express from "express";
import postRoute from './routes/postRoutes.js'
import authRoute from './routes/authRoutes.js'


const app = express();

// to handle JSON data
app.use(express.json())

app.use('/api/posts', postRoute);
app.use('/api/auth', authRoute);

console.log("test");

const portno = 8800
app.listen(portno, () => {
    console.log(`Server is running on port: ${portno}`);
})