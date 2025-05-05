import { Link } from "react-router-dom";
import LinkIcon from "../../../assets/link.svg";

const Navbar = () => {
  return (
    <header className="w-full bg-white border-b border-gray-100 shadow-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Link to="/" className="flex items-center justify-center">
            <div className="size-6 rounded-md bg-gradient-to-br from-brand-purple to-brand-dark-purple flex items-center justify-center">
              <img src={LinkIcon} alt="link" className="h-6 w-6" />
            </div>
            <span className="ml-2 text-xl font-bold text-gray-900">
              Shortify
            </span>
          </Link>
        </div>
        <nav className="hidden md:flex space-x-6">
          <Link
            to="/"
            className="text-gray-600 hover:text-gray-900 font-medium transition-colors">
            Home
          </Link>
          <Link
            to="/dashboard"
            className="text-gray-600 hover:text-gray-900 font-medium transition-colors">
            Dashboard
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
