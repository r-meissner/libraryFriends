import { Link } from "react-router-dom";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { fetchBookRequestsOfUser } from "../data/bookRequests";
/* import {
  acceptFriendRequest,
  declineFriendRequest,
} from "../data/friendRequests"; */
import { useAuth } from "../context";
import Loader from "../components/Loader";

const BookRequestPage = () => {
  /* const [incomingBookRequests, setIncomingBookRequests] = useState([]);
  const [outgoingBookRequests, setOutgoingBookRequests] = useState([]); */
  const [bookRequests, setBookRequests] = useState({
    sentRequests: [],
    receivedRequests: [],
  });
  const { user: activeUser } = useAuth();
  const activeUserId = activeUser._id;
  /* const [bookRequestStatus, setBookRequestStatus] = useState("open"); */
  const [loading, setLoading] = useState(false);

  const getBookRequestsOfUser = async (activeUserId) => {
    try {
      setLoading(true);
      const res = await fetchBookRequestsOfUser(activeUserId);
      console.log("book requests", res);
      setBookRequests(res);
    } catch (error) {
      console.error("Error fetching book requests", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (activeUserId) {
      getBookRequestsOfUser(activeUserId);
    }
  }, [activeUserId]);

  console.log(bookRequests);

  /* const acceptFriendRequestHandler = async (
    friendRequestId,
    requestingUserId,
    targetUserId
  ) => {
    try {
      console.log("accepting friend request with ID ", friendRequestId);
      await acceptFriendRequest(
        friendRequestId,
        requestingUserId,
        targetUserId
      );
      fetchIncomingFriendRequests(activeUserId);
      setFriendRequestStatus("accepted");
    } catch (error) {
      console.error("Error accepting friend request", error);
    }
  }; */

  /*  const declineFriendRequestHandler = async (friendRequestId) => {
    try {
      console.log("declining friend request with ID ", friendRequestId);
      await declineFriendRequest(friendRequestId);
      fetchIncomingFriendRequests(activeUserId);
      setFriendRequestStatus("declined");
    } catch (error) {
      console.error("Error declining friend request", error);
    }
  }; */

  return (
    <>
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col items-start justify-start w-full h-full">
          <div className="m-4 mr-8 w-11/12">
            {/*Loader*/}
            {loading ? (
              <div className="flex justify-center items-center h-40">
                <Loader />
              </div>
            ) : (
              // Content when not loading
              <>
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
                  {bookRequests.receivedRequests.length > 0 ? (
                    bookRequests.receivedRequests.map((bookRequest) => (
                      <div
                        key={bookRequest._id}
                        className="grid grid-cols-8 grid-rows-2 gap-4 "
                      >
                        <div className="col-span-1 row-span-2 flex justify-center items-center">
                          {/* book cover */}

                          <img
                            src={
                              bookRequest._id?.cover ||
                              "https://via.placeholder.com/500?text=No+Cover"
                            }
                            alt={`Cover of ${bookRequest._id?.title || "No Title"}`}
                            className="w-full h-full object-cover"
                            onLoad={(e) => {
                              // Check if the image is too small or malformed
                              if (
                                e.target.naturalWidth < 100 ||
                                e.target.naturalHeight < 100
                              ) {
                                e.target.src =
                                  "https://via.placeholder.com/500?text=No+Cover";
                              }
                            }}
                            onError={(e) => {
                              // Fallback to placeholder if image fails to load
                              e.target.src =
                                "https://via.placeholder.com/500?text=No+Cover";
                            }}
                          />
                        </div>

                        {/* Book Title */}
                        <div className="col-span-3 row-span-1 flex justify-center items-center">
                        <h1 className="font-bold">{bookRequest.book.title}</h1>
                        </div>

                        {/* accept book request */}
                        <div className="col-span-2 row-span-2 flex items-center justify-center">
                          <button
                            className="btn btn-success btn-sm"
                            /* onClick={() =>
                              acceptFriendRequestHandler(
                                incomingFriendRequest._id,
                                activeUserId,
                                incomingFriendRequest.requestingUser._id
                              )
                            } */
                          >
                            accept to lend this book
                          </button>
                        </div>

                        {/* decline book request */}
                        <div className="col-span-2 row-span-2 flex items-center justify-center">
                          <button
                            className="btn btn-warning btn-sm"
                            /* onClick={() =>
                              declineFriendRequestHandler(
                                incomingFriendRequest._id
                              )
                            } */
                          >
                            decline to lend this book
                          </button>
                        </div>

                        {/* requesting user */}
                        <div className="col-span-3 col-start-2 row-start-2 row-span-1 flex items-center justify-center">
                          <div className="badge badge-primary">requested by {bookRequest.requestingUser.userName}</div>
                      </div>
                      </div>
                    ))
                  ) : (
                    <p>No book requests</p>
                  )}
                </div>
              </>
            )}

            <label
              htmlFor="my-drawer-2"
              className="btn btn-primary drawer-button lg:hidden"
            >
              Open drawer
            </label>
          </div>
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
              <Link to="/mybooks">
                <h1>MY BOOKS</h1>
              </Link>
            </li>
            <li>
              <Link to="/myborrowedbooks">
                <h1>BORROWED BOOKS</h1>
              </Link>
            </li>
            <li>
              <Link to="/mylentbooks">
                <h1>LENT BOOKS</h1>
              </Link>
            </li>
            <li>
              <Link to="/bookrequests">
                <h1>BOOKREQUESTS</h1>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default BookRequestPage;
