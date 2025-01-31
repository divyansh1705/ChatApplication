import express from "express"
import authRoutes from "./src/routes/auth.route.js"
import messageRoutes from "./src/routes/message.route.js"
import dotenv from "dotenv"
import cookieParser from "cookie-parser";
import { connectDB } from "./src/lib/db.js";
import cors from "cors"
import { app,server } from "./src/lib/socket.js";
import path from "path";

dotenv.config();
const PORT=process.env.PORT;
const __dirname = path.resolve();

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

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../frontend/dist")));
  
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
    });
  }

server.listen(PORT,()=>{
    console.log(`Server is listenong on port ${PORT}`);
    connectDB();
})