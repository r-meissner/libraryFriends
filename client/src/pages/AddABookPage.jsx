import { Link, useNavigate } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
import { Search } from 'lucide-react'
import { createBook } from '../data/books';
import { addBookToUser } from '../data/users';
import { useAuth } from '../context';


const AddABookPage = () => {
  const [ book, setBook ] = useState({
    title: "",
    author: "",
    isbn: "",
    publisher: "",
    pages: null,
    edition: "",
    year: "",
    description: "",
    cover: "",
  });
  const [authorQuery, setAuthorQuery] = useState("");
  const [titleQuery, setTitleQuery] = useState("");
  const [isbnQuery, setIsbnQuery] = useState("");
  const [authorResults, setAuthorResults] = useState("");
  const [titleResults, setTitleResults] = useState("");
  const [isbnResults, setIsbnResults] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();
  const formRef = useRef(null);

  useEffect(() => {
    let ignore = false;
    const getSearchResults = async () => {
      try {
        const res = await fetch(constructUrl(titleQuery,authorQuery,isbnQuery));
        const data = await res.json()
        //console.log(data.items)
        if (!ignore) {
          if (data.items && data.items.length > 0) {
            if (authorQuery) {
              setAuthorResults(data.items);
            } else if (titleQuery) {
              setTitleResults(data.items);
            } else if (isbnQuery) {
              setIsbnResults(data.items);
            }
          } else {
            setAuthorResults([]);
            setTitleResults([]);
            setIsbnResults([]);
          }
        }
      } catch (error) {
        console.log("Error searching:", error)
      }
    }

    if (authorQuery.length>=3||titleQuery.length>=3||isbnQuery.length>=10) {
      getSearchResults();
    }

    return () => {
      ignore = true;
    }
  }, [authorQuery, titleQuery, isbnQuery])
  
  //put the search params into the URL correctly (see Google Books API docs)
  const constructUrl = (title, author, isbn) => {
    const baseUrl = import.meta.env.VITE_BOOKS_API_URL;
    const urlEnd =`&printType=books&key=${import.meta.env.VITE_BOOKS_API_KEY}`;
    if (title) {
      const newUrl = `${baseUrl}q=intitle:${prepareQuery(title)}${urlEnd}`;
      return newUrl;
    } else if (author){
      const newUrl = `${baseUrl}q=inauthor:${prepareQuery(author)}${urlEnd}`;
      return newUrl;
    } else if (isbn){
      const newUrl = `${baseUrl}q=isbn:${isbn}${urlEnd}`;
      return newUrl;
    }
  }

  const prepareQuery = (query) => {
    const newQuery = query.split(" ").join("+");
    return newQuery
  }

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setBook({ ...book, [name]: value });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      if (!book.title || !book.author || !book.isbn || !book.publisher || !book.year || !book.pages) throw new Error('Only description, edition and cover can be empty');
      setLoading(true);
      const newBook = await createBook(book);
      const owner = await addBookToUser({
        bookId: newBook._id,
        owner: user._id
      }, user._id);
      console.log(owner);
      //setForm({ title: '', author: '', image: '', content: '' });
      navigate(`/book/${newBook._id}`);
    } catch (error) {
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleQueryChange = (e) => {
    const { name, value } = e.target;
    if (name === 'authorQuery') {
      setAuthorQuery(value);
      setAuthorResults([]);
    } else if (name === 'titleQuery') {
      setTitleQuery(value);
      setTitleResults([]);
    } else if (name === 'isbnQuery') {
      setIsbnQuery(value);
      setIsbnResults([]);
    }
  };

  const handleResultClick = (result) => {
    setBook({
      title: result.volumeInfo.title,
      author: result.volumeInfo.authors ? result.volumeInfo.authors.join(", ") : "Unknown Author",
      isbn: result.volumeInfo.industryIdentifiers ? result.volumeInfo.industryIdentifiers[0].identifier : "",
      publisher: result.volumeInfo.publisher || "",
      pages: result.volumeInfo.pageCount || null,
      edition: result.volumeInfo.edition || "",
      year: result.volumeInfo.publishedDate || "",
      description: result.volumeInfo.description || "",
      cover: result.volumeInfo.industryIdentifiers ? `https://covers.openlibrary.org/b/isbn/${result.volumeInfo.industryIdentifiers[0].identifier}-M.jpg` : "",
    });
    formRef.current.scrollIntoView({ behavior: 'smooth' });
    setAuthorResults([]);
    setTitleResults([]);
    setIsbnResults([]);
  };

  return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="p-4 space-y-4">
          <h1 className="text-primary text-center text-2xl font-bold p-4">Add a Book</h1>

            <div className="grid grid-cols-5 space-y-1 gap-4 items-center">
              <label className="col-span-5 input input-bordered border-primary-content bg-primary flex items-center gap-2 text-primary-content focus:bg-accent focus:text-accent-content  ">
                <Search className="primary-content"  size={18} />
                <input
                name='isbnQuery'
                id="searchIsbn"
                value={isbnQuery}
                onChange={(e) => handleQueryChange(e)}
                placeholder="Search by ISBN"
                className="grow placeholder-accent" />
              </label>
            </div>
             {isbnResults.length > 0 && (
              <div className="relative">
                <ul className="absolute z-50 bg-primary border border-primary-content text-primary-content shadow-lg rounded-lg">
                  {isbnResults.map((result, index) => (
                    <li
                      key={index}
                      className="cursor-pointer p-2 hover:bg-accent hover:text-accent-content"
                      onClick={() => handleResultClick(result)}
                    >
                      <strong>{result.volumeInfo.title}</strong>
                      <p className="text-sm">{result.volumeInfo.authors?result.volumeInfo.authors.join(", "):"Unknown Author"}</p>
                    </li>
                  ))}
                </ul>
              </div>
            )} 
            <div className="grid grid-cols-5 space-y-1 gap-4 items-center">
              <label className="col-span-5 input input-bordered border-primary-content bg-primary flex items-center gap-2 text-primary-content focus:bg-accent focus:text-accent-content">
                <Search className="primary-content"  size={18} />
                <input
                name='titleQuery'
                id="searchTitle"
                value={titleQuery}
                onChange={(e) => handleQueryChange(e)}
                placeholder="Search by Title"
                className="grow placeholder-accent" />
              </label>
            </div>
            {titleResults.length > 0 && (
              <div className="relative">
                <ul className="absolute z-50 bg-primary border border-primary-content text-primary-content shadow-lg rounded-lg">
                  {titleResults.map((result, index) => (
                    <li
                      key={index}
                      className="cursor-pointer p-2 hover:bg-accent hover:text-accent-content"
                      onClick={() => handleResultClick(result)}
                    >
                      <strong>{result.volumeInfo.title}</strong>
                      <p className="text-sm">{result.volumeInfo.authors?result.volumeInfo.authors.join(", "):"Unknown Author"}</p>
                    </li>
                  ))}
                </ul>
              </div>
            )} 
            <div className="grid grid-cols-5 space-y-1 gap-4 items-center">
              <label className="col-span-5 input input-bordered border-primary-content bg-primary flex items-center gap-2 text-primary-content focus:bg-accent focus:text-accent-content">
                <Search className="primary-content"  size={18} />
                <input
                name='authorQuery'
                id="searchAuthor"
                value={authorQuery}
                onChange={(e) => handleQueryChange(e)}
                placeholder="Search by Author"
                className="grow placeholder-accent" />
              </label>
            </div>
            {authorResults.length > 0 && (
              <div className="relative">
                <ul className="absolute z-50 bg-primary border border-primary-content text-primary-content shadow-lg rounded-lg">
                  {authorResults.map((result, index) => (
                    <li
                      key={index}
                      className="cursor-pointer p-2 hover:bg-accent hover:text-accent-content"
                      onClick={() => handleResultClick(result)}
                    >
                      <strong>{result.volumeInfo.title}</strong>
                      <p className="text-sm">{result.volumeInfo.authors[0]}</p>
                    </li>
                  ))}
                </ul>
              </div>
            )} 
            <div className="grid grid-cols-5 space-y-1 gap-4 items-center">
             <p className="col-start-1 col-span-5">or manually add a book by filling the fields below</p>
            </div>


            <form className="p-4 space-y-4" onSubmit={(e) => handleSubmit(e)} ref={formRef}>
            <div className="grid grid-cols-5 space-y-1 gap-4 items-center">
              <input
              name = 'title'
              id="title"
              value={book.title}
              placeholder="Title"
              onChange={(e) => handleFormChange(e)}
              className="col-start-1 col-span-5 input input-bordered border-primary-content bg-primary text-primary-content focus:bg-accent focus:text-accent-content placeholder-accent" />
            </div>
            <div className="grid grid-cols-5 space-y-1 gap-4 items-center">
              <input
              name = 'author'
              id="author"
              value={book.author}
              placeholder="Author"
              onChange={(e) => handleFormChange(e)}
              className="col-start-1 col-span-5 input input-bordered border-primary-content bg-primary text-primary-content focus:bg-accent focus:text-accent-content placeholder-accent" />
            </div>
            <div className="grid grid-cols-5 space-y-1 gap-4 items-center">
              <input
              name = 'publisher'
              id="publisher"
              value={book.publisher}
              placeholder="Publisher"
              onChange={(e) => handleFormChange(e)}
              className="col-start-1 col-span-5 input input-bordered border-primary-content bg-primary text-primary-content focus:bg-accent focus:text-accent-content placeholder-accent" />
            </div>
            <div className="grid grid-cols-5 space-y-1 gap-4 items-center">
              <input
              name = 'pages'
              id="numberOfPages"
              value={book.pages}
              placeholder="Number of Pages"
              onChange={(e) => handleFormChange(e)}
              className="col-start-1 col-span-1 input input-bordered border-primary-content bg-primary text-primary-content focus:bg-accent focus:text-accent-content placeholder-accent" />
              <input
              name = 'edition'
              id="numberOfEdition"
              value={book.edition}
              placeholder="Number of Edition"
              onChange={(e) => handleFormChange(e)}
              className="col-start-2 col-span-1 input input-bordered border-primary-content bg-primary text-primary-content focus:bg-accent focus:text-accent-content placeholder-accent" />
              <input
              name = 'year'
              id="yearOfPublication"
              value={book.year}
              placeholder="Year of Publication"
              onChange={(e) => handleFormChange(e)}
              className="col-start-3 col-span-1 input input-bordered border-primary-content bg-primary text-primary-content focus:bg-accent focus:text-accent-content placeholder-accent" />
              <input
              name = 'isbn'
              id="isbn"
              value={book.isbn}
              placeholder="ISBN"
              onChange={(e) => handleFormChange(e)}
              className="col-start-4 col-span-2 input input-bordered border-primary-content bg-primary text-primary-content focus:bg-accent focus:text-accent-content placeholder-accent" />
            </div>
            <div className="grid grid-cols-5 space-y-1 gap-4 items-center">
              <input
              name = 'cover'
              id="cover"
              value={book.cover}
              placeholder="Cover"
              onChange={(e) => handleFormChange(e)}
              className="col-start-1 col-span-5 input input-bordered border-primary-content bg-primary text-primary-content focus:bg-accent focus:text-accent-content placeholder-accent" />
            </div>
            <div className="grid grid-cols-5 space-y-1 gap-4 items-center">
              <textarea
              name = 'description'
              id="bookDescription"
              value={book.description}
              placeholder="Book Description"
              onChange={(e) => handleFormChange(e)}
              className="col-start-1 col-span-5 h-48 pt-3 input input-bordered border-primary-content bg-primary text-primary-content focus:bg-accent focus:text-accent-content placeholder-accent" />
            </div>
            <div className="flex justify-end mt-4">
              <button  type="submit" disabled={loading} className="btn btn-primary">Add Book</button>
            </div>
          </form>
        </div>
      </div>
    )
  }

export default AddABookPage