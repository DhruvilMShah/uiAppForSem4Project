// AchievementList.js
import React from 'react';
import AchievementCard from './AchievementCard';
//import './AchievementList.css';

const AchievementList = ({ achievements }) => {
  return (
    <div className="achievement-list">
      {achievements.map((achievement) => (
        <AchievementCard key={achievement.id} achievement={achievement} />
      ))}
    </div>
  );
};

export default AchievementList;
