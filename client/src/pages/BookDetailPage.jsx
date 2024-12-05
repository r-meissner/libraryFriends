import { Link } from 'react-router-dom'


const BookDetailPage = () => {
  return (
    <div className="flex h-screen flex-row-reverse">
      {/* Sidebar */}
      <div className="bg-base-200 w-60 p-4">
        <h2 className="text-lg font-bold">Owned by friends</h2>
        <ul className="menu menu-compact">
          <li>
            <Link to="profile/:userid">
              username
            </Link>
          </li>
        </ul>
      </div>

      {/* Main content */}
      <div className="flex-1 bg-base-100 p-6">
          <div className="grid grid-cols-4 grid-rows-8 gap-2">
            <div className="col-span-1 row-span-8">
              <img
              src="https://ia801504.us.archive.org/view_archive.php?archive=/22/items/olcovers562/olcovers562-L.zip&file=5621267-L.jpg" alt="book cover title"
              className="h-64 w-auto object-cover" />
            </div>
            <div className="col-start-2 col-span-3 row-span-2">
              <h1>
                Book Title
              </h1>
            </div>
            <div className="col-start-2 col-span-3">
              <p>
                by Author
              </p>
            </div>
            <div className="col-start-2 col-span-3">
              <p>
                published in 1999
              </p>
            </div>
            <div className="col-start-2 col-span-3">
              <p>
                published by Publishing House
              </p>
            </div>
            <div className="col-start-2 col-span-3">
              <p>
                edition number
              </p>
            </div>
            <div className="col-start-2 col-span-3">
              <p>
                XXX pages
              </p>
            </div>
            <div className="col-start-2 col-span-3">
              <p>
                ISBN: 1234567890
              </p>
            </div>

          </div>
          <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>

      </div>

    </div>
  )
}

export default BookDetailPage