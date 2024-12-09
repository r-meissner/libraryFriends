import axiosInstance from "../axiosIntercepter";
const baseURL = "/api/friendRequests";



export const sendFriendRequest = async (userid, activeUserId) => {
  try {
    const res = await axiosInstance.post(`${baseURL}`,
      {
        targetUser: userid,
        requestingUser: activeUserId,
        status: "open",
      });
    console.log("Friend request sent:", res.data);
  } catch (error) {
    if (error.response) {
      console.error("Error sending friend request", error.response.data.error);
    }
  }
};

