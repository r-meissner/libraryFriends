import { Link } from 'react-router-dom'
import { useState } from 'react'
import { Search } from 'lucide-react'


const AddABookPage = () => {
  return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="p-4 space-y-4">
          <h1 className="text-primary text-center text-2xl font-bold p-4">Add a Book</h1>

            <div className="grid grid-cols-5 space-y-1 gap-4 items-center">
              <label htmlFor="searchIsbn" className="col-span-1 text-primary flex justify-end">Search by ISBN</label>
              <label className="col-span-4 input input-bordered border-primary-content bg-primary flex items-center gap-2 text-primary-content focus:bg-accent focus:text-accent-content">
                <Search className="primary-content"  size={18} />
                <input
                name='searchIsbn'
                id="searchIsbn"
                placeholder="Search by ISBN"
                className="grow" />
              </label>
            </div>

            <div className="grid grid-cols-5 space-y-1 gap-4 items-center">
              <label htmlFor="searchTitle" className="col-span-1 text-primary flex justify-end">Search by Title</label>
              <label className="col-span-4 input input-bordered border-primary-content bg-primary flex items-center gap-2 text-primary-content focus:bg-accent focus:text-accent-content">
                <Search className="primary-content"  size={18} />
                <input
                name='searchTitle'
                id="searchTitle"
                placeholder="Search by Title"
                className="grow" />
              </label>
            </div>

            <div className="grid grid-cols-5 space-y-1 gap-4 items-center">
              <label htmlFor="searchAuthor" className="col-span-1 text-primary flex justify-end">Search by Author</label>
              <label className="col-span-4 input input-bordered border-primary-content bg-primary flex items-center gap-2 text-primary-content focus:bg-accent focus:text-accent-content">
                <Search className="primary-content"  size={18} />
                <input
                name='searchAuthor'
                id="searchAuthor"
                placeholder="Search by Author"
                className="grow" />
              </label>
            </div>

            <div className="grid grid-cols-5 space-y-1 gap-4 items-center">
             <p className="col-start-2 col-span-3">or manually add a book by filling the fields below</p>
            </div>


            <form className="p-4 space-y-4">
            <div className="grid grid-cols-5 space-y-1 gap-4 items-center">
              <input
              name = 'title'
              id="title"
              placeholder="Title"
              className="col-start-2 col-span-4 input input-bordered border-primary-content bg-primary text-primary-content focus:bg-accent focus:text-accent-content" />
            </div>
            <div className="grid grid-cols-5 space-y-1 gap-4 items-center">
              <input
              name = 'author'
              id="author"
              placeholder="Author"
              className="col-start-2 col-span-4 input input-bordered border-primary-content bg-primary text-primary-content focus:bg-accent focus:text-accent-content" />
            </div>
            <div className="grid grid-cols-5 space-y-1 gap-4 items-center">
              <input
              name = 'publisher'
              id="publisher"
              placeholder="Publisher"
              className="col-start-2 col-span-4 input input-bordered border-primary-content bg-primary text-primary-content focus:bg-accent focus:text-accent-content" />
            </div>
            <div className="grid grid-cols-5 space-y-1 gap-4 items-center">
              <input
              name = 'numberOfPages'
              id="numberOfPages"
              placeholder="Number of Pages"
              className="col-start-2 col-span-1 input input-bordered border-primary-content bg-primary text-primary-content focus:bg-accent focus:text-accent-content" />
              <input
              name = 'numberOfEdition'
              id="numberOfEdition"
              placeholder="Number of Edition"
              className="col-start-3 col-span-1 input input-bordered border-primary-content bg-primary text-primary-content focus:bg-accent focus:text-accent-content" />
              <input
              name = 'yearOfPublication'
              id="yearOfPublication"
              placeholder="Year of Publication"
              className="col-start-4 col-span-1 input input-bordered border-primary-content bg-primary text-primary-content focus:bg-accent focus:text-accent-content" />
              <input
              name = 'isbn'
              id="isbn"
              placeholder="ISBN"
              className="col-start-5 col-span-1 input input-bordered border-primary-content bg-primary text-primary-content focus:bg-accent focus:text-accent-content" />
            </div>
            <div className="grid grid-cols-5 space-y-1 gap-4 items-center">
              <input
              name = 'cover'
              id="cover"
              placeholder="Cover"
              className="col-start-2 col-span-4 input input-bordered border-primary-content bg-primary text-primary-content focus:bg-accent focus:text-accent-content" />
            </div>
            <div className="grid grid-cols-5 space-y-1 gap-4 items-center">
              <textarea
              name = 'bookDescription'
              id="bookDescription"
              placeholder="Book Description"
              className="col-start-2 col-span-4 h-48 pt-3 input input-bordered border-primary-content bg-primary text-primary-content focus:bg-accent focus:text-accent-content" />
            </div>
            <div className="flex justify-end mt-4">
              <button  type="submit" className="btn btn-primary">Add Book</button>
            </div>
          </form>
        </div>
      </div>
    )
  }

export default AddABookPage