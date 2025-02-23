// ReviewPage.js
import React, { useEffect, useState } from 'react';
import { getReviews } from '../services/apiService';
import ReviewList from './ReviewList';
//import './ReviewPage.css';

const ReviewPage = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    // Fetch reviews on page load
    const fetchData = async () => {
      try {
        const data = await getReviews();
        setReviews(data);
      } catch (error) {
        console.error('Failed to fetch reviews:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="review-page">
      <ReviewList reviews={reviews} />
    </div>
  );
};

export default ReviewPage;
