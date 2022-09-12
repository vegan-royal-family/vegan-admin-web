import axios from "axios";

export const getJwtToken = async (body) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_AUTH_API_HOST}/auth/token`,
      body
    );
    return response?.data;
  } catch (error) {
    throw error;
  }
};
