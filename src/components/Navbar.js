import React from "react";
import { Link } from "react-router-dom";
import "../css/Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="nav-left">
        <Link to="/achievements" className="nav-title">
          My Achievements
        </Link>
      </div>
      <div className="nav-right">
        <Link to="/add-achievement" className="nav-option">Add Achievement</Link>
        <Link to="/reviews" className="nav-option">User Reviews</Link>
        <Link to="/add-review" className="nav-option">Tell us how you find the platform!</Link>
      </div>
    </nav>
  );
};

export default Navbar;
