import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-gray-900 p-4 fixed top-0 left-0 w-full z-50 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        {/* Jared's Codes - Ensure Tailwind Applies the Color */}
        <h1 className="text-xl font-bold text-gray-300">
          Jared's Codes
        </h1>

        {/* Navbar Links - Light Gray */}
        <div className="space-x-6">
          <Link to="/projects" className="text-gray-300 hover:text-white transition-colors duration-200">
            Projects
          </Link>
          <Link to="/about" className="text-gray-300 hover:text-white transition-colors duration-200">
            About
          </Link>
          <Link to="/contact" className="text-gray-300 hover:text-white transition-colors duration-200">
            Contact
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;




