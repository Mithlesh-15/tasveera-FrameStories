import React from "react";
function UserProfileCard({ username, imageUrl }) {
  return (
    <div className="flex items-center p-3 bg-white hover:bg-gray-50 transition duration-150 ease-in-out border border-gray-200 shadow-2xl mb-4 rounded-full">
      <div className="w-12 h-12 rounded-full overflow-hidden shrink-0 mr-3">
        <img
          // src को खाली छोड़ दिया गया है (या defaultImageUrl का उपयोग किया जा सकता है)
          src={imageUrl}
          alt={`${username} profile`}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Text Container (Username and Sub-text) */}
      <div className="flex flex-col justify-center min-w-0">
        {/* Username */}
        <span className="font-semibold text-base text-black truncate">
          {username}
        </span>
      </div>
    </div>
  );
}

export default UserProfileCard;
