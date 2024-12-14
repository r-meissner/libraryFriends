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

export const createBookRequest = async (requestBody, activeUserId) => {
  try {
    const res = await axiosInstance.post(`${baseURL}/${activeUserId}`, requestBody);
    return res.data;
  } catch (error) {
    console.error("Error creating bookrequest",error);
  }
}


export const handleAcceptedBookRequest = async (requestBody, currentReaderId) => {
  try {

    //add book to active user's/borrower's library
    const res = await axiosInstance.post(`/api/users/${currentReaderId}/books`,
      requestBody
    );

    return res.data;
  } catch (error) {
    console.error("Error accepting book request", error);
  }
}

export const setBookRequestToClosed = async (bookRequestId, requestBody) => {
  try {
    //set book request status to closed
    const res = await axiosInstance.put(`${baseURL}/${bookRequestId}`, requestBody);
    return res.data;
  } catch (error) {
    console.error("Error accepting book request", error);
  }
}

