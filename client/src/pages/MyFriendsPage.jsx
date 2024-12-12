import { Link, useNavigate } from "react-router-dom";
import { CirclePlus } from "lucide-react";
import { useEffect, useState } from "react";
import { useAuth } from "../context";
import { getFriendsFromUser, searchFriendByEmail } from "../data/users";
import { useDebounce} from 'use-debounce'

const MyFriendsPage = () => {
  const [friends, setFriends] = useState([]);
  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebounce(search,500);
  const [results, setResults] = useState({});
  const { user } = useAuth();
  const navigate = useNavigate();

  //get the friends list on mount:
  useEffect(() => {
    let ignore = false;
    const getFriends = async () => {
      try {
        const data = await getFriendsFromUser(user._id);
        //console.log(data);
        if (!ignore) {
          setFriends(data);
        }
      } catch (error) {
        console.log("Error fetching friends: ", error);
      }
    };
    getFriends();

    return () => {
      ignore = true;
    };
  }, []);

  //show searchResults corresponding to current query:
  useEffect(() => {
    let ignore = false;
    const searchFriend = async () => {
      try {
        const result = await searchFriendByEmail({ email: debouncedSearch});
        if (!ignore) {
          if (result) {
            setResults(result);
          } else {
            setResults([]);
          }
        }
      } catch (error) {
        console.log("Error fetching search results", error);
      }
    }
    if (search.length>=4) {
      searchFriend();
    }

    return () => {
      ignore = true;
    }
  }, [debouncedSearch])


  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const handleResultClick = (results) => {
    navigate(`/profile/${results._id}`);
  }

  return (
    <>
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col items-start justify-start w-full h-full">
          <div className="m-4 flex items-center space-x-4 w-1/2">
            {/* search bar */}
            <div className="flex items-center gap-2 flex-grow">
              <label className="input input-bordered border-primary-content bg-primary flex items-center gap-2 text-primary-content focus:bg-accent focus:text-accent-content w-full">
                <CirclePlus className="primary-content" size={18} />
                <input
                  name="search"
                  id="search"
                  value={search}
                  onChange={handleChange}
                  placeholder="Add your friends by typing their email"
                  className="grow placeholder-accent "
                />
              </label>
            </div>
          </div>
          {results.email && (
              <div className="relative">
                <ul className="absolute z-50 bg-primary border border-primary-content text-primary-content shadow-lg rounded-lg mx-4">
                    <li
                      className="cursor-pointer p-2 hover:bg-accent hover:text-accent-content"
                      onClick={() => handleResultClick(results)}
                    >
                      <strong>{results.email}</strong>
                      <p className="text-sm">{results.userName}</p>
                    </li>
                </ul>
              </div>
            )}
          {/* grid*/}
          <div className="m-4 mr-8 w-11/12">
            {friends.length > 0 ? (
            friends.map((friend) => {
              return (
                <div className="grid grid-cols-8 gap-4 " key={friend._id._id}>
                  {/* avatar */}
                  <div className="col-span-1 avatar flex justify-center items-center">
                    <div className="w-24 rounded-full">
                      <img
                        src={
                          friend.avatar
                            ? friend.avatar
                            : `https://robohash.org/${friend._id._id}?set=set4.png`
                        }
                      />
                    </div>
                  </div>

                  {/* username */}
                  <div className="col-span-4 flex justify-center items-center">
                    <Link to={`/profile/${friend._id._id}`}>
                      <h1>{friend._id.userName}</h1>
                    </Link>
                  </div>

                  {/* button to user's books --> also leads to profile */}
                  <div className="col-span-2 flex justify-center items-center">
                    <Link to={`/profile/${friend._id._id}`}>
                      <div className="badge badge-primary badge-lg">
                        {`explore ${friend._id.userName}'s books`}
                      </div>
                    </Link>
                  </div>
                </div>
              )
              })
              ) : (
                <p>You don't have any friends yet. Enter the mailadress of your friends above to add them. </p>
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

export default MyFriendsPage;
