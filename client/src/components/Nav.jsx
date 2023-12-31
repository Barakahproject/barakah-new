/////////////NavBar////////////

import React, { useState } from "react";
import Logo from "../assets/logo.png";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/Authcontext";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const navigate = useNavigate();
  // Assuming isAuthenticated is a boolean state that tracks user authentication status
  const { isAuthenticated, logout } = useAuth();
  const location = useLocation();

  // Function to handle user logout (clear authentication status)
  const handleLogout = () => {
    logout();
    if (location.pathname === "/") {
      window.location.reload();
    } else {
      navigate("/");
    }
    // Your logout logic here
  };

  return (
    <header className="header sticky top-0 z-20 bg-white shadow-md flex items-center justify-between px-8 py-2">
      {/* Navigation */}
      <img src={Logo} alt="Logo" className="w-40" />

      {/* Burger Menu Icon */}
      <button
        className="lg:hidden md:hidden cursor-pointer"
        onClick={toggleMenu}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="w-6 h-6 text-blue"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4 6h16M4 12h16m-7 6h7"
          />
        </svg>
      </button>
      <nav className="nav text-md font-semibold lg:block md:block justify-end items-center sm:hidden hidden md:scale-75 whitespace-nowrap">
        <ul className="flex items-center justify-center text-center text-xl">
          {/* Navigation Links */}
          <li className="text-blue p-4 border-b-4 border-blue border-opacity-0 hover:border-opacity-100 hover:text-blue duration-200 cursor-pointer active">
            <Link to="/">Home</Link>
          </li>
          <li className="text-blue p-4 border-b-4 border-blue border-opacity-0 hover:border-opacity-100 hover:text-blue duration-200 cursor-pointer active">
            <Link to="/donations">Marketplace</Link>
          </li>
          <li className="text-blue p-4 border-b-4 border-blue border-opacity-0 hover:border-opacity-100 hover:text-blue duration-200 cursor-pointer">
            <Link to="/aboutus">About Barakah</Link>
          </li>
          <li className="text-blue p-4 border-b-4 border-blue border-opacity-0 hover:border-opacity-100 hover:text-blue duration-200 cursor-pointer">
            <Link to="/contactus">Get in touch</Link>
          </li>
        </ul>
      </nav>

      {/* Buttons/Profile Icon */}
      <div className="lg:flex md:flex justify-end items-center sm:hidden hidden ">
        {isAuthenticated() ? (
          // Render profile icon and logout button when authenticated
          <>
            <Link to="/profile" title="Profile">
              <div className="text-white p-2 md:scale-75 whitespace-nowrap cursor-pointer ">
                <Link to="/profile">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.8"
                    stroke="currentColor"
                    class="w-8 h-8 text-blue "
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                    />
                  </svg>
                </Link>
              </div>
            </Link>
            <button
              onClick={handleLogout}
              className="ml-4 bg-trasparent text-blue py-2 px-4  text-md font-semibold"
            >
              Logout
            </button>
          </>
        ) : (
          // Render Sign Up/In button when not authenticated */}
          <div className="flex gap-3 md:scale-75 whitespace-nowrap ">
            <Link to="/signin" title="Sign Up">
              <button className="border border-blue text-blue py-2 px-4 shadow text-md font-semibold">
                Sign In
              </button>
            </Link>{" "}
            <Link to="/signup" title="Sign Up">
              <button className="bg-blue text-white py-2 px-4 shadow text-md font-semibold">
                Sign Up
              </button>
            </Link>
          </div>
        )}
        {/* Responsive Navigation Links */}
      </div>
      {isMenuOpen && (
        <>
          <nav className="lg:hidden h-fit py-12 fixed flex flex-col justify-center inset-0 bg-white z-10">
            <button
              className="self-end lg:hidden md:hidden cursor-pointer"
              onClick={toggleMenu}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-6 h-6 text-blue"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            </button>
            <ul className="flex flex-col items-center justify-center text-center ">
              <li className="text-blue  p-4 border-b-4 border-blue border-opacity-0 hover:border-opacity-100 hover:text-blue duration-200 cursor-pointer active">
                <Link to="/">Home</Link>
              </li>
              <li className="text-blue p-4 border-b-4 border-blue border-opacity-0 hover:border-opacity-100 hover:text-blue duration-200 cursor-pointer active">
                <Link to="/donations">Marketplace</Link>
              </li>
              <li className="text-blue p-4 border-b-4 border-blue border-opacity-0 hover:border-opacity-100 hover:text-blue duration-200 cursor-pointer">
                <Link to="/aboutus">About Barakah</Link>
              </li>
              <li className="text-blue p-4 border-b-4 border-blue border-opacity-0 hover:border-opacity-100 hover:text-blue duration-200 cursor-pointer">
                <Link to="/contactus">Get in touch</Link>
              </li>
            </ul>
            {isAuthenticated() ? (
              // Render profile icon and logout button when authenticated
              <>
                <div className="flex flex-col pt-12 self-center gap-3 whitespace-nowrap ">
                  <Link to="/profile" title="Profile">
                    <div className="  text-white p-2  cursor-pointer ">
                      <Link to="/profile">
                        {/* <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.8"
                          stroke="currentColor"
                          class="w-6 h-6 text-blue"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                          />
                        </svg> */}
                        Profile
                      </Link>
                    </div>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="ml-4 bg-trasparent text-blue py-2 px-4  text-md font-semibold"
                  >
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <>
                {/* // Render Sign Up/In button when not authenticated */}
                <div className="flex flex-col pt-12 self-center gap-3 whitespace-nowrap ">
                  <Link to="/signin" title="Sign Up">
                    <button className="border border-blue text-blue py-2 px-4 shadow text-md font-semibold">
                      Sign In
                    </button>
                  </Link>{" "}
                  <Link to="/signup" title="Sign Up">
                    <button className="bg-blue text-white py-2 px-4 shadow text-md font-semibold">
                      Sign Up
                    </button>
                  </Link>
                </div>
              </>
            )}
            {/* Responsive Navigation Links */}
          </nav>
        </>
      )}
    </header>
  );
};

export default Navbar;
