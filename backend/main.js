import connectDB from "./lib/connectDb.js";
import express from "express";
import dotenv from "dotenv";
import registrationRoute from "./routes/registration.route.js"
import PostRoute from "./routes/post.route.js"
import cookieParser from "cookie-parser";



dotenv.config({ path: "./.env" });

connectDB();
const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const port = process.env.PORT | 4000;


app.use("/api/v1/registration",registrationRoute)
app.use("/api/v1/post",PostRoute)


app.listen(port, () => {
  console.log(`http://localhost:${port}/`);
});
