import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import axiosInstance from '../axiosIntercepter';

const MyLentBooksPage = () => {
  const [lentBooks, setLentBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchLentBooks = async () => {
      try {
        // Fetch logged-in user info
        const userResponse = await axiosInstance.get('/api/auth/me');
        const loggedInUser = userResponse.data;

        // Fetch all books related to the user
        const booksResponse = await axiosInstance.get(`/api/users/${loggedInUser._id}/books`);
        console.log("Books Response Data:", booksResponse.data);

        // Filter for lent books
        const filteredLentBooks = booksResponse.data.filter((book) => {
          // Ensure `currentReader` exists and is not the logged-in user
          return (
            book.currentReader &&
            book.currentReader._id.toString() !== loggedInUser._id.toString()
          );
        });

        setLentBooks(filteredLentBooks);
        console.log('Filtered Lent Books:', filteredLentBooks);
      } catch (error) {
        console.error('Error fetching lent books:', error);
      }
    };

    fetchLentBooks();
  }, []);


  const filteredBooks = lentBooks.filter((book) =>
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
                      src={book._id.cover || "https://via.placeholder.com/150?text=No+Cover"}
                      alt={`Cover of ${book._id.title || "No Title"}`}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* book title */}
                  <div className="col-span-4 row-span-1">
                    <h1>{book._id.title}</h1>
                  </div>

                  {/* book location */}
                  <div className="col-span-2 row-span-1 flex items-center justify-center flex-wrap">
                    <div className="badge badge-primary badge-lg">
                      Lent To: {book.currentReader?.userName || "Unknown"}
                    </div>
                    <div className="badge badge-primary badge-lg">
                      Owned by: Me
                    </div>
                  </div>

                  {/* delete book button */}
                  <div className="col-span-1 row-span-2 flex items-center justify-center">
                    <button className="btn btn-primary btn-xs">Request back</button>
                  </div>

                  {/* publisher & year */}
                  <div className="col-span-4 row-span-1 flex items-start justify-evenly flex-col">
                    <div>by {book._id.author}</div>
                    <div>published {book._id.year}</div>
                  </div>

                  {/* borrowed since */}
                  <div className="col-span-2 row-span-1 flex items-center justify-center flex-wrap">
                    <div className="badge badge-primary badge-lg">
                      Since: {new Date(book.borrowedDate).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>No lent books found.</p>
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
            htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
          <ul className="menu bg-base-200 text-base-content min-h-full w-60 pt-4 p-2">
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

export default MyLentBooksPage;
