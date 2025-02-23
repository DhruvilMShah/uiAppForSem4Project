// ReviewCard.js
import React from 'react';
import '../css/ReviewCard.css';

const ReviewCard = ({ review }) => {
  return (
    <div className="review-card">
      <h3>Rating: {review.rating}/5</h3>
      <p>{review.description}</p>
      { !review.anonymity && <p className="text-gray-700">By: {review.email}</p> }
    </div>
  );
};

export default ReviewCard;
