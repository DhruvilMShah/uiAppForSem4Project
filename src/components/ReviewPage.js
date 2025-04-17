// ReviewPage.js
import React, { useEffect, useState, useRef } from 'react';
import { getReviews, getReviewsByRating } from '../services/apiService';
import ReviewList from './ReviewList';
import { FaFilter } from 'react-icons/fa';
import '../css/ReviewPage.css';

const ReviewPage = () => {
  const [reviews, setReviews] = useState([]);
  const [selectedRatings, setSelectedRatings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false); // Filter panel visibility
  const filterRef = useRef(null); // Ref for filter panel

  // Close filter panel on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (filterRef.current && !filterRef.current.contains(event.target)) {
        setIsFilterOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Fetch reviews
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        let data = [];
        if (selectedRatings.length === 0 || selectedRatings.includes('all')) {
          console.log('Fetching all reviews');
          data = await getReviews();
          console.log('All reviews:', data);
        } else {
          console.log('Fetching reviews for ratings:', selectedRatings);
          const promises = selectedRatings.map((rating) =>
            getReviewsByRating(rating)
          );
          const results = await Promise.all(promises);
          data = results
            .flat()
            .filter((review) => review && typeof review === 'object');
          const uniqueReviews = Array.from(
            new Map(data.map((review) => [review.reviewId, review])).values()
          );
          console.log('Fetched reviews:', results);
          console.log('Unique reviews:', uniqueReviews);
          data = uniqueReviews;
        }
        setReviews(data);
      } catch (error) {
        console.error('Failed to fetch reviews:', error);
        setError('Failed to load reviews. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedRatings]);

  // Handle checkbox changes
  const handleRatingChange = (rating) => {
    let updatedRatings;
    if (rating === 'all') {
      if (selectedRatings.includes('all')) {
        updatedRatings = [];
      } else {
        updatedRatings = ['all'];
      }
    } else {
      if (selectedRatings.includes(rating)) {
        updatedRatings = selectedRatings.filter((r) => r !== rating);
      } else {
        updatedRatings = [
          ...selectedRatings.filter((r) => r !== 'all'),
          rating,
        ];
      }
    }
    console.log('Updated selected ratings:', updatedRatings);
    setSelectedRatings(updatedRatings);
  };

  // Toggle filter panel
  const toggleFilter = () => {
    setIsFilterOpen((prev) => !prev);
  };

  return (
    <div className="review-page">
      {/* Filter and Review Count Section */}
      <div className="filter-and-count">
        <div className="filter-container">
          <FaFilter
            className="filter-icon"
            title="Filter by Rating"
            onClick={toggleFilter}
            style={{ cursor: 'pointer' }}
            aria-label="Toggle rating filter"
            aria-expanded={isFilterOpen}
          />
          {isFilterOpen && (
            <div className="rating-panel" ref={filterRef}>
              <div className="rating-checkboxes">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    value="all"
                    checked={selectedRatings.includes('all')}
                    onChange={() => handleRatingChange('all')}
                  />
                  All Ratings
                </label>
                {[5, 4, 3, 2, 1].map((value) => (
                  <label key={value} className="checkbox-label">
                    <input
                      type="checkbox"
                      value={value}
                      checked={selectedRatings.includes(String(value))}
                      onChange={() => handleRatingChange(String(value))}
                      disabled={selectedRatings.includes('all')}
                    />
                    {value} Star{value > 1 ? 's' : ''}
                  </label>
                ))}
              </div>
            </div>
          )}
        </div>
        {/* Review Count */}
        {!loading && !error && reviews.length > 0 && (
          <p className="review-count">
            Showing {reviews.length} review{reviews.length > 1 ? 's' : ''}
          </p>
        )}
      </div>

      {/* Loading State */}
      {loading && <p>Loading reviews...</p>}

      {/* Error State */}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* No Reviews Message */}
      {!loading && !error && reviews.length === 0 && (
        <p>
          No reviews found
          {selectedRatings.length > 0 && !selectedRatings.includes('all')
            ? ` for selected ratings: ${selectedRatings.join(', ')}`
            : ''}.
        </p>
      )}
      {!loading && !error && reviews.length > 0 && <ReviewList reviews={reviews} />}
    </div>
  );
};

export default ReviewPage;