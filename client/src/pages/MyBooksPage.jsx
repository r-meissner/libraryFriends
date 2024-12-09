import { Link } from "react-router-dom";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import axiosInstance from "../axiosIntercepter";

const MyBooksPage = () => {
  const [books, setBooks] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserAndBooks = async () => {
      try {
        // Get logged-in user info
        const userResponse = await axiosInstance.get("/api/auth/me");
        const loggedInUser = userResponse.data;
        setUser(loggedInUser);

        // Fetch user's books
        const booksResponse = await axiosInstance.get(
          `/api/users/${loggedInUser._id}/books`
        );
        setBooks(booksResponse.data);
        console.log("Books state in render:", books);
        console.log("booksResponse.data", booksResponse.data);
      } catch (error) {
        console.error("Error fetching user or books:", error);
      }
    };

    fetchUserAndBooks();
  }, []);

  return (
    <>
      <div>
        <h1>{user ? `${user.name}'s Books` : "My Books"}</h1>
      </div>

      <div className="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col items-start justify-start w-full h-full">
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

          {/* Book grid */}
          <div className="m-4 mr-8 w-11/12">
            {/* Dynamic Book Entries */}
            {books.length > 0 &&
              books.map((book) => (
                <div key={book._id._id} className="grid grid-cols-8 grid-rows-2 gap-4 mb-4">
                  <div className="col-span-1 row-span-2">
                    <img
                      src={book._id.cover}
                      alt={`Cover of ${book._id.title}`}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Book title */}
                  <div className="col-span-4 row-span-1">
                    <h1 className="font-bold">{book._id.title}</h1>
                  </div>

                  {/* Book location */}
                  <div className="col-span-2 row-span-2 flex items-center justify-center flex-wrap">
                    <div className="badge badge-primary badge-lg">at my home</div>
                    <p>OR (conditional rendering)</p>
                    <div className="badge badge-primary badge-lg">borrowed by username</div>
                  </div>

                  {/* Delete book button */}
                  <div className="col-span-1 row-span-2 flex items-center justify-center">
                    <button className="btn btn-warning btn-xs">Delete book</button>
                  </div>

                  {/* Publisher & year */}
                  <div className="col-span-4 row-span-1 flex items-start justify-evenly flex-col">
                    <div>by {book._id.author}</div>
                    <div>published {book._id.year || "Unknown Year"}</div>
                  </div>
                </div>
              ))}

            {/* Mock Data */}
            <div className="grid grid-cols-8 grid-rows-2 gap-4">
              <div className="col-span-1 row-span-2">
                <img
                  src="https://ia801504.us.archive.org/view_archive.php?archive=/22/items/olcovers562/olcovers562-L.zip&file=5621267-L.jpg"
                  alt="book cover title"
                />
              </div>
              <div className="col-span-4 row-span-1">
                <h1>Book Title</h1>
              </div>
              <div className="col-span-2 row-span-2 flex items-center justify-center flex-wrap">
                <div className="badge badge-primary badge-lg">at my home</div>
                <p>OR (conditional rendering)</p>
                <div className="badge badge-primary badge-lg">borrowed by username</div>
              </div>
              <div className="col-span-1 row-span-2 flex items-center justify-center">
                <button className="btn btn-warning btn-xs">Delete book</button>
              </div>
              <div className="col-span-4 row-span-1 flex items-start justify-evenly flex-col">
                <div>by Author</div>
                <div>published 1999</div>
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
          </ul>
        </div>
      </div>
    </>
  );
};

export default MyBooksPage;
