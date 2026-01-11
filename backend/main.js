import connectDB from "./lib/connectDB.js";
import express from "express";
import dotenv from "dotenv";
import registrationRoute from "./routes/registration.route.js";
import PostRoute from "./routes/post.route.js";
import ProfileRoute from "./routes/profile.route.js";
import ActionRoute from "./routes/actions.route.js";
import feedRoutes from "./routes/feed.route.js";
import cookieParser from "cookie-parser";
dotenv.config();

connectDB();
const app = express();

console.log("Working")


app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const port = process.env.PORT | 4000;

app.use("/api/v1/registration", registrationRoute);
app.use("/api/v1/post", PostRoute);
app.use("/api/v1/profile", ProfileRoute);
app.use("/api/v1/action", ActionRoute);
app.use("/api/v1/feed", feedRoutes);

export default app;
