import React from "react";
import { NavLink, useLocation } from "react-router-dom";

const NavBar = () => {
  const location = useLocation();
  const { pathname } = location;

  if (pathname.includes("/boards")) {
    return null;
  }

  return (
    <nav>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/boards">Board</NavLink>
      <NavLink to="/updates">Updates</NavLink>
      <NavLink to="/roadmap">Roadmap</NavLink>
      <NavLink to="/contact">Contact</NavLink>
    </nav>
  );
};

export default NavBar;
