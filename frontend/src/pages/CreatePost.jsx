import React, { useEffect, useState } from "react";
import {  Image, Video, Send, Loader } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

export default function CreatePost() {
  const location = useLocation();
  const navigate = useNavigate();
  const [postData, setPostData] = useState({
    fileLink: null,
    caption: "",
    fileType: "image",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const [previews, setPreviews] = useState({
    fileLink: null,
  });

  const handleFileChange = (e, fieldName) => {
    const file = e.target.files[0];
    if (file) {
      setPostData((prev) => ({ ...prev, [fieldName]: file }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviews((prev) => ({ ...prev, [fieldName]: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPostData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);

  try {
    if (!postData.fileLink || postData.caption.trim() === "") {
      setMessage("Please fill all fields");
      setLoading(false);
      return;
    }

    // REAL FormData
    const payload = new FormData();
    payload.append("media", postData.fileLink);
    payload.append("type", postData.fileType);
    payload.append("caption", postData.caption);
    payload.append("purpose", "Post");

    const response = await axios.post(
      "/api/v1/post/upload",
      payload,
      {
        withCredentials: true, // cookie ke liye (JWT)
      }
    );

    if (response.data.success) {
      setMessage(response.data.message);
      navigate("/profile/me");
    } else {
      setMessage(response.data.message);
    }

    setLoading(false);
  } catch (error) {
    if (error.response) {
      setMessage(error.response.data.message);
    } else {
      setMessage("Something went wrong, please try again");
    }
    setLoading(false);
  }
};


  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (loading) {
        e.preventDefault();
        e.returnValue = ""; // Chrome ke liye required
      }
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [loading]);

  useEffect(() => {
    if (loading) {
      const handlePopState = () => {
        window.history.pushState(null, "", location.pathname);
      };
      window.history.pushState(null, "", location.pathname);
      window.addEventListener("popstate", handlePopState);

      return () => window.removeEventListener("popstate", handlePopState);
    }
  }, [loading, location]);
  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100">
      <div className="max-w-2xl mx-auto px-6 py-8">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="px-8 py-6 border-b border-slate-100">
            <h2 className="text-xl font-semibold text-slate-900">
              Create New Post
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Share your moment with the community
            </p>
          </div>

          <div className="p-8 space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-3">
                Content Type
              </label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="fileType"
                    value="image"
                    checked={postData.fileType === "image"}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-blue-600"
                  />
                  <Image className="w-5 h-5 text-slate-600" />
                  <span className="text-sm text-slate-700">Image</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="fileType"
                    value="video"
                    checked={postData.fileType === "video"}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-blue-600"
                  />
                  <Video className="w-5 h-5 text-slate-600" />
                  <span className="text-sm text-slate-700">Video</span>
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-3">
                Upload {postData.fileType === "image" ? "Image" : "Video"}
              </label>
              <div className="border-2 border-dashed border-slate-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors">
                {previews.fileLink ? (
                  <div className="space-y-3">
                    {postData.fileType === "image" ? (
                      <img
                        src={previews.fileLink}
                        alt="Preview"
                        className="max-h-64 mx-auto rounded-lg"
                      />
                    ) : (
                      <video
                        src={previews.fileLink}
                        className="max-h-64 mx-auto rounded-lg"
                        controls
                      />
                    )}
                    <label className="inline-block cursor-pointer px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors text-sm font-medium">
                      Change File
                      <input
                        type="file"
                        accept={
                          postData.fileType === "image" ? "image/*" : "video/*"
                        }
                        onChange={(e) => handleFileChange(e, "fileLink")}
                        className="hidden"
                      />
                    </label>
                  </div>
                ) : (
                  <label className="cursor-pointer block">
                    <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-slate-100 flex items-center justify-center">
                      {postData.fileType === "image" ? (
                        <Image className="w-8 h-8 text-slate-400" />
                      ) : (
                        <Video className="w-8 h-8 text-slate-400" />
                      )}
                    </div>
                    <p className="text-slate-600 mb-1">
                      Click to upload {postData.fileType}
                    </p>
                    <p className="text-xs text-slate-400">
                      {postData.fileType === "image"
                        ? "PNG, JPG up to 1MB"
                        : "MP4, MOV up to 2MB"}
                    </p>
                    <input
                      type="file"
                      accept={
                        postData.fileType === "image" ? "image/*" : "video/*"
                      }
                      onChange={(e) => handleFileChange(e, "fileLink")}
                      className="hidden"
                    />
                  </label>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Caption
              </label>
              <textarea
                name="caption"
                value={postData.caption}
                onChange={handleInputChange}
                placeholder="Caption this memory..."
                rows="4"
                className="w-full px-4 py-3 border border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none placeholder-gray-500"
              />
            </div>
                <p
              className="text-red-500 text-center font-bold"
            >
              {message} 
            </p>
            {loading ? (
              <button
                className="w-full bg-blue-300 hover:bg-blue-400 text-white font-medium py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2 cursor-no-drop"
                disabled
              >
                <Loader className="w-5 h-5" />
                <span>Loading...</span>
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <Send className="w-5 h-5" />
                <span>Post Now</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
