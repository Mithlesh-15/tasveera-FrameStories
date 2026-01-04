import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import Login from "./pages/Login.jsx";
import SignUp from "./pages/SignUp.jsx";
import Home from "./pages/Home.jsx";
import CreatePost from "./pages/CreatePost.jsx";
import Search from "./pages/Search.jsx";
import Videos from "./pages/Videos.jsx";
import Profile from "./pages/Profile.jsx";
import Post from "./pages/Post.jsx";
import NotFound from "./pages/NotFount.jsx"
import UpdateProfile from "./pages/UpdateProfile.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<App />}>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/create" element={<CreatePost />} />
        <Route path="/videos" element={<Videos />} />
        <Route path="/profile/:profileid" element={<Profile />} />
        <Route path="/post/:postid" element={<Post />} />
        <Route path="/update-profile" element={<UpdateProfile />} />
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="*" element={<NotFound />} />
    </>
  )
);
createRoot(document.getElementById("root")).render(
    <RouterProvider router={router} />
);
