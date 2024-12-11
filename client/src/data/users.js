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

export const fetchFriendShipStatus = async (activeUser) => {
  try {
    const response = await axiosInstance.get(`/api/users/${activeUser._id}/friends`);
    return response.data;
  } catch (error) {
    console.error("Error loading friendship status:", error);
  }};



  export const getUserById = async (userId) => {
    try {
      const res = await axiosInstance.get(`${baseURL}/${userId}`);
      return res.data;
    } catch (error) {
      console.error("Error loading user data:", error);
    }
  };
