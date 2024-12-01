import {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import { LogOut, Users, BookUser, BookPlus, LibraryBig, BookCheck, User, Settings } from 'lucide-react';

const Navbar = () => {

  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'darkTheme';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const handleToggle = (e) => {
    setTheme(e.target.checked ? 'darkTheme' : 'lightTheme');
  };

  return (
<div className="navbar bg-base-100 shadow-md sticky top-0 z-50">
  <div  className="flex-auto">
    <Link to="/" ><img src="LibraryFriendsLogo.svg" alt="LibraryFriendsLogo" height="90vh" width="90vw" /></Link>
  </div>
  <div className="flex-auto gap-6">
    <Link to="/">About us</Link>
    <Link to="/">How it works</Link>
    <Link to="/">Become a Member</Link>
  </div>
  <div className="flex-none gap-4 pr-4">
    <div className="pr-4">
      <label className="flex cursor-pointer gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round">
          <circle cx="12" cy="12" r="5" />
          <path
            d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
        </svg>
        <input onChange={handleToggle} checked={theme === 'darkTheme'} type="checkbox" value="synthwave" className="toggle theme-controller" />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
        </svg>
      </label>
    </div>
    <div>
      <Link to="/login" className="btn btn-primary min-h-10 h-10 px-5">Login</Link>
    </div>
    <div>
      <Link to="/signup" className="btn btn-primary min-h-10 h-10 px-5">Sign up</Link>
    </div>
    {/* <div className="form-control">
      <input type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto" />
    </div> */}
     <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          <img
            alt="Tailwind CSS Navbar component"
            src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
        </div>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-200 rounded-box z-[1] mt-3 w-44 p-2 shadow">
        <li><Link to="/"> <BookCheck color="#f2dd80" size={18} /> My Books</Link></li>
        <li><Link to="/"> <Users color="#f2dd80" size={18} /> My Friends</Link></li>
        <li><Link to="/"> <User color="#f2dd80" size={18} /> My Profile</Link></li>
        <li><Link to="/"> <LibraryBig color="#f2dd80" size={18} /> Shared Library</Link></li>
        <li><Link to="/"> <BookPlus color="#f2dd80" size={18} /> Add a Book</Link></li>
        <li><Link to="/"> <Settings color="#f2dd80" size={18} /> Settings</Link></li>
        <li><Link to="/"> <LogOut color="#f2dd80" size={18} /> Logout</Link></li>
      </ul>
    </div>
  </div>
</div>
  )
}

export default Navbar