// AchievementsPage.js
import React, { useEffect, useState } from 'react';
import { getAchievements, addAchievement } from '../services/apiService';
import AchievementList from './AchievementList';
//import './AchievementsPage.css';

const AchievementsPage = () => {
  const [achievements, setAchievements] = useState([]);

  useEffect(() => {
    // Fetch achievements on page load
    const fetchData = async () => {
      try {
        const data = await getAchievements();
        setAchievements(data);
      } catch (error) {
        console.error('Failed to fetch achievements:', error);
      }
    };

    fetchData();
  }, []);

  const handleAddAchievement = async () => {
    const newAchievement = {
      title: 'New Achievement',
      description: 'This is a new achievement',
      created: new Date().toISOString(),
    };

    try {
      const addedAchievement = await addAchievement(newAchievement);
      setAchievements((prev) => [...prev, addedAchievement]);
    } catch (error) {
      console.error('Failed to add achievement:', error);
    }
  };

  return (
    <div className="achievements-page">
      <AchievementList achievements={achievements} />
    </div>
  );
};

export default AchievementsPage;
