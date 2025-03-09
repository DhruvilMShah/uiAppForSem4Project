import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import AchievementPage from "./components/AchievementsPage";
import AddAchievement from "./components/AddAchievement";
import ReviewPage from "./components/ReviewPage";
import AddReview from "./components/AddReview";
import Navbar from "./components/Navbar";
import Reports from "./components/Reports";
import CreateReport from "./components/CreateReport";

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
          <Route path="/reports" element={<Reports />} />
          <Route path="/create-report" element={<CreateReport />} />


        </Routes>
      </div>
    </Router>
  );
}

export default App;
