import axiosInstance from "../axiosIntercepter";
const baseURL = "/api/users";

export const addBookToUser = async (formData, userId) => {
    try {
      const res = await axiosInstance.post(`${baseURL}/${userId}/books`, formData);
      return res.data;
    } catch (error) {
        if (error.response) {
            console.error('Error adding book to user', error.response.data.error);
          }
    }
  };
  