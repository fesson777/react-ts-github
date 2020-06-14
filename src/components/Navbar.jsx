import React from "react";
import { NavLink } from "react-router-dom";

export const Navbar = () => (
  <nav className="navbar">
    <div className="nav-search">Github Поиск</div>
    <NavLink to="/" className="nav-link">
      Главная
    </NavLink>
  </nav>
);
