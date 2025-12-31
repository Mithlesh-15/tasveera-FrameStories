import React, { useEffect, useState } from "react";
import { User, Image, Save, Loader, Mail, AtSign } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

export default function UpdateProfile() {
  const location = useLocation();
  const navigate = useNavigate();
  const [postData, setPostData] = useState({
    profilePhoto: null,
    username: "",
    bio: "",
  });

  const [previews, setPreviews] = useState({
    profilePhoto: null,
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

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPostData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (
        !postData.profilePhoto ||
        !postData.username ||
        postData.bio.trim() === ""
      ) {
        setMessage("Please fill all fields");
        setLoading(false);
        return;
      }

      // REAL FormData
      const payload = new FormData();
      payload.append("media", postData.profilePhoto);
      payload.append("username", postData.username);
      payload.append("bio", postData.bio);

      const response = await axios.post(
        "/api/v1/profile/update-profile?purpose=profile-photo",
        payload,
        {
          withCredentials: true,
        }
      );

      if (response.data.success) {
        setMessage(response.data.message);
        navigate(`/profile/${response.data.data.owner}`);
      } else {
        setMessage(response.data.message);
      }

      setLoading(false);
    } catch (error) {
      console.error(error);
      setMessage(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (loading) {
        e.preventDefault();
        e.returnValue = "";
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
              Update Profile
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Customize your profile information
            </p>
          </div>

          <div className="p-8 space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-3">
                Profile Photo
              </label>
              <div className="flex items-center gap-6">
                <div className="relative">
                  {previews.profilePhoto ? (
                    <img
                      src={previews.profilePhoto}
                      alt="Profile"
                      className="w-24 h-24 rounded-full object-cover border-2 border-slate-200"
                    />
                  ) : (
                    <div className="w-24 h-24 rounded-full bg-slate-100 flex items-center justify-center border-2 border-slate-200">
                      <User className="w-12 h-12 text-slate-400" />
                    </div>
                  )}
                </div>
                <label className="cursor-pointer px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors text-sm font-medium inline-flex items-center gap-2">
                  <Image className="w-4 h-4" />
                  {previews.profilePhoto ? "Change Photo" : "Upload Photo"}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileChange(e, "profilePhoto")}
                    className="hidden"
                  />
                </label>
              </div>
              <p className="text-xs text-slate-400 mt-2">PNG, JPG up to 1MB</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Username <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <AtSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-800" />
                <input
                  type="text"
                  name="username"
                  value={postData.username}
                  onChange={handleInputChange}
                  placeholder="Enter your username"
                  className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-800"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Bio
              </label>
              <textarea
                name="bio"
                value={postData.bio}
                onChange={handleInputChange}
                placeholder="Tell us about yourself..."
                rows="4"
                className="w-full px-4 py-3 border border-slate-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none placeholder-gray-800"
              />
              <p className="text-xs text-slate-800 mt-1">
                Maximum 50 characters
              </p>
            </div>
            <p className="text-red-500 text-center font-bold">{message}</p>
            {loading ? (
              <button
                className="w-full bg-blue-300 hover:bg-blue-400 text-white font-medium py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2 cursor-no-drop"
                disabled
              >
                <Loader className="w-5 h-5 animate-spin" />
                <span>Updating...</span>
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <Save className="w-5 h-5" />
                <span>Save Changes</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
