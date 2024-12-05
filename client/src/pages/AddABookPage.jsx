import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
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
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();

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

  return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="p-4 space-y-4">
          <h1 className="text-primary text-center text-2xl font-bold p-4">Add a Book</h1>

            <div className="grid grid-cols-5 space-y-1 gap-4 items-center">
              <label className="col-span-5 input input-bordered border-primary-content bg-primary flex items-center gap-2 text-primary-content focus:bg-accent focus:text-accent-content  ">
                <Search className="primary-content"  size={18} />
                <input
                name='searchIsbn'
                id="searchIsbn"
                placeholder="Search by ISBN"
                className="grow placeholder-accent" />
              </label>
            </div>

            <div className="grid grid-cols-5 space-y-1 gap-4 items-center">
              <label className="col-span-5 input input-bordered border-primary-content bg-primary flex items-center gap-2 text-primary-content focus:bg-accent focus:text-accent-content">
                <Search className="primary-content"  size={18} />
                <input
                name='searchTitle'
                id="searchTitle"
                placeholder="Search by Title"
                className="grow placeholder-accent" />
              </label>
            </div>

            <div className="grid grid-cols-5 space-y-1 gap-4 items-center">
              <label className="col-span-5 input input-bordered border-primary-content bg-primary flex items-center gap-2 text-primary-content focus:bg-accent focus:text-accent-content">
                <Search className="primary-content"  size={18} />
                <input
                name='searchAuthor'
                id="searchAuthor"
                placeholder="Search by Author"
                className="grow placeholder-accent" />
              </label>
            </div>

            <div className="grid grid-cols-5 space-y-1 gap-4 items-center">
             <p className="col-start-1 col-span-5">or manually add a book by filling the fields below</p>
            </div>


            <form className="p-4 space-y-4" onSubmit={(e) => handleSubmit(e)}>
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