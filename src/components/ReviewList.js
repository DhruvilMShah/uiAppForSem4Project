// ReviewList.js
import React from 'react';
import ReviewCard from './ReviewCard';
//import './ReviewList.css';

const ReviewList = ({ reviews }) => {
  return (
    <div className="review-list">
      {reviews.map((review) => (
        <ReviewCard key={review.id} review={review} />
      ))}
    </div>
  );
};

export default ReviewList;
