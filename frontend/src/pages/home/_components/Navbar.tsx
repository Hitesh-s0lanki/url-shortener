import React from "react";
import { Link } from "react-router-dom";
import LinkIcon from "../../../assets/link.svg";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { openDialog } from "@/store/slices/uiSlice";
import { clearToken } from "@/store/slices/authSlice";
import { RootState } from "@/store";

const Navbar: React.FC = () => {
  const dispatch = useDispatch();
  const token = useSelector((state: RootState) => state.auth.token);

  const handleLogout = () => {
    dispatch(clearToken());
  };

  return (
    <header className="w-full bg-white border-b border-gray-100 shadow-sm">
      <div className="container px-20 py-4 flex justify-between items-center">
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

        <nav className="flex space-x-6 justify-center items-center">
          <Link
            to="/"
            className="text-gray-600 hover:text-gray-900 font-medium transition-colors">
            Home
          </Link>
          {token && (
            <Link
              to="/dashboard"
              className="text-gray-600 hover:text-gray-900 font-medium transition-colors">
              Dashboard
            </Link>
          )}

          {!token ? (
            <Button
              variant="outline"
              onClick={() => dispatch(openDialog("login"))}>
              Get Started
            </Button>
          ) : (
            <Button variant="outline" onClick={handleLogout}>
              Logout
            </Button>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
