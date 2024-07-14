
import express from "express";
import postRoute from './routes/postRoutes.js'
import authRoute from './routes/authRoutes.js'
import testRoute from './routes/testRoutes.js'
import cookieParser from "cookie-parser";
import evar from 'dotenv';
import cors from 'cors';

const app = express();

// CORs resolution
// credentials: true will allows us to send cookies to client side
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));


// configure environment variables
evar.config();

// to handle JSON data
app.use(express.json())

// using cookie parser
app.use(cookieParser())

app.use('/api/posts', postRoute);
app.use('/api/auth', authRoute);
app.use('/api/test', testRoute);

console.log("test");

const portno = 8800
app.listen(portno, () => {
    console.log(`Server is running on port: ${portno}`);
})