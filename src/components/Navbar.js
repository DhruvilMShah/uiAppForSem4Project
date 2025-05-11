import React from "react";
import { Link, useNavigate } from "react-router-dom";
import UserSearch from "./UserSearch";
import "../css/Navbar.css";
import { Trophy, FileText } from 'lucide-react';

const Navbar = () => {
  const navigate = useNavigate();
  const loggedInUser = localStorage.getItem("loggedInUser");

  const getDisplayName = (email) => {
    const namePart = email.split("@")[0]; // "john.doe"
    const name = namePart.split(".")[0];  // "john"
    return name.charAt(0).toUpperCase() + name.slice(1); // "John"
  };
  
  const displayName = loggedInUser ? getDisplayName(loggedInUser) : "";

    // Handle Logout
    const handleLogout = () => {
      localStorage.removeItem("token"); // Remove token from localStorage
      localStorage.removeItem("loggedInUser"); // Remove email from localStorage or wherever you're storing it
      navigate("/login"); // Redirect to login page
    };
  
  if (!loggedInUser) return null;

  return (
    <nav className="navbar">
      <div className="nav-left">
      <Link to={loggedInUser ? `/achievements/${loggedInUser}` : "/login"} className="nav-title">
        {displayName}'s Achievements
      </Link>

      </div>

      <div className="nav-middle">
        <UserSearch />
      </div>

      <div className="nav-right">
        <Link to="/add-achievement" className="nav-option"><Trophy className="w-2 h-2" /></Link>
        <Link to="/create-report" className="nav-option"><FileText className="w-2 h-2" /></Link>
        <Link to="/reviews" className="nav-option">Reviews</Link>
        <Link to="/add-review" className="nav-option">Feedback</Link>
        <Link to="/reports" className="nav-option">Reports</Link>
        <Link to="/login" className="nav-option" onClick={handleLogout}>
          Logout
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
