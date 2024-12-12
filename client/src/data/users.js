import axiosInstance from "../axiosIntercepter";
const baseURL = "/api/users";

export const addBookToUser = async (formData, userId) => {
  try {
    const res = await axiosInstance.post(
      `${baseURL}/${userId}/books`,
      formData
    );
    return res.data;
  } catch (error) {
    if (error.response) {
      console.error("Error adding book to user", error.response.data.error);
    }
  }
};

export const getFriendsFromUser = async (userId) => {
  try {
    const res = await axiosInstance.get(`${baseURL}/${userId}/friends`);
    return res.data;
  } catch (error) {
    if (error.response) {
      console.error("Error fetching users' friends", error.response.data.error);
    }
  }
};

export const searchFriendByEmail = async (formData) => {
  try {
    const res = await axiosInstance.post(`${baseURL}/search`, formData);
    return res.data;
  } catch (error) {
    if (error.response) {
      console.error("Error finding friend", error.response.data.error);
    }
  }
};

export const getSharedBooks = async (id) => {
  try {
    const res = await axiosInstance.get(`${baseURL}/${id}/sharedBooks`);
    return res.data;
  } catch (error) {
    if (error.response) {
      console.error("Error finding friend", error.response.data.error);
    }
  }
}