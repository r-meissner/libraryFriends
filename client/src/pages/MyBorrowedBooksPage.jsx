import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import axiosInstance from '../axiosIntercepter'; // Use the interceptor instance

const MyBorrowedBooksPage = () => {
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const [user, setUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchUserAndBorrowedBooks = async () => {
      try {
        // Fetch logged-in user info
        const userResponse = await axiosInstance.get("/api/auth/me");
        const loggedInUser = userResponse.data;
        setUser(loggedInUser);
        console.log("Logged-in User:", loggedInUser);

        // Fetch user's books
        const booksResponse = await axiosInstance.get(
          `/api/users/${loggedInUser._id}/books`
        );
        console.log("booksResponse.data", booksResponse.data);

        // Filter only borrowed books (where currentReader matches logged-in user)
        const filteredBorrowedBooks = booksResponse.data.filter((book) => {
          console.log("Book currentReader:", book.currentReader);
          return book.currentReader && book.currentReader._id === loggedInUser._id;
        });

        setBorrowedBooks(filteredBorrowedBooks);
        console.log("Filtered Borrowed Books:", filteredBorrowedBooks);
      } catch (error) {
        console.error("Error fetching user or borrowed books:", error);
      }
    };

    fetchUserAndBorrowedBooks();
  }, []);

  const filteredBooks = borrowedBooks.filter((book) =>
    book._id.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
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
                  className="grow placeholder-accent"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </label>
            </div>
          </div>
          {/* book grid */}
          <div className="m-4 mr-8 w-11/12">
            {filteredBooks.length > 0 ? (
              filteredBooks.map((book) => (
                <div key={book._id._id} className="grid grid-cols-8 grid-rows-2 gap-4 mb-6">
                  {/* book cover */}
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

                  {/* book title */}
                  <div className="col-span-4 row-span-1">
                    <h1>{book._id.title}</h1>
                  </div>

                  {/* book owner */}
                  <div className="col-span-3 row-span-1 flex items-center justify-center flex-wrap">
                    <div className="badge badge-primary badge-lg">
                      owned by {book.owner?.userName || "Unknown"}
                    </div>
                  </div>

                  {/* publisher & year */}
                  <div className="col-span-4 row-span-1 flex items-start justify-evenly flex-col">
                    <div>by {book._id.author}</div>
                    <div>published {book._id.year}</div>
                  </div>

                  {/* borrowed since and return date */}
                  <div className="col-start-6 col-span-3 row-span-2 flex flex-col items-center justify-center flex-wrap">
                    <div className="badge badge-primary badge-lg mb-1">
                      borrowed since {new Date(book.borrowedDate).toLocaleDateString()}
                    </div>
                    <div className="badge badge-primary badge-lg">
                      return date {new Date(book.returnDate).toLocaleDateString()}
                    </div>
                  </div>

                </div>
              ))
            ) : (
              <p>No borrowed books found.</p>
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
          </ul>
        </div>
      </div>
    </>
  );
};

export default MyBorrowedBooksPage;