import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import authRouter from "./routes/auth.js";
import cityRouter from "./routes/city.js";
import weatherRouter from "./routes/weather.js";
import positionRouter from "./routes/position.js";
import airRouter from "./routes/air.js";
import sunRouter from "./routes/sun.js";

import cors from "cors";

dotenv.config();

const connectDB = async () => {
    try {
        await mongoose.connect(
            `mongodb+srv://kiet:${process.env.DB_PASSWORD}@mern-weather.xjyca5q.mongodb.net/mern-weather?retryWrites=true&w=majority`
        );
        console.log("mongoDB connected");
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

connectDB();
const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/auth", authRouter);
app.use("/api/cities", cityRouter);
app.use("/api/weather", weatherRouter);
app.use("/api/position", positionRouter);
app.use("/api/air", airRouter);
app.use("/api/sun", sunRouter);

const PORT = 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
