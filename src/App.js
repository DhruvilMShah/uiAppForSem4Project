import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import AchievementPage from "./components/AchievementsPage";
import AddAchievement from "./components/AddAchievement";
import ReviewPage from "./components/ReviewPage";
import AddReview from "./components/AddReview";
import Navbar from "./components/Navbar";

function App() {
  return (
    <Router>
      <Navbar /> {/* Navbar is always visible */}
      <div className="p-4">
        <Routes>
          <Route path="/" element={<Navigate to="/achievements" replace />} />
          <Route path="/achievements" element={<AchievementPage />} />
          <Route path="/add-achievement" element={<AddAchievement />} />
          <Route path="/reviews" element={<ReviewPage />} />
          <Route path="/add-review" element={<AddReview />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
