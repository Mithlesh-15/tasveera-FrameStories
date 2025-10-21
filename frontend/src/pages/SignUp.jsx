import axios from "axios";
import { useState } from "react";
import { FaFacebookF } from "react-icons/fa6";
import { SiGmail } from "react-icons/si";
import { Link, useNavigate } from "react-router-dom";
function SignUp() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post("url", {
        email,
        password,
        username,
        name,
      });
      if (response.success) {
        setMessage(response.message);
        setLoading(false);
        navigate("/");
      }
      setMessage(response.message);
      setLoading(false);
      return;
    } catch (error) {
      setMessage("Something wen wrong, Please try again");
      setLoading(false);
      console.error(error);
    }
  };
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center p-4">
      <div className="w-full max-w-sm flex flex-col items-center">
        {/* 1. Main Card - Sign Up Box */}
        <div className="bg-white border border-gray-300 p-8 pt-10 pb-6 mb-3 rounded-lg w-full flex flex-col items-center shadow-sm">
          {/* Instagram Logo */}
          <h1
            className="text-5xl font-script text-gray-900 mb-4"
            style={{ fontFamily: "Pinyon Script, cursive", fontWeight: 600 }}
          >
            Tasveera
          </h1>

          {/* Call to Action Text */}
          <p className="text-gray-500 text-base font-semibold text-center mb-4 leading-tight">
            Sign up to see photos and videos from your friends.
          </p>

          {/* Facebook Login Button (Main CTA) */}
          <button
            className="flex items-center justify-center gap-1 w-full bg-blue-500 text-white py-2 rounded-lg text-sm font-semibold hover:bg-blue-600 transition-colors mb-2"
            onClick={(e) => {
              e.preventDefault();
              console.log("Facebook Sign Up clicked");
            }}
          >
            <FaFacebookF />
            Log in with Facebook
          </button>

          {/* Gmail/Google Login Button (User Request Addition) */}
          <button
            className="flex items-center justify-center gap-2 w-full bg-red-500 text-white py-2 rounded-lg text-sm font-semibold hover:bg-red-600 transition-colors mb-4"
            onClick={(e) => {
              e.preventDefault();
              console.log("Gmail/Google Sign Up clicked");
            }}
          >
            <SiGmail />
            Sign up with Gmail
          </button>

          {/* OR Separator */}
          <div className="flex items-center w-full my-3">
            <div className="grow border-t border-gray-300"></div>
            <span className="text-gray-500 text-xs font-semibold mx-4">OR</span>
            <div className="grow border-t border-gray-300"></div>
          </div>

          {/* Sign Up Form Inputs */}
          <form onSubmit={handleSubmit} className="w-full">
            <input
              type="email"
              placeholder="Email"
              className="w-full px-3 py-2 mb-2 text-xs border border-gray-300 rounded-sm focus:ring-0 focus:border-gray-500 bg-gray-50 placeholder-gray-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="text"
              placeholder="Full Name"
              className="w-full px-3 py-2 mb-2 text-xs border border-gray-300 rounded-sm focus:ring-0 focus:border-gray-500 bg-gray-50 placeholder-gray-500"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Username"
              className="w-full px-3 py-2 mb-2 text-xs border border-gray-300 rounded-sm focus:ring-0 focus:border-gray-500 bg-gray-50 placeholder-gray-500"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full px-3 py-2 mb-2 text-xs border border-gray-300 rounded-sm focus:ring-0 focus:border-gray-500 bg-gray-50 placeholder-gray-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <p className="text-center text-red-500 font-bold">{message}</p>

            {/* Sign Up Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-1.5 rounded-lg text-sm font-semibold  hover:opacity-100 transition-opacity cursor-pointer"
            >
              {loading ? "Loading..." : "Sign Up"}
            </button>
          </form>
        </div>

        {/* 2. Second Card - Log In Link */}
        <div className="bg-white border border-gray-300 p-5 rounded-lg w-full text-center text-sm shadow-sm">
          <p className="text-gray-900">
            Have an account?
            <Link
              to="/login"
              className="text-blue-500 font-semibold ml-1 cursor-pointer"
            >
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
