import { Link } from "react-router-dom";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { getIncomingFriendRequestsOfUser } from "../data/friendRequests";
import { acceptFriendRequest } from "../data/friendRequests";
import { useAuth } from "../context";



const IncomingFriendRequestPage = () => {

  const [incomingFriendRequests, setIncomingFriendRequests] = useState([]);
  const { user: activeUser } = useAuth();
  const activeUserId = activeUser._id;
  const [friendRequestStatus, setFriendRequestStatus] = useState("open");

  useEffect(() => {
    const fetchIncomingFriendRequests = async (activeUserId) => {
      const incomingFriendRequests = await getIncomingFriendRequestsOfUser(activeUserId);
      setIncomingFriendRequests(incomingFriendRequests);
    };
    fetchIncomingFriendRequests(activeUserId);
  }
    , [activeUserId]);



  const acceptFriendRequestHandler = async (friendRequestId, requestingUserId, targerUserId) => {
    try {
      await acceptFriendRequest(friendRequestId, requestingUserId, targerUserId);
      setFriendRequestStatus("closed");
    } catch (error) {
      console.error("Error accepting friend request", error);
    }
  };





  return (
    <>
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col items-start justify-start w-full h-full">
          <div className="m-4 flex items-center space-x-4 w-1/2">

            {/* search bar */}
            <div className="flex items-center gap-2 flex-grow">
              <label className="input input-bordered border-primary-content bg-primary flex items-center gap-2 text-primary-content focus:bg-accent focus:text-accent-content w-full">
                <Search className="primary-content" size={18} />
                <input
                  name="search"
                  id="search"
                  placeholder="Search for User"
                  className="grow placeholder-accent "
                />
              </label>
            </div>
          </div>
          {/* grid*/}
          <div className="m-4 mr-8 w-11/12">
              {incomingFriendRequests.length > 0 ? (
              incomingFriendRequests.map((incomingFriendRequest) => (
            <div key={incomingFriendRequest._id} className="grid grid-cols-8 gap-4 ">
              {/* avatar */}
              <div className="col-span-1 avatar flex justify-center items-center">
                  <div className="w-24 rounded-full">
                    <img src="libraryFriends-avatarFallback_darkTheme.svg" />
                </div>
              </div>

              {/* username */}
              <div className="col-span-3 flex justify-center items-center">
                <Link to={`/profile/${incomingFriendRequest.requestingUser._id}`}><h1>
                  {incomingFriendRequest.requestingUser.userName}
                </h1></Link>
              </div>

              {/* accept friend request */}
              <div className="col-span-2 flex items-center justify-center">
                <button className="btn btn-success btn-sm" onClick={() => acceptFriendRequestHandler(incomingFriendRequest._id, activeUserId, incomingFriendRequest.requestingUser._id)}>accept friend request</button>
              </div>

              {/* accept friend request */}
              <div className="col-span-2 flex items-center justify-center">
                <button className="btn btn-warning btn-sm">decline friend request</button>
              </div>
            </div>
            ))) : ( <h1>No incoming friend requests</h1>)}


          </div>



          <label
            htmlFor="my-drawer-2"
            className="btn btn-primary drawer-button lg:hidden"
          >
            Open drawer
          </label>
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-2"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu bg-base-200 text-base-content min-h-full w-60 pt-4 p-2">
            {/* Sidebar content here */}
            <li>
              <Link to="/friends">
                <h1>MY FRIENDS</h1>
              </Link>
            </li>
            <li>
              <Link to="/incomingfriendrequests">
                <h1>INCOMING FRIEND REQUESTS</h1>
              </Link>
            </li>
            <li>
              <Link to="/outgoingfriendrequests">
                <h1>OUTGOING FRIEND REQUESTS</h1>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default IncomingFriendRequestPage