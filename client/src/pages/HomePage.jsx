import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <main className="flex flex-col items-center w-full">
    {/* Title Section */}
    <section className="bg-base-200 w-full py-16 text-center">
      <h1 className="text-4xl font-bold mb-4">Welcome to LibraryFriends</h1>
      <p className="text-lg max-w-2xl mx-auto">
        LibraryFriends is an online community dedicated to connecting book lovers, promoting reading, and sharing knowledge. Whether you're looking for your next favorite book or a group of people to discuss it with, we're here to make that happen.
      </p>
    </section>

    {/* First "What We Do" Section */}
    <section className="flex flex-col lg:flex-row items-center justify-center py-16 gap-8 w-11/12">
      <div className="w-48 flex justify-center items-center">
        <img src="libraryFriends-favicon.svg" alt="libraryFriends favicon"/>
      </div>
      <div className="max-w-xl text-center lg:text-left">
        <h2 className="text-3xl font-bold mb-4">Discover New Books</h2>
        <p>
          At LibraryFriends, we provide a platform for book recommendations and reviews, helping you find your next great read. From classic literature to contemporary bestsellers, our community shares their thoughts and insights on a wide range of books.
        </p>
      </div>
    </section>

    {/* Second "What We Do" Section */}
    <section className=" bg-base-200 w-full flex flex-col-reverse lg:flex-row items-center justify-center py-16 gap-8">
      <div className="max-w-xl text-center lg:text-left">
        <h2 className="text-3xl font-bold mb-4">Join the Community</h2>
        <p>
          LibraryFriends isn't just a place to find books — it's a place to connect with fellow readers, share thoughts, and engage in meaningful conversations. Join our growing community of book enthusiasts and start sharing your love for reading today!
        </p>
      </div>
      <div className="flex flex-col gap-4">
        <Link to="/signup" className="btn btn-primary">Register</Link>
        <Link to="/login" className="btn btn-secondary">Login</Link>
      </div>
    </section>
  </main>
)};


export default HomePage