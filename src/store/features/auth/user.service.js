import api from "../../api";

export const signup = async (data) => {
  const response = await api.post("user/register", data);
  return response.data;
};

export const login = async (data) => {
  const response = await api.post("user/login", data);
  return response.data;
};
