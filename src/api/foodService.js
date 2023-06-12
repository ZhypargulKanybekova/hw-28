import { axiosInstance } from "../lib/fetchAPI";

export const getMealsRequest = () => {
  return axiosInstance.get("/foods");
};
  
export const getBasketRequest = () => {
  return axiosInstance.get("/basket");
};

export const addTRoBasketRequest = (newItem) => {
  return axiosInstance.post(`/foods/${newItem.id}/addToBasket`, {
    amount: newItem.amount,
  });
};

export const updateBaasketRequest = (basketAmount, id, decrement) => {
  return axiosInstance.put(`/basketItem/${id}/update`, {
    amount: decrement ? basketAmount - 1 : basketAmount + 1,
  });
};

export const deleteBasketRequest = (id) => {
  return axiosInstance.delete(`/basketItem/${id}/delete`);
};
