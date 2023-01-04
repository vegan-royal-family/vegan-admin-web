import axios from "axios";

export const getJwtToken = async (body) => {
  try {
    const response = await axios.post("/api/auth/token", body);
    return response?.data;
  } catch (error) {
    throw error;
  }
};

export const managerLogin = async (body) => {
  try {
    const response = await axios.post("/api/auth/login", body);
    return response;
  } catch (error) {
    throw error;
  }
};
