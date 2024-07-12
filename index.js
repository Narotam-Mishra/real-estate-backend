
import express from "express";
import postRoute from './routes/postRoutes.js'
import authRoute from './routes/authRoutes.js'
import cookieParser from "cookie-parser";
import evar from 'dotenv';
const app = express();

// configure environment variables
evar.config();

// to handle JSON data
app.use(express.json())

// using cookie parser
app.use(cookieParser())

app.use('/api/posts', postRoute);
app.use('/api/auth', authRoute);

console.log("test");

const portno = 8800
app.listen(portno, () => {
    console.log(`Server is running on port: ${portno}`);
})