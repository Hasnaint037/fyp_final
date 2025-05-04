/* eslint-disable no-debugger */
import api from "../../api";

export const createProduct = async (data) => {
  const response = await api.post("product/create", data);
  return response.data;
};

export const deleteProduct = async (id) => {
  const response = await api.delete(`product/delete/${id}`);
  return response.data;
};

export const getAllProducts = async () => {
  const response = await api.get("product/getAll");
  return response.data;
};

export const updateProduct = async (data) => {
  const id = data.get("id");
  const response = await api.put(`product/update/${id}`, data);
  return response.data;
};

export const getProductsCounts = async () => {
  const response = await api.get("product/getCategoryWiseProducts");
  return response.data;
};

export const getForMen = async () => {
  const response = await api.get("product/getall/mobile");
  return response.data;
};

export const getForWomen = async () => {
  const response = await api.get("product/getall/laptop");
  return response.data;
};

export const getForChildren = async () => {
  const response = await api.get("product/getall/others");
  return response.data;
};
