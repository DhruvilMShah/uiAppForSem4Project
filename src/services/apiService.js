import axios from 'axios';
import { BASE_URL, USER_EMAIL } from "../config.js";
export const getAchievements = async (email) => {
  try {
    const response = await axios.get(`${BASE_URL}/user/${email}`);
    console.log(response);
    return response.data;
  } catch (error) {
    console.error('Error fetching achievements:', error);
    throw error;
  }
};


export const getReviews = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/reviews`);
    console.log(response);
    return response.data;
  } catch (error) {
    console.error('Error fetching reviews:', error);
    throw error;
  }
  };

export const getReviewsByRating = async (rating) => {
  try {
    const response = await axios.get(`${BASE_URL}/reviews/rating/${rating}`);
    console.log(response);
    return response.data;
  } catch (error) {
    console.error('Error fetching reviews:', error);
    throw error;
  }
};

export const deleteAchievement = async (id) => {
  console.log(`Deleting achievement id: ${id}`);
  const response = await axios.delete(`${BASE_URL}/achievement`, {
    data: {
      achievementId: id,
    },
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response.data;
};

export const updateAchievement = (achievement) => {
  return axios.patch(`${BASE_URL}/achievement`, achievement);
};