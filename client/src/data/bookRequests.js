import axiosInstance from "../axiosIntercepter";
const baseURL = "/api/bookrequests";

export const fetchBookRequestsOfUser = async (activeUserId) => {
  try {
    const res = await axiosInstance.get(`${baseURL}/${activeUserId}`);
    return res.data;
  } catch (error) {
    console.error("Error loading book requests", error);
  }
}



