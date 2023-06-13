import { axiosInstance } from "../lib/fetchAPI";

export const postAdminMealsRequest = (data) => {
  return axiosInstance.post("foods", data);
};

export const deleteAdminRequest = (id, data) => {
  return axiosInstance.delete(`/foods/${id}`, data);
};
export const editAdminRequest = (data) => {
  const newData = {
    title: data.title,
    description: data.description,
    price: data.price,
  };

  return axiosInstance.put(`/foods/${data.id}`, newData);
};
