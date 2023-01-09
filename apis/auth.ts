import axios from "axios";

type managerLoginBody = {
  id: string;
  password: string;
};

export const managerLogin = async (body: managerLoginBody) => {
  try {
    const response = await axios.post("/api/auth/login", body);
    return response?.data;
  } catch (error) {
    throw error;
  }
};
