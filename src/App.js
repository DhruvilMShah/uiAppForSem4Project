import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import AchievementPage from "./components/AchievementsPage";
import AddAchievement from "./components/AddAchievement";
import ReviewPage from "./components/ReviewPage";
import AddReview from "./components/AddReview";
import Navbar from "./components/Navbar";
import Reports from "./components/Reports";
import CreateReport from "./components/CreateReport";
import Login from "./components/Login";
import Register from "./components/Register";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" replace />;
};

function App() {
  return (
    <Router>
      <Navbar />
      <ToastContainer position="top-center" />
      <div className="p-4">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Private Routes */}
          <Route path="/achievements/:email" element={
            <PrivateRoute><AchievementPage /></PrivateRoute>
          } />
          <Route path="/add-achievement" element={
            <PrivateRoute><AddAchievement /></PrivateRoute>
          } />
          <Route path="/reviews" element={
            <PrivateRoute><ReviewPage /></PrivateRoute>
          } />
          <Route path="/add-review" element={
            <PrivateRoute><AddReview /></PrivateRoute>
          } />
          <Route path="/reports" element={
            <PrivateRoute><Reports /></PrivateRoute>
          } />
          <Route path="/create-report" element={
            <PrivateRoute><CreateReport /></PrivateRoute>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
