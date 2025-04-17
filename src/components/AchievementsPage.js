// AchievementsPage.js
import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { getAchievements } from '../services/apiService';
import AchievementList from './AchievementList';
import AddAchievement from './AddAchievement';
import { USER_EMAIL } from "../config.js";

//import './AchievementsPage.css';

const AchievementsPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [editAchievement, setEditAchievement] = useState(null);
  const { email } = useParams();
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch achievements on page load
    setLoading(true);
    const fetchData = async () => {
      try {
        const data = await getAchievements(email);
        setAchievements(data);
      } catch (error) {
        console.error('Failed to fetch achievements:', error);
      } finally {
        setLoading(false);
      }
    };
    if (email) {
      fetchData();
    }
    
  }, [email]);
  return (
    <div className="achievements-page">
      <AchievementList achievements={achievements} setAchievements={setAchievements} currentUserEmail={`${USER_EMAIL}`}
      onEdit={(achievement) => {
        console.log("Opening modal for edit:", achievement);
        setEditAchievement(achievement);
        setShowModal(true);
      }}/>
      {/* conditionally render the modal below */}
      {showModal && (
        <AddAchievement
          editData={editAchievement}
          onClose={() => {
            setShowModal(false);
            setEditAchievement(null);
          }}
          refreshAchievements={() => getAchievements(email).then(setAchievements)}
        />
      )}
    </div>
  );
};

export default AchievementsPage;
