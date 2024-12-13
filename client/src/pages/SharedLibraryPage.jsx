import { Search } from "lucide-react";
import { useState, useEffect } from "react";
import { useAuth } from '../context'
import { getSharedBooks } from "../data/users";
import { createBookRequest, fetchBookRequestsOfUser } from "../data/bookRequests";

const SharedLibraryPage = () => {
  const [books, setBooks] = useState([]);
  const [requests, setRequests] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    let ignore = false;
    const getBooks = async () => {
      try {
        const sharedBooks = await getSharedBooks(user._id);
        const requestedBooks = await fetchBookRequestsOfUser(user._id);
        const onlyRequestedBooks = requestedBooks.sentRequests.map(request => request.book._id)
        console.log(sharedBooks);
        if (!ignore) {
          setBooks(sharedBooks)
          setRequests(onlyRequestedBooks)
        }
      } catch (error) {
        console.log("Error fetching books", error)
      }
    }
    getBooks();

    return () => {
      ignore = true;
    }
  }, [])
  
  const handleRequest = async (targetBook) => {
    const requestBody = {
      owner: targetBook.owner,
      book: targetBook._id._id,
      requestingUser: user._id,
      status: "open"
    }
    const res = await createBookRequest(requestBody, user._id);
    setRequests([...requests, targetBook._id._id])
    console.log(res);
  }

  return (
    <div>
      {/* <div className="m-4 flex items-center space-x-4 w-1/2"> */}
      {/* sort by select */}
      {/* <select className="select select-primary max-w-xs">
              <option disabled selected>
                sort by
              </option>
              <option>Title</option>
              <option>Author</option>
              <option>Year</option>
            </select>*/}
      {/* search bar */}
      {/* <div className="flex items-center gap-2 flex-grow">
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
          </div> */}

      {/* book grid*/}
      <div className="m-4 mr-8 w-11/12">
      {
        books.map((book, index) => {
          return (
            <div key={index} className="grid grid-cols-8 grid-rows-2 gap-4 m-4">
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
            <div className="col-span-2 row-span-1">
              <h1 className="text-xl">{book._id.title}</h1>
            </div>

            {/* location of book */}
            {book.owner && <div className="col-start-4 col-span-2 row-span-2 flex items-center justify-center flex-wrap">
              <div className="badge badge-primary badge-lg">
                {book.owner._id===user._id ? 'owned by you':`owned by ${book.owner.userName}`}
              </div>
              </div>}

            {/* availability */}
            <div className="col-start-6 col-span-2 row-span-2 flex items-center justify-center flex-wrap">
              {book.currentReader ? (
                <div className="badge badge-primary badge-lg">not available</div>
              ) : (
                <div className="badge badge-primary badge-lg">
                  available
                </div>
              )}
            </div>

            {/* request book button */}
            
            {book.owner?._id !== user._id && (
                  <div className="col-start-8 col-span-1 row-span-2 flex items-center justify-center">
                    {!requests.includes(book._id._id) ? (
                      <button className="btn btn-primary btn-xs" onClick={() => handleRequest(book)}>Request book</button>
                    ) : (
                      <button className="btn btn-primary btn-xs" disabled>Requested</button>
                    )}
                  </div>
                )}
            {/* publisher & year */}
            <div className="col-start-2 col-span-2 row-span-1 flex items-start justify-evenly flex-col">
              <div>{`by ${book._id.author}`}</div>
              <div>{book._id.year.substring(0, 4)}</div>
            </div>
          </div>
          )
        })
      }
      </div>
    </div>
  );
};

export default SharedLibraryPage;
