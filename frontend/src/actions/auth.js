// api.js
import { API_HOST } from '@components/utils/Constants';
import axios from 'axios';

export const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_HOST}/login`, { email, password });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const signup = async (username, email, password, phone) => {
  try {
    const response = await axios.post(`${API_HOST}/signup`, { username, email, password, phone });
    return response.data;
  } catch (error) {
    throw error;
  }
};

