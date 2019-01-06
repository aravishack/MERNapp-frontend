import React from "react";
import { Link, NavLink } from "react-router-dom";

const NavBar = ({ user }) => {
  return (
    <nav className="navbar">
      <div className="nav-brand-wrap">
        <Link className="navbar-brand" to="/">
          React ToDo
        </Link>
      </div>
      <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
        {!user && (
          <div className="navbar-nav">
            <NavLink className="nav-item nav-link" to="/create">
              Create Acocunt
            </NavLink>
            <span className="space-bar">|</span>
            <NavLink className="nav-item nav-link" to="/login">
              Login
            </NavLink>
          </div>
        )}
        {user && (
          <div className="navbar-nav">
            <NavLink className="nav-item nav-link" to="/home">
              {user.username}
            </NavLink>
            <span className="space-bar">|</span>
            <NavLink className="nav-item nav-link" to="/logout">
              Logout
            </NavLink>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
