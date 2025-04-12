
import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { FcMenu, FcHome, FcAbout } from "react-icons/fc";
import { BsSearch } from "react-icons/bs";
import { FiKey } from "react-icons/fi";

export default function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const toggleMenu = () => setMenuOpen((prev) => !prev);
  const closeMenu = () => setMenuOpen(false);

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        closeMenu();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="bg-gray-900 text-white">
      <div className="container mx-auto flex justify-between items-center p-4">
        {/* Logo */}
        <h1 className="text-2xl font-bold">Real Estate</h1>
        

        {/* Menu with Dropdown */}
        <div className="relative" ref={menuRef}>
          {/* Hamburger Menu */}
          <button
            onClick={toggleMenu}
            className="text-3xl focus:outline-none cursor-pointer"
          >
            <FcMenu />
          </button>

          {/* Always render the dropdown menu and toggle scale classes */}
          <nav
            className={`absolute right-0 top-full mt-2 z-50 bg-gray-800 shadow-lg rounded-lg w-48 p-3 origin-top transition-transform duration-200 ${
              menuOpen ? "scale-y-100" : "scale-y-0 pointer-events-none"
            }`}
          >
            <ul className="flex flex-col space-y-2">
              <li>
                <Link
                  onClick={closeMenu}
                  to="/"
                  className="flex items-center space-x-2 p-2 hover:bg-gray-700 rounded"
                >
                  <FcHome />
                  <span>Home</span>
                </Link>
              </li>
              <li>
                <Link
                  onClick={closeMenu}
                  to="/search"
                  className="flex items-center space-x-2 p-2 hover:bg-gray-700 rounded"
                >
                  <BsSearch />
                  <span>Search</span>
                </Link>
              </li>
              <li>
                <Link
                  onClick={closeMenu}
                  to="/search?purpose=for-sale"
                  className="flex items-center space-x-2 p-2 hover:bg-gray-700 rounded"
                >
                  <FcAbout />
                  <span>Buy Property</span>
                </Link>
              </li>
              <li>
                <Link
                  onClick={closeMenu}
                  to="/search?purpose=for-rent"
                  className="flex items-center space-x-2 p-2 hover:bg-gray-700 rounded"
                >
                  <FiKey />
                  <span>Rent Property</span>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
}


