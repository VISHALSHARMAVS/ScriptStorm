import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import { PiMoonFill } from "react-icons/pi";
import { FiMenu, FiX } from "react-icons/fi";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation(); // Get the current path

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Function to determine if a link is active
  const isActive = (path) => location.pathname === path;

  return (
    <nav className="border-b-2 flex justify-between items-center m-4 relative">
      <Link
        to="/"
        className={`self-center whitespace-nowrap text-sm sm:text-lg font-semibold dark:text-white ${
          isActive("/") ? "text-blue-500" : ""
        }`}
      >
        <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
          ScriptStorm
        </span>
      </Link>

      <div className="relative hidden lg:block">
        <input
          type="text"
          placeholder="Search..."
          className="pl-10 pr-4 py-2 border rounded-lg"
        />
        <AiOutlineSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-900 text-xl" />
      </div>

      <button className="w-12 h-10 lg:hidden">
        <AiOutlineSearch className="text-2xl" />
      </button>

      <div className="flex gap-8 md:order-2">
        <button className="hidden sm:inline ">
          <PiMoonFill className="text-2xl" />
        </button>

        <Link to="/sign-in">
          <button className="bg-gradient-to-r from-indigo-900 to-red-900 text-white px-4 py-2 rounded-lg w-fit">
            Sign In
          </button>
        </Link>

        <button onClick={toggleMenu} className="lg:hidden">
          {isMenuOpen ? (
            <FiX className="text-2xl" />
          ) : (
            <FiMenu className="text-2xl" />
          )}
        </button>
      </div>

      <div className="hidden lg:flex lg:items-center lg:gap-4">
        <Link
          to="/"
          className={`text-sm sm:text-lg dark:text-white ${
            isActive("/") ? "text-blue-500" : ""
          }`}
        >
          Home
        </Link>
        <Link
          to="/about"
          className={`text-sm sm:text-lg dark:text-white ${
            isActive("/about") ? "text-blue-500" : ""
          }`}
        >
          About
        </Link>
        <Link
          to="/projects"
          className={`text-sm sm:text-lg dark:text-white ${
            isActive("/projects") ? "text-blue-500" : ""
          }`}
        >
          Projects
        </Link>
      </div>

      {isMenuOpen && (
        <div className="absolute top-16 left-0 w-full bg-white dark:bg-gray-800 lg:hidden flex flex-col items-start p-4 shadow-lg">
          <Link
            to="/"
            className={`text-sm sm:text-lg dark:text-white my-2 ${
              isActive("/") ? "text-blue-500" : ""
            }`}
            onClick={toggleMenu}
          >
            Home
          </Link>
          <Link
            to="/about"
            className={`text-sm sm:text-lg dark:text-white my-2 ${
              isActive("/about") ? "text-blue-500" : ""
            }`}
            onClick={toggleMenu}
          >
            About
          </Link>
          <Link
            to="/projects"
            className={`text-sm sm:text-lg dark:text-white my-2 ${
              isActive("/projects") ? "text-blue-500" : ""
            }`}
            onClick={toggleMenu}
          >
            Projects
          </Link>
        </div>
      )}
    </nav>
  );
}

export default Header;
