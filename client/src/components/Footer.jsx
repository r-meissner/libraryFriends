import { Link } from 'react-router-dom'

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer bg-base-200 text-base-content p-10 flex items-center">
  <aside className="flex-shrink-0 mr-64">
    <img src="LibraryFriendsLogo.svg" alt="LibraryFriendsLogo" height="150vh" width="150vw" />
  </aside>
  <div className="flex flex-grow justify-start space-x-32">
    <nav className="flex flex-col justify-center space-y-2">
      <Link to="/login" className="link link-hover">Login</Link>
      <Link to="/signup" className="link link-hover">Register</Link>
      <Link to="/" className="link link-hover">How it works</Link>

    </nav>
    <nav className="flex flex-col justify-center space-y-2">
      <Link to="/" className="link link-hover">About us</Link>
      <Link to="/" className="link link-hover">Contact</Link>
      <a target="_blank" rel="noopener noreferrer" href="https://openlibrary.org/" className="link link-hover">OpenLibrary API</a>

    </nav>
    <nav className="flex flex-col justify-center space-y-2">
      <Link to="/" className="link link-hover">Imprint</Link>
      <Link to="/" className="link link-hover">GDPR</Link>
      <p>© {currentYear} LibraryFriends.</p>
    </nav>
  </div>
</footer>
  )
}

export default Footer