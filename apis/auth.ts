import axios from "axios";

type getJwtTokenBody = {
  provider: "kakao" | "naver" | "google";
  token: string;
};

type managerLoginBody = {
  id: string;
  password: string;
};

export const getJwtToken = async (body: getJwtTokenBody) => {
  try {
    const response = await axios.post("/api/auth/token", body);
    return response?.data;
  } catch (error) {
    throw error;
  }
};

export const managerLogin = async (body: managerLoginBody) => {
  try {
    const response = await axios.post("/api/auth/login", body);
    return response?.data;
  } catch (error) {
    throw error;
  }
};
