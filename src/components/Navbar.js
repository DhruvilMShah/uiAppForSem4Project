import React from "react";
import { Link } from "react-router-dom";
import UserSearch from "./UserSearch";
import "../css/Navbar.css";
import { USER_EMAIL } from "../config.js";

const Navbar = () => {
  const getDisplayName = (email) => {
    const namePart = email.split("@")[0]; // "john.doe"
    const name = namePart.split(".")[0];  // "john"
    return name.charAt(0).toUpperCase() + name.slice(1); // "John"
  };
  
  const displayName = getDisplayName(USER_EMAIL);
  
  return (
    <nav className="navbar">
      <div className="nav-left">
        <Link to={`/achievements/${USER_EMAIL}`} className="nav-title">
          {displayName}'s Achievements
        </Link>
      </div>

      <div className="nav-middle">
        <UserSearch />
      </div>

      <div className="nav-right">
        <Link to="/add-achievement" className="nav-option">Add Achievement</Link>
        <Link to="/reviews" className="nav-option">User Reviews</Link>
        <Link to="/add-review" className="nav-option">Tell us how you find the platform!</Link>
        <Link to="/create-report" className="nav-option">Create Report</Link>
        <Link to="/reports" className="nav-option">Your Reports</Link>
      </div>
    </nav>
  );
};

export default Navbar;
