import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react';


const Footer = () => {
  const currentYear = new Date().getFullYear();


   const [theme, setTheme] = useState(localStorage.getItem('theme') || 'lightTheme');


   useEffect(() => {
     const storedTheme = localStorage.getItem('theme');
     if (storedTheme) {
       setTheme(storedTheme);
     }
   }, []);



  return (
    <footer className="footer bg-base-200 text-base-content p-10 flex items-center">
  <aside className="flex-shrink-0 mr-64">
    <img src={theme === 'darkTheme' ? "../LibraryFriendsLogo.svg" : "../libraryFriends_Logo_lightTheme.svg" } alt="LibraryFriendsLogo" height="150vh" width="150vw" />
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