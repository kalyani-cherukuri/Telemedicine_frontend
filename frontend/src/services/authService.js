import API from "../api/axios";

export const registerUser = async (userData) => {
  const response = await API.post("/users", userData);
  return response.data;
};

export const loginUser = async (userData) => {
  const response = await API.post("/auth/login", userData);
  return response.data;
};