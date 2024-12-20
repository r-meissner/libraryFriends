import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosInstance from "../axiosIntercepter";
import { useAuth } from "../context";
import { fetchFriendShipStatus } from "../data/users";
import { sendFriendRequest, fetchFriendRequestStatus } from "../data/friendRequests";
import { getBooksFromUser } from "../data/users";
import { Link } from "react-router-dom";




const PublicUserProfile = () => {
  const { userid } = useParams();
  const { user: activeUser, theme } = useAuth();
  const [userData, setUserData] = useState(null);
  const [friendRequestStatus, setFriendRequestStatus] = useState({
    sentStatus: null,
    receivedStatus: null,
  });

  const [isFriend, setIsFriend] = useState(false);
  const [books, setBooks] = useState([]);


    const activeUserId = activeUser._id;


  useEffect(() => {
    if (userid && activeUserId) {
      fetchFriendRequestStatus(userid, activeUserId, setFriendRequestStatus);}
  }, [userid, activeUserId]);



  useEffect(() => {
    const friendShipStatus = async () => {
      try {
        const response = await fetchFriendShipStatus(activeUserId);
        const friends = response;
        const isFriend = friends.some((friend) => {
          const friendId = friend._id._id;
          return friendId === userid });
        setIsFriend(isFriend);
  } catch (error) {
    console.error("Error loading friendship status:", error);
  }
  };
  friendShipStatus(activeUserId);
  }
  , [userid, activeUserId]);


  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axiosInstance.get(`/api/users/${userid}`);
        setUserData(response.data);
      } catch (error) {
        console.error("Error loading user data:", error);
      }
    };
    fetchUserData();
  }, [userid]);


  useEffect (() => {
    const fetchBooks = async () => {
      try {
        const response = await getBooksFromUser(userid);
        setBooks(response);
        console.log("book response", response);
      } catch (error) {
        console.error("Error loading books:", error);
      }
    };
    fetchBooks();
  }
  , [userid]);




  if (!userData) {
    return <p>Loading...</p>;
  };

  return (
    <div>
      {/* grid*/}
      <div className="m-4 mr-8 w-11/12">
        <div className="grid grid-cols-8 grid-rows-2 gap-4 ">
          {/* avatar */}
          <div className="col-span-1 row-span-2 avatar flex justify-center items-center">
            <div className="w-24 rounded-full">
              <img
                src={userData.avatar || (theme === "darkTheme" ? "/libraryFriends-avatarFallback_darkTheme.svg" : "/libraryFriends-avatarFallback_lightTheme.svg")}
                alt={`profile picture of user ${userData.userName}`}
              />
            </div>
          </div>

          {/* username */}
          <div className="col-span-4  row-span-1 flex justify-center items-center">
            <h2>{userData.userName}</h2>
          </div>

          {/* friend request button / status indicator */}
            <div className="col-span-2 row-span-2 flex justify-center items-center">
            {friendRequestStatus.sentStatus === null && friendRequestStatus.receivedStatus === null && !isFriend ? (
            <div
            className="btn btn-primary"
            onClick={async () => {
              await sendFriendRequest(userid, activeUserId);
              fetchFriendRequestStatus(userid, activeUserId, setFriendRequestStatus);
            }}>
              send a friend request
            </div>
           ) : friendRequestStatus.sentStatus === "pending" || friendRequestStatus.receivedStatus === "pending" ? (
            <div className="badge badge-primary badge-lg">Friend Request Pending</div>
           ) : isFriend? (
            <div className="badge badge-success badge-lg">You are Friends!</div>) : null
          }
            </div>


          {/* user location */}
          <div className="col-span-4  row-span-1 flex justify-center items-center">
            <p>
              located in {userData.city || 'a dream city'}, {userData.country || 'in a dream country'}
            </p>
          </div>
        </div>

        {/* can be deleted later, when books will be displayed */}
        <div className="m-4 mr-8 w-11/12 flex justify-center">
          <h2>Check out {userData.userName}'s books in the
            <Link to="/sharedlibrary">
              <div className="btn btn-primary btn-sm text-2xl ml-4">Shared Library!</div>
            </Link>
          </h2>

        </div>



        {/* {!isFriend ? (
        <div className="m-4">
          <h2>NO PUBLIC BOOKS.</h2>
          <p>
            Please send a Friend Request to the user to see their books.
          </p>
        </div>
        ) : (


        <div className="m-4 mr-8 w-11/12">
          // book grid
          {books.length > 0 ? (
          books.map((book) => (
          <div key={book._id._id} className="grid grid-cols-8 grid-rows-2 gap-4 ">


            // book cover
            <div className="col-span-1 row-span-2">
              <img
                src={book._id.cover || "https://via.placeholder.com/500?text=No+Cover"}
                alt={book._id.title}
              />
            </div>

            //book title
            <div className="col-span-4 row-span-1">
              <h2>{book._id.title}</h2>
            </div>

            //book availability
            <div className="col-span-2 row-span-1 flex items-center justify-center flex-wrap">
              <div className="badge badge-primary badge-lg">available</div>
              <p>OR (conditional rendering)</p>
              <div className="badge badge-primary badge-lg">not available</div>
            </div>

            //request book button
            <div className="col-span-1 row-span-2 flex items-center justify-center">
              <button className="btn btn-success btn-sm">Request book</button>
            </div>

            //publisher & year
            <div className="col-span-4 row-span-1 flex items-start justify-evenly flex-col">
              <div>by {book._id.author}</div>
              <div>published {book._id.year}</div>
            </div>
          </div>
          ))): (
          <p>No books available</p>
          )}
        </div> )}*/}
      </div>
    </div>
  );
};

export default PublicUserProfile;
