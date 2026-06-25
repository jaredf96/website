import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="text-center py-20 min-h-[60vh] flex flex-col items-center justify-center">
      <p className="text-6xl font-bold text-accent mb-4">404</p>
      <h1 className="text-3xl font-bold mb-4 text-text">Page Not Found</h1>
      <p className="text-lg mb-8 text-muted">
        Sorry, the page you're looking for doesn't exist.
      </p>
      <Link
        to="/"
        className="py-2 px-5 bg-accent text-white rounded-base hover:bg-accent-hover transition-colors duration-(--duration-medium)"
      >
        Go Home
      </Link>
    </div>
  );
};

export default NotFound;
