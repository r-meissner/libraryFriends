import { Search } from 'lucide-react';


const SharedLibraryPage = () => {
  return (
    <div>
      <div className="m-4 flex items-center space-x-4 w-1/2">
            {/* sort by select */}
            <select className="select select-primary max-w-xs">
              <option disabled selected>
                sort by
              </option>
              <option>Title</option>
              <option>Author</option>
              <option>Year</option>
            </select>

            {/* search bar */}
            <div className="flex items-center gap-2 flex-grow">
              <label className="input input-bordered border-primary-content bg-primary flex items-center gap-2 text-primary-content focus:bg-accent focus:text-accent-content w-full">
                <Search className="primary-content" size={18} />
                <input
                  name="search"
                  id="search"
                  placeholder="Search for Book"
                  className="grow placeholder-accent "
                />
              </label>
            </div>
          </div>

      {/* book grid*/}
      <div className="m-4 mr-8 w-11/12">
            <div className="grid grid-cols-8 grid-rows-2 gap-4 ">
              {/* book cover */}
              <div className="col-span-1 row-span-2">
                  <img src="https://ia801504.us.archive.org/view_archive.php?archive=/22/items/olcovers562/olcovers562-L.zip&file=5621267-L.jpg" alt="book cover title" />
                </div>

              {/* book title */}
              <div className="col-span-2 row-span-1">
                <h1>
                  Book Title
                </h1>

              </div>

              {/* location of book */}
              <div className="col-span-2 row-span-2 flex items-center justify-center flex-wrap">
                <div className="badge badge-primary badge-lg">owned by username, username</div>
              </div>

              {/* availability */}
              <div className="col-span-2 row-span-2 flex items-center justify-center flex-wrap">
                <div className="badge badge-primary badge-lg">available</div>
                <p>OR (conditional rendering)</p>
                <div className="badge badge-primary badge-lg">not available</div>
              </div>

              {/* request book button */}
              <div className="col-span-1 row-span-2 flex items-center justify-center">
                <button className="btn btn-primary btn-xs">Request book</button>
              </div>

              {/* publisher & year */}
              <div className="col-span-2 row-span-1 flex items-start justify-evenly flex-col">
                <div>by Author</div>
                <div>published 1999</div>
              </div>
            </div>







          </div></div>
  )
}

export default SharedLibraryPage