import { Link } from "react-router-dom";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import axiosInstance from "../axiosIntercepter";

const MyBooksPage = () => {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // Corrected `setSearchTerm` usage
  const [sortOption, setSortOption] = useState(""); // Added sorting state

  useEffect(() => {
    const fetchUserAndBooks = async () => {
      try {
        // Fetch logged-in user info
        const userResponse = await axiosInstance.get("/api/auth/me");
        const loggedInUser = userResponse.data;

        // Fetch user's books
        const booksResponse = await axiosInstance.get(
          `/api/users/${loggedInUser._id}/books`
        );

        console.log("Books Response Data:", booksResponse.data);

        // Ensure API filtering only includes books owned by the user (not borrowed)
        const ownedBooks = booksResponse.data.filter(
          (book) => !book.currentReader || Object.keys(book.currentReader).length === 0
        );

        setBooks(ownedBooks); // Set only owned books
        console.log("Filtered Owned Books:", ownedBooks);
      } catch (error) {
        console.error("Error fetching user or books:", error);
      }
    };

    fetchUserAndBooks();
  }, []);

  // Function to sort books
  const sortBooks = (books) => {
    if (sortOption === "Title") {
      return [...books].sort((a, b) => a._id.title.localeCompare(b._id.title));
    }
    if (sortOption === "Author") {
      return [...books].sort((a, b) =>
        a._id.author.localeCompare(b._id.author)
      );
    }
    if (sortOption === "Year") {
      return [...books].sort((a, b) => (a._id.year || 0) - (b._id.year || 0));
    }
    return books;
  };

  // Function to filter books by search term
  const filterBooks = (books) => {
    return books.filter((book) =>
      book._id.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  // Combine sorting and filtering logic
  const displayedBooks = sortBooks(filterBooks(books));

  return (
    <>
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col items-start justify-start w-full h-full">
          <div className="m-4 flex items-center space-x-4 w-1/2">
            {/* Sort by select */}
            <select
              className="select select-primary max-w-xs"
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
            >
              <option value="" disabled>
                Sort by
              </option>
              <option value="Title">Title</option>
              <option value="Author">Author</option>
              <option value="Year">Year</option>
            </select>

            {/* Search bar */}
            <div className="flex items-center gap-2 flex-grow">
              <label className="input input-bordered border-primary-content bg-primary flex items-center gap-2 text-primary-content focus:bg-accent focus:text-accent-content w-full">
                <Search className="primary-content" size={18} />
                <input
                  name="search"
                  id="search"
                  placeholder="Search for Book"
                  className="grow placeholder-accent"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </label>
            </div>

            {/* Add Book Button */}
            <Link to="/addbook">
              <button className="btn btn-primary">Add a Book</button>
            </Link>

          </div>

          {/* Book grid */}
          <div className="m-4 mr-8 w-11/12">
            {displayedBooks.length > 0 ? (
              displayedBooks.map((book) => (
                <div
                  key={book._id._id}
                  className="grid grid-cols-8 grid-rows-2 gap-4 mb-4"
                >
                  <div className="col-span-1 row-span-2">
                    <img
                      src={book._id?.cover || "https://via.placeholder.com/500?text=No+Cover"}
                      alt={`Cover of ${book._id?.title || "No Title"}`}
                      className="w-full h-full object-cover"
                      onLoad={(e) => {
                        // Check if the image is too small or malformed
                        if (e.target.naturalWidth < 100 || e.target.naturalHeight < 100) {
                          e.target.src = "https://via.placeholder.com/500?text=No+Cover";
                        }
                      }}
                      onError={(e) => {
                        // Fallback to placeholder if image fails to load
                        e.target.src = "https://via.placeholder.com/500?text=No+Cover";
                      }}
                    />
                  </div>

                  {/* Book title */}
                  <div className="col-span-4 row-span-1">
                    <h1 className="font-bold">{book._id.title}</h1>
                  </div>

                  {/* Book location */}
                  <div className="col-span-2 row-span-2 flex items-center justify-center flex-wrap">
                    <div className="badge badge-primary badge-lg">At My Home</div>
                  </div>

                  {/* Delete book button */}
                  <div className="col-span-1 row-span-2 flex items-center justify-center">
                    {/* <button className="btn btn-warning btn-xs">Delete book</button> */}
                  </div>

                  {/* Publisher & year */}
                  <div className="col-span-4 row-span-1 flex items-start justify-evenly flex-col">
                    <div>by {book._id.author}</div>
                    <div>published {book._id.year || "Unknown Year"}</div>
                  </div>
                </div>
              ))
            ) : (
              <p>No books found.</p>
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
                <h1>BOOK REQUESTS</h1>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default MyBooksPage;
