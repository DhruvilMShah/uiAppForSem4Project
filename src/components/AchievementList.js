// AchievementList.js
import React from 'react';
import AchievementCard from './AchievementCard';
import { deleteAchievement } from '../services/apiService';
//import './AchievementList.css';


const AchievementList = ({achievements, setAchievements, onEdit, currentUserEmail}) => {

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this achievement?");
    if (!confirmDelete) return;
    try {
      await deleteAchievement(id);
      setAchievements(prev => prev.filter(a => a.achievementId !== id));
    } catch (error) {
      console.error("Error deleting achievement:", error);
    }
  };

  return (
    <div className="achievement-list">
      {achievements.map((achievement) => (
        <AchievementCard key={achievement.achievementId} achievement={achievement} 
        onEdit={onEdit} onDelete={handleDelete} isOwner={achievement.email === currentUserEmail}/>
      ))}
    </div>
  );
};

export default AchievementList;
