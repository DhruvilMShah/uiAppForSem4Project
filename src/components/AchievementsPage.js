// AchievementsPage.js
import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { getAchievements } from '../services/apiService';
import AchievementList from './AchievementList';
//import './AchievementsPage.css';

const AchievementsPage = () => {
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
      <AchievementList achievements={achievements} />
    </div>
  );
};

export default AchievementsPage;
