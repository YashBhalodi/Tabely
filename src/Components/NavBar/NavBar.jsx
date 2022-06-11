import React from "react";
import { NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <nav>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/board">Board</NavLink>
      <NavLink to="/updates">Updates</NavLink>
      <NavLink to="/roadmap">Roadmap</NavLink>
      <NavLink to="/contact">Contact</NavLink>
    </nav>
  );
};

export default NavBar;
