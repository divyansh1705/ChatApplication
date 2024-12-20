import express from "express"
import authRoutes from "./src/routes/auth.route.js"
import messageRoutes from "./src/routes/message.route.js"
import dotenv from "dotenv"
import cookieParser from "cookie-parser";
import { connectDB } from "./src/lib/db.js";
import cors from "cors"
import { app,server } from "./src/lib/socket.js";

dotenv.config();
const PORT=process.env.PORT;

app.use(express.json({limit:"20mb"}));
app.use(express.urlencoded({ limit: "20mb", extended: true }));
app.use(cookieParser());

app.use(
    cors({
        origin:"http://localhost:5173",
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials:true,
    })
)

app.use("/api/auth",authRoutes);
app.use("/api/message",messageRoutes);

server.listen(PORT,()=>{
    console.log(`Server is listenong on port ${PORT}`);
    connectDB();
})