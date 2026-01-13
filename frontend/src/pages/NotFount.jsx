import React from "react";
import { Home, ArrowLeft, Search } from "lucide-react";
import { Link } from "react-router-dom";

export default function NotFound() {
  const handleGoBack = () => {
    window.history.back();
  };
 
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      {/* Main Container */}
      <div className="max-w-2xl w-full">
        {/* Content Card */}
        <div className="text-center space-y-8">
          {/* 404 Number */}
          <div className="relative">
            <h1 className="text-[150px] md:text-[200px] font-bold text-gray-200 leading-none select-none">
              404
            </h1>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-32 h-32 md:w-40 md:h-40 bg-blue-50 rounded-full flex items-center justify-center">
                <Search className="w-16 h-16 md:w-20 md:h-20 text-blue-500" />
              </div>
            </div>
          </div>

          {/* Text Content */}
          <div className="space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Page Not Found
            </h2>
            <p className="text-lg text-gray-600 max-w-md mx-auto">
              The page you're looking for doesn't exist or has been moved. Let's
              get you back on track.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link
              to="/"
              className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-8 rounded-lg transition-colors shadow-sm"
            >
              <Home className="w-5 h-5" />
              <span>Go to Homepage</span>
            </Link>

            <button
              onClick={handleGoBack}
              className="inline-flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-gray-700 font-medium py-3 px-8 rounded-lg border border-gray-300 transition-colors shadow-sm"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Go Back</span>
            </button>
          </div>

          {/* Help Text */}
          <div className="pt-8 border-t border-gray-200 max-w-md mx-auto">
            <p className="text-sm text-gray-500">
              Need help? Contact our{" "}
              <a
                href="#"
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                support team
              </a>{" "}
              or visit our{" "}
              <a
                href="#"
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                help center
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
