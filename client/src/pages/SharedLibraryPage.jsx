import { Search } from "lucide-react";
import { useState, useEffect } from "react";
import { useAuth } from '../context'
import { getSharedBooks } from "../data/users";

const SharedLibraryPage = () => {
  const [books, setBooks] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    let ignore = false;
    const getBooks = async () => {
      try {
        const data = await getSharedBooks(user._id);
        console.log(data);
        if (!ignore) {
          setBooks(data)
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
        books.map((book) => {
          return (
            <div className="grid grid-cols-8 grid-rows-2 gap-4 m-4">
            {/* book cover */}
            <div className="col-span-1 row-span-2">
              <img src={book._id.cover} alt={book._id.title} />
              </div>

            {/* book title */}
            <div className="col-span-2 row-span-1">
              <h1 className="text-xl">{book._id.title}</h1>
            </div>

            {/* location of book */}
            {book.owner && <div className="col-span-2 row-span-2 flex items-center justify-center flex-wrap">
              <div className="badge badge-primary badge-lg">
                {book.owner._id===user._id ? 'owned by you':`owned by ${book.owner.userName}`}
              </div>
              </div>}

            {/* availability */}
            <div className="col-span-2 row-span-2 flex items-center justify-center flex-wrap">
              {book.currentReader ? (
                <div className="badge badge-primary badge-lg">not available</div>
              ) : (
                <div className="badge badge-primary badge-lg">
                  available
                </div>
              )}
            </div>

            {/* request book button */}
            
            {book.owner?._id!==user._id && 
            <div className="col-span-1 row-span-2 flex items-center justify-center">
              <button className="btn btn-primary btn-xs">Request book</button>
            </div>}
            {/* publisher & year */}
            <div className="col-start-2 col-span-2 row-span-1 flex items-start justify-evenly flex-col">
              <div>{`by ${book._id.author}`}</div>
              <div>{book.id_year? book._id.year.substring(0,4):""}</div>
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
