/* eslint-disable no-debugger */
import api from "../../api";

export const createOrder = async (data) => {
  const response = await api.post("/order/place-order", data);
  return response.data;
};

export const getOrdersCount = async () => {
  const response = await api.get("/order/order-count");
  console.log(response);
  return response.data;
};
