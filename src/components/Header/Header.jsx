import React, { useState } from "react";
import LogoutBtn from "./LogoutBtn";
import { useSelector } from "react-redux";
import { FaMastodon } from "react-icons/fa";

import { Link } from "react-router-dom";

const Header = () => {
  const [open, setOpen] = useState(false);

  const authStatus = useSelector((state) => state.auth.status);

  const navItems = [
    {
      name: "Home",
      path: "/",
      active: true,
    },
    {
      name: "All Posts",
      path: "/all-posts",
      active: authStatus,
    },
    {
      name: "My Posts",
      path: "/my-posts",
      active: authStatus,
    },
    {
      name: "Add Post",
      path: "/add-post",
      active: authStatus,
    },
    {
      name: "Login",
      path: "/login",
      active: !authStatus,
    },
    {
      name: "Sign Up",
      path: "/signup",
      active: !authStatus,
    },
  ];

  const handleOpen = () => {
    // window.location.reload();
    setOpen(!open);
  };

  const NavbarComp = ({ className, isAnimation }) => {
    return navItems.map((item) =>
      item.active ? (
        <div
          key={item.path}
          className={`cursor-pointer mx-10 text-lg ${className}`}
        >
          <Link to={item.path} onClick={handleOpen}>
            {item.name}
          </Link>
        </div>
      ) : null
    );
  };

  return (
    <div
      className="navbar bg-base-100 border-b border-blue-400"
    >
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              onClick={handleOpen}
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          {open && (
            <ul
              className="menu menu-sm  border-gray-400 border dropdown-content  mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              <NavbarComp className={`my-4`} isAnimation={false} />
            </ul>
          )}
        </div>

        <a
          href="/"
          className="btn btn-ghost normal-case text-xl"
        >
          <FaMastodon />
          Mind Mirror
        </a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <NavbarComp isAnimation={true} />
        </ul>
      </div>
      <div
        className="navbar-end"
      >
        {authStatus && <LogoutBtn />}
      </div>
    </div>
  );
};

export default Header;
