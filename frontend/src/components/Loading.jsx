import React from "react";

export default function Loading() {
  return (
    <div className="bg-gray-50 flex items-center justify-center pt-2">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-white rounded-full"></div>
        <div className="w-16 h-16 border-4 border-black rounded-full border-t-transparent absolute top-0 left-0 animate-spin"></div>
      </div>
    </div>
  );
}
