import React, { useState } from "react";
import { FaFacebookF } from "react-icons/fa6";
import { SiGmail } from "react-icons/si";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { signInWithPopup, signInWithRedirect } from "firebase/auth";
import {
  auth,
  facebookProvider,
  googleProvider,
} from "../utils/firebaseConfig";
function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleAuthLogiin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post("/api/v1/registration/login", {
        email:auth.currentUser.email,
        fullName: auth.currentUser.displayName,
        username : auth.currentUser.email,
        profilePhoto: auth.currentUser.photoURL
      });

      setSuccess(response.data.success);

      if (response.data.success) {
        setMessage(response.data.message);
        setLoading(false);
        navigate("/");
      }
      setMessage(response.data.message);
      setLoading(false);
      return;
    } catch (error) {
      if (error.response) {
        setMessage(error.response.data.message);
      } else {
        setMessage("Something wen wrong, Please try again");
      }
      setLoading(false);
      console.error(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post("/api/v1/registration/login", {
        email,
        password,
      });

      setSuccess(response.data.success);

      if (response.data.success) {
        setMessage(response.data.message);
        setLoading(false);
        navigate("/");
      }
      setMessage(response.data.message);
      setLoading(false);
      return;
    } catch (error) {
      if (error.response) {
        setMessage(error.response.data.message);
      } else {
        setMessage("Something wen wrong, Please try again");
      }
      setLoading(false);
      console.error(error);
    }
  };
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center p-4">
      <div className="w-full max-w-sm flex flex-col items-center">
        {/* Login Box */}
        <div className="bg-white border border-gray-300 p-8 pt-10 pb-6 mb-3 rounded-lg w-full flex flex-col items-center shadow-sm">
          {/* Instagram Logo - Font-like appearance */}
          <h1
            className="text-5xl font-script text-gray-900 mb-8"
            style={{ fontFamily: "Pinyon Script, cursive", fontWeight: 600 }}
          >
            Tasveera
          </h1>

          {/* Form Inputs */}
          <form onSubmit={handleSubmit} className="w-full">
            <input
              type="email"
              placeholder="Email"
              className="w-full px-3 py-2 mb-2 text-sm border border-gray-300 rounded-md focus:ring-0 focus:border-gray-500 bg-gray-50 placeholder-gray-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full px-3 py-2 mb-4 text-sm border border-gray-300 rounded-md focus:ring-0 focus:border-gray-500 bg-gray-50 placeholder-gray-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <p
              className={`${
                success ? "text-green-500" : "text-red-500"
              } text-center font-bold`}
            >
              {message}
            </p>
            {/* Log In Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-1.5 rounded-lg text-sm font-semibold  hover:opacity-100 transition-opacity cursor-pointer"
            >
              {loading ? "Loading..." : "Log In"}
            </button>
          </form>

          {/* OR Separator */}
          <div className="flex items-center w-full my-4">
            <div className="grow border-t border-gray-300"></div>
            <span className="text-gray-500 text-xs font-semibold mx-4">OR</span>
            <div className="grow border-t border-gray-300"></div>
          </div>

          {/* Social Logins  */}

          {/* Facebook Login */}
          <button
            className="flex items-center justify-center gap-1 w-full text-blue-800 font-semibold text-sm mb-3
             hover:bg-blue-600 hover:text-white active:scale-95 
             transition-all duration-300 transform
             border-2 border-blue-600 rounded-lg py-2 px-4
             shadow-md hover:shadow-lg"
            onClick={async () => {
              await signInWithRedirect(auth, facebookProvider);
              handleAuthLogiin();
            }}
          >
            <FaFacebookF />
            Log in with Facebook
          </button>

          {/* Gmail/Google Login */}
          <button
            className="flex items-center gap-2 justify-center w-full text-red-600 font-semibold text-sm mb-4 
             hover:bg-red-600 hover:text-white active:scale-95 
             transition-all duration-300 transform
             border-2 border-red-600 rounded-lg py-2 px-4
             shadow-md hover:shadow-lg"
            onClick={async () => {
              await signInWithPopup(auth, googleProvider);
              handleAuthLogiin();
            }}
          >
            <SiGmail />
            Log in with Gmail
          </button>
        </div>

        {/* Sign Up Link */}
        <div className="bg-white border border-gray-300 p-5 rounded-lg w-full text-center text-sm shadow-sm">
          <p className="text-gray-900">
            Don't have an account?
            <Link
              to="/signup"
              className="text-blue-500 font-semibold ml-1 cursor-pointer"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
