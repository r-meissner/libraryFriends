import { Link } from 'react-router-dom'

const PublicUserProfile = () => {
  return (
    <div>

      {/* grid*/}
      <div className="m-4 mr-8 w-11/12">
            <div className="grid grid-cols-8 grid-rows-2 gap-4 ">
              {/* avatar */}
              <div className="col-span-1 row-span-2 avatar flex justify-center items-center">
                  <div className="w-24 rounded-full">
                    <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                </div>
              </div>

              {/* username */}
              <div className="col-span-4  row-span-1 flex justify-center items-center">
                <h1>
                  Username
                </h1>
              </div>

              {/* friend request button */}
              <div className="col-span-2 row-span-2 flex justify-center items-center">
                  <div className="btn btn-primary">send a friend request</div>
              </div>


              {/* user location */}
              <div className="col-span-4  row-span-1 flex justify-center items-center">
                <p>
                  located in City, Country
                </p>
              </div>

            </div>
            <div className="m-4">
              <h1>NO PUBLIC BOOKS.</h1>
              <p>Please send a Friend Request to the user to see their books in your Shared Library.</p>
            </div>
            <div>
              OR (conditional rendering)
            </div>

            {/* book grid*/}
          <div className="m-4 mr-8 w-11/12">
            <div className="grid grid-cols-8 grid-rows-2 gap-4 ">
              {/* book cover */}
              <div className="col-span-1 row-span-2">
                  <img src="https://ia801504.us.archive.org/view_archive.php?archive=/22/items/olcovers562/olcovers562-L.zip&file=5621267-L.jpg" alt="book cover title" />
                </div>

              {/* book title */}
              <div className="col-span-4 row-span-1">
                <h1>
                  Book Title
                </h1>
              </div>

              {/* book availability */}
              <div className="col-span-2 row-span-1 flex items-center justify-center flex-wrap">
                <div className="badge badge-primary badge-lg">available</div>
                <p>OR (conditional rendering)</p>
                <div className="badge badge-primary badge-lg">not available</div>
              </div>

              {/* request book button */}
              <div className="col-span-1 row-span-2 flex items-center justify-center">
                <button className="btn btn-success btn-sm">Request book</button>
              </div>

              {/* publisher & year */}
              <div className="col-span-4 row-span-1 flex items-start justify-evenly flex-col">
                <div>by Author</div>
                <div>published 1999</div>
              </div>
            </div>
          </div>
      </div>
    </div>
  )
}

export default PublicUserProfile