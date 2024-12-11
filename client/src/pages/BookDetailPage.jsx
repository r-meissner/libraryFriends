import { Link, useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { getBookById } from '../data/books';


const BookDetailPage = () => {
  const [book, setBook] = useState({});
  const {bookid} = useParams();

  useEffect(() => {
    let ignore = false;
    const getBook = async () => {
      const bookData = await getBookById(bookid);
      console.log(bookData);
      if (!ignore) {
        setBook(bookData);
      }
    }
    getBook();
  
    return () => {
      ignore = true;
    }
  }, [])
  

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
          <div className="grid grid-cols-4 gap-2 m-4">
            <div className="col-span-1 row-span-8">
              <img
              src={book.cover} alt={book.title}
              className="h-64 w-auto object-cover" />
            </div>
            <div className="col-start-2 col-span-3 row-span-2">
              <h1 className="text-3xl font-bold">
                {book.title}
              </h1>
            </div>
            <div className="col-start-2 col-span-3">
              <p className="text-xl">
                {book.author ? `by ${book.author}` : 'by Unknown Author'}
              </p>
            </div>
            <div className="col-start-2 col-span-3">
              <p>
                {book.year ? book.year.substring(0, 4) : ""}
              </p>
            </div>
            <div className="col-start-2 col-span-3">
              <p>
                {book.publisher ? `published by ${book.publisher}`: ""}
              </p>
            </div>
            <div className="col-start-2 col-span-3">
              <p>
                {book.edition ? `${book.edition}` : ""}
              </p>
            </div>
            <div className="col-start-2 col-span-3">
              <p>
                {book.pages? `${book.pages} pages` : ""}
              </p>
            </div>
            <div className="col-start-2 col-span-3">
              <p>
                {`ISBN: ${book.isbn}`}
              </p>
            </div>

          </div>
          <p className="leading-loose ml-3 mr-8 my-8 p-2 text-ellipsis overflow-hidden h-96 overflow-y-auto">
          {book.description? `${book.description}` : 'This book defies description. What a mystery!'}
          </p>
          
          

      </div>

    </div>
  )
}

export default BookDetailPage