import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="text-center py-20">
      <h1 className="text-4xl font-bold mb-4 text-gray-800 dark:text-gray-100">404 - Page Not Found</h1>
      <p className="text-lg mb-8 text-gray-600 dark:text-gray-300">
        Sorry, the page you're looking for doesn't exist.
      </p>
      <Link
        to="/"
        className="py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-300"
      >
        Go Home
      </Link>
    </div>
  );
};

export default NotFound;
