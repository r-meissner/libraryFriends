import axiosInstance from "../axiosIntercepter";
const baseURL = "/api/books";

export const createBook = async (formData) => {
  try {
    const res = await axiosInstance.post(`${baseURL}`, formData);
    return res.data;
  } catch (error) {
    const errorData = error.response.data;
    if (!errorData.error) {
      throw new Error("An error occurred while creating the post");
    }
    throw new Error(errorData.error);
  }
};
