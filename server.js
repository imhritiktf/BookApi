import express from "express";
import cookieParser from "cookie-parser";
import { PORT, MONGO_URI } from "./config.js";
import mongoose from "mongoose";

// importing routes
import authRoutes from "./routes/authRoutes.js"
import bookRoutes from "./routes/bookRoutes.js"
import reviewRoutes from "./routes/reviewRoutes.js"

const app = express();

// middleware
app.use(express.json());
app.use(cookieParser())

// use routes
app.use("/api/auth", authRoutes)
app.use("/api/books", bookRoutes)
app.use("/api", reviewRoutes)



mongoose.connect(MONGO_URI)
    .then(()=>{
        app.listen(PORT, console.log(`server is running on port ${PORT}`))
    }).catch((err)=>{
        console.log("mongodb connection error ", err);
    })
