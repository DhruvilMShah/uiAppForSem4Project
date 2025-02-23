import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/AddReview.css";
import { BASE_URL } from "../config.js";

const AddReview = () => {
  const [reviewData, setReviewData] = useState({
    rating: 1,
    description: "",
    anonymity: false,
  });

  const navigate = useNavigate();

  const handleStarClick = (index) => {
    setReviewData({ ...reviewData, rating: index + 1 });
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setReviewData({
      ...reviewData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const reviewToSend = {
      ...reviewData,
      email: reviewData.anonymity ? null : "john.doe@example.com",
    };

    try {
      const response = await fetch(`${BASE_URL}/review`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reviewToSend),
      });

      if (response.ok) {
        alert("Review added successfully!");
        navigate("/reviews");
      } else {
        alert("Failed to add review");
      }
    } catch (error) {
      console.error("Error adding review:", error);
    }
  };

  return (
    <div className="popup-form">
      <h2>Add Review</h2>
      <form onSubmit={handleSubmit}>
        <label>Rating:</label>
        <div className="star-rating">
          {[...Array(5)].map((_, index) => (
            <span
              key={index}
              className={`star ${index < reviewData.rating ? "filled" : ""}`}
              onClick={() => handleStarClick(index)}
            >
              ★
            </span>
          ))}
        </div>

        <label>Description:</label>
        <textarea
          name="description"
          value={reviewData.description}
          onChange={handleChange}
          required
        />

        <label className="checkbox-label">
          <input
            type="checkbox"
            name="anonymity"
            checked={reviewData.anonymity}
            onChange={handleChange}
          />
          Post Anonymously
        </label>

        <div className="form-buttons">
          <button type="submit">Submit</button>
          <button type="button" onClick={() => navigate("/reviews")}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddReview;
