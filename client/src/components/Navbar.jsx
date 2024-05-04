import React, { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { Link ,useNavigate } from "react-router-dom";
import Button from "./Button";
import Logo from "./Logo";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/auth/authSlice";


function getInitials(fullName) {
  const names = fullName.split(" ");
  const initials = names.slice(0, 2).map((name) => name[0].toUpperCase());
  const initialsStr = initials.join("");
  return initialsStr;
}

const MobileMenu = ({ user, token,signOut }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="flex ">
      <button
        onClick={toggleMenu}
        className="lg:hidden p-2 text-black-700 hover:text-black-800"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>
      {isMenuOpen && (
        <div className="fixed top-0 left-0 w-full h-fit bg-white z-50 flex flex-col py-10 items-center justify-center shadow-xl gap-8">
          <Logo />
          <ul className="flex flex-col gap-4 text-base text-black">
            <li onClick={toggleMenu}>
              <Link to="/">Home</Link>
            </li>
            <li onClick={toggleMenu}>
              <Link to="/">Contact</Link>
            </li>
            <li onClick={toggleMenu}>
              <Link to="/">About</Link>
            </li>
          </ul>
          <div className="flex gap-2 items-center">
            {token ? (
              <div className="w-full flex  flex-col items-center justify-center ">
                <div className="flex gap-1 items-center mb-5">
                  {user?.image ? (
                    <img
                      src={user?.image}
                      alt="Profile"
                      className="w-8 h-8 rounded-full"
                    />
                  ) : (
                    <span className="text-white w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
                      {getInitials(user?.name)}
                    </span>
                  )}
                  <span className="font-medium text-white">
                    {user?.name}
                  </span>
                </div>

                <button
                  className="bg-black text-white px-8 py-1.5 rounded-full text-center outline-none"
                  onClick={() => signOut()}
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link to="/sign-in">
                <Button
                  label="Sign in"
                  styles="flex items-center justify-center bg-black text-white text-white px-4 py-1.5 rounded-full"
                />
              </Link>
            )}
          </div>

          <span
            className="cursor-pointer text-xl font-semibold"
            onClick={toggleMenu}
          >
            <AiOutlineClose />
          </span>
        </div>
      )}
    </div>
  );
};

const Navbar = () => {
  // const {  signOut } = {};
  const dispatch = useDispatch();
  const navigate = useNavigate();


   const { user, token } = useSelector((state) => state.user);
  const [showProfile, setShowProfile] = useState(false);

  const handleSignOut = () => {
     dispatch(logout());
     navigate("/");
  };

  return (
    <nav className="flex flex-col md:flex-row w-full py-5  items-center justify-between gap-4 md:gap-0 fixed z-10">
      <Link
        to="/"
        className={`flex item-center text-4xl font-extrabold pl-10 text-white `}
      >
        HNOSS
      </Link>

      {/* <Logo /> */}
      <div className="hidden md:flex gap-14 items-center">
        <ul className="flex gap-8 text-base font-medium text-white">
          <Link to="/home" className="hover:text-rose-800">
            Home
          </Link>
          <Link to="/" className="hover:text-rose-800">
            Contact
          </Link>
          {/* <Link to="/" className="hover:text-rose-800">
            About
          </Link> */}
        </ul>

        <div className="flex gap-2 items-center cursor-pointer mr-5">
          {token ? (
            <div
              className="relative"
              onClick={() => setShowProfile((prev) => !prev)}
            >
              <div className="flex gap-1 items-center cursor-pointer ">
                {user?.image ? (
                  <img
                    src={user?.image}
                    alt="Profile"
                    className="w-8 h-8 rounded-full"
                  />
                ) : (
                  <span className="text-white w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
                    {getInitials(user?.name)}
                  </span>
                )}
                <span className="font-medium text-white font-semibold ">
                  {/* {user?.name?.split(" ")[0]} */}
                  {user?.name}
                </span>
              </div>

              {showProfile && (
                <div className="absolute bg-white py-6 px-6 flex flex-col shadow-2xl z-50 right-0 gap-3 rounded">
                  <span className="">Profile</span>
                  <span
                    className="border-t border-slate-300 text-rose-700"
                    onClick={handleSignOut}
                  >
                    Logout
                  </span>
                </div>
              )}
            </div>
          ) : (
            <Link to="/sign-in" className="pr-10">
              <Button
                label="Sign in"
                styles="flex items-center justify-center bg-black text-white px-4 py-1.5 rounded-full hover:bg-rose-800"
              />
            </Link>
          )}
        </div>
      </div>
      <div className="block md:hidden">
        <MobileMenu user={user} token={token} signOut={handleSignOut} />
      </div>
    </nav>
  );
};

export default Navbar;
