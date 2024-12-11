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

export const acceptFriendRequest = async (friendRequestId, requestingUserId, targerUserId) => {
  try {
    const res = await axiosInstance.put(`${baseURL}/${friendRequestId}`, { status: "closed" });
    console.log("Friend request accepted:", res.data);

    // Add both users to each other's friends list
    await axiosInstance.post(`/api/users/${requestingUserId}/friends`, { friendId: targerUserId });
    await axiosInstance.post(`/api/users/${targerUserId}/friends`, { friendId: requestingUserId });

    console.log("Friendship established");
    
  } catch (error) {
    if (error.response) {
      console.error("Error accepting friend request", error.response.data.error);
    }
  }
};

export const getIncomingFriendRequestsOfUser = async (activeUserId) => {
  try {
    const res = await axiosInstance.get(`${baseURL}/${activeUserId}/incoming`);
    return res.data.receivedRequests;
  } catch (error) {
    console.error("Error loading incoming friend requests", error);
  }
};

export const getOutgoingFriendRequestsOfUser = async (userId) => {
  try {
    const res = await axiosInstance.get(`${baseURL}/${userId}/outgoing`);
    return res.data.sentRequests;
  } catch (error) {
    console.error("Error loading outgoing friend requests", error);
  }
};

