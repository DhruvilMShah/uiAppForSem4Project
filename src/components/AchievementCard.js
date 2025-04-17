// AchievementCard.js
import React from 'react';
import '../css/AchievementCard.css';

const formatDate = (dateString) => {
  if (!dateString) return "N/A";
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", { day: "numeric", month: "short", year: "numeric" });
};

const AchievementCard = ({ achievement, onEdit, onDelete, isOwner }) => {
  return (
    <div className="achievement-card">
      <h3 className="text-lg font-bold text-gray-800">{achievement.description}</h3>
      
      <p className="text-sm text-gray-600">
        <strong>Duration:</strong> {formatDate(achievement.fromDate)} to {formatDate(achievement.toDate)}
      </p>

      <p className="mt-2 text-gray-700"><strong>Category:</strong> {achievement.category}</p>

      {achievement.evidences && achievement.evidences.length > 0 && (
        <div className="mt-3">
          <h4 className="text-sm font-semibold text-gray-700">Evidences:</h4>
          <ul className="list-disc list-inside text-sm text-gray-600">
            {achievement.evidences.map((evidence, index) => (
              <li key={index}>{evidence}</li>
            ))}
          </ul>
        </div>
      )}
      {isOwner && (
        <>
      <button onClick={() => {console.log("Edit clicked:", achievement); onEdit(achievement)}} className="btn-edit">Edit</button>
      <button onClick={() => onDelete(achievement.achievementId)} className="btn-delete">Delete</button>
      </>
      )}
    </div>
  );
};

export default AchievementCard;
