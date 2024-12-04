import { Link } from "react-router-dom";
import { Search } from "lucide-react";

const OutgoingFriendRequestPage = () => {
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
          {/* book grid*/}
          <div className="m-4 mr-8 w-11/12">
            <div className="grid grid-cols-8 gap-4 ">
              {/* avatar */}
              <div className="col-span-1 avatar flex justify-center items-center">
                  <div className="w-24 rounded-full">
                    <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                </div>
              </div>

              {/* username */}
              <div className="col-span-4 flex justify-center items-center">
                <Link to="/profile/:userid"><h1>
                  Username
                </h1></Link>
              </div>

              {/* button to user's books --> also leads to profile */}
              <div className="col-span-2 flex justify-center items-center">
                  <div className="badge badge-primary badge-lg">waiting for username&apos;s answer</div>
                  <p>OR (conditional rendering)</p>
                  <div className="badge badge-primary badge-lg">friend request declined</div>
              </div>
            </div>







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