import axios from 'axios';
import { BASE_URL } from "../config.js";

export const getAchievements = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/user/john.doe@example.com`);
    console.log(response);
    return response.data;
  } catch (error) {
    console.error('Error fetching achievements:', error);
    throw error;
  }
};

export const addAchievement = async (achievement) => {
  try {
    const response = await axios.post(`${BASE_URL}/achievements`, achievement);
    return response.data;
  } catch (error) {
    console.error('Error adding achievement:', error);
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

// Add more functions for other API endpoints if needed
