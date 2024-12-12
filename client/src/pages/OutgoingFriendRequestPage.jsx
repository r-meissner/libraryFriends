import { Link } from "react-router-dom";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { getOutgoingFriendRequestsOfUser } from "../data/friendRequests";
import { fetchFriendShipStatus } from "../data/users";
import { useAuth } from "../context";

const OutgoingFriendRequestPage = () => {

  const [outgoingFriendRequests, setOutgoingFriendRequests] = useState([]);
  const { user: activeUser } = useAuth();
  const activeUserId = activeUser._id;
  const [isFriend, setIsFriend] = useState(false);


  useEffect(() => {
    const fetchOutgoingFriendRequests = async (activeUserId) => {
      const outgoingFriendRequests = await getOutgoingFriendRequestsOfUser(activeUserId);
      setOutgoingFriendRequests(outgoingFriendRequests);
    };
    fetchOutgoingFriendRequests(activeUserId);
  }
    , [activeUserId]);

    console.log(outgoingFriendRequests);

    /* const userid = outgoingFriendRequests.targetUser._id; */

   /*  useEffect(() => {
      const friendShipStatus = async () => {
        try {
          const response = await fetchFriendShipStatus(activeUser);
          const friends = response.data;
          const isFriend = friends.some((friend) => friend._id === userid);
          setIsFriend(isFriend);
      } catch (error) {
        console.error("Error loading friendship status:", error);
      }
      };
      friendShipStatus();
    }
    , [userid, activeUser]); */

  return (
    <>
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col items-start justify-start w-full h-full">
          {/* <div className="m-4 flex items-center space-x-4 w-1/2">

            search bar
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
          </div> */}
          {/* grid*/}
          <div className="m-4 mr-8 w-11/12">
            {outgoingFriendRequests.length > 0 ? (
              outgoingFriendRequests.map((outgoingFriendRequest) => (
            <div key={outgoingFriendRequest._id} className="grid grid-cols-8 gap-4 ">
              {/* avatar */}
              <div className="col-span-1 avatar flex justify-center items-center">
                  <div className="w-24 rounded-full">
                    <img src="libraryFriends-avatarFallback_darkTheme.svg" />
                </div>
              </div>

              {/* username */}
              <div className="col-span-4 flex justify-center items-center">
                <Link to={`/profile/${outgoingFriendRequest.targetUser._id}`}><h1>
                {outgoingFriendRequest.targetUser.userName}
                </h1></Link>
              </div>

              {/* button to user's books --> also leads to profile */}
              <div className="col-span-2 flex justify-center items-center">
                  <div className="badge badge-primary badge-lg">waiting for username&apos;s answer</div>
                  <p>OR (conditional rendering)</p>
                  <div className="badge badge-primary badge-lg">friend request declined</div>
              </div>
            </div>

            ))): (
              <p>No outgoing friend requests</p>
            )}






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

export default OutgoingFriendRequestPage