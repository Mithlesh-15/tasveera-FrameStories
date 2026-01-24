import connectDB from "./lib/connectDB.js";
import express from "express";
import http from "http";
import dotenv from "dotenv";
import registrationRoute from "./routes/registration.route.js";
import PostRoute from "./routes/post.route.js";
import ProfileRoute from "./routes/profile.route.js";
import ActionRoute from "./routes/actions.route.js";
import feedRoutes from "./routes/feed.route.js";
import chatRoutes from "./routes/chat.route.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { initSocket } from "./socket/socket.js";
dotenv.config();

connectDB();
const app = express();
const server = http.createServer(app);

// init socket
initSocket(server);


const allowed = [
  "http://localhost:5173",
  "https://tasveera-mithlesh.netlify.app"
];

app.use(cors({
  origin: allowed,
  credentials: true
}));


app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const port = process.env.PORT | 4000;

app.use("/api/v1/registration", registrationRoute);
app.use("/api/v1/post", PostRoute);
app.use("/api/v1/profile", ProfileRoute);
app.use("/api/v1/action", ActionRoute);
app.use("/api/v1/feed", feedRoutes);
app.use("/api/v1/chat", chatRoutes);

server.listen(5000, () => {
  console.log("Server running on port 5000");
});
// export default server;
