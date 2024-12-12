import axiosInstance from "../axiosIntercepter";
const baseURL = "/api/friendrequests";



export const sendFriendRequest = async (userid, activeUserId) => {
  try {
    const res = await axiosInstance.post(`${baseURL}`,
      {
        targetUser: userid,
        requestingUser: activeUserId,
        status: "pending",
      });
    console.log("Friend request sent:", res.data);
  } catch (error) {
    if (error.response) {
      console.error("Error sending friend request", error.response.data.error);
    }
  }
};

export const acceptFriendRequest = async (friendRequestId, requestingUserId, targetUserId) => {
  try {

    // Add both users to each other's friends list
    await axiosInstance.post(`/api/users/${requestingUserId}/friends`, { friendId: targetUserId });
    await axiosInstance.post(`/api/users/${targetUserId}/friends`, { friendId: requestingUserId });

    // Delete the friend request
    const res = await axiosInstance.delete(`${baseURL}/${friendRequestId}`);
    console.log("Friend request accepted:", res.data);

  } catch (error) {
    if (error.response) {
      console.error("Error accepting friend request", error.response.data.error);
    }
  }
};

export const declineFriendRequest = async (friendRequestId) => {
  try {
    const res = await axiosInstance.put(`${baseURL}/${friendRequestId}`, { status: 'declined' },
      { headers: { 'Content-Type': 'application/json' } }
    );
    console.log("Friend request declined:", res.data);
  } catch (error) {
    if (error.response) {
      console.error("Error deleting friend request", error.response.data.error);
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

