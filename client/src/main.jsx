import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider, createRoutesFromElements, Route, Outlet } from 'react-router-dom';
import './index.css'
import Layout from './layouts/Layout.jsx';
import ErrorPage from './pages/ErrorPage.jsx';
import HomePage from './pages/HomePage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import SignUpPage from './pages/SignUpPage.jsx';
import MyFriendsPage from './pages/MyFriendsPage.jsx';
import SharedLibraryPage from './pages/SharedLibraryPage.jsx';
import MyBooksPage from './pages/MyBooksPage.jsx';
import MyBorrowedBooksPage from './pages/MyBorrowedBooksPage.jsx';
import MyLentBooksPage from './pages/MyLentBooksPage.jsx';
import PublicUserProfile from './pages/PublicUserProfile.jsx';
import ProfileSettingsPage from './pages/ProfileSettingsPage.jsx';
import BookDetailPage from './pages/BookDetailPage.jsx';
import ProtectedRoute from './layouts/ProtectedRoute.jsx';
import AddABookPage from './pages/AddABookPage.jsx';
import IncomingFriendRequestPage from './pages/IncomingFriendRequestPage.jsx';
import OutgoingFriendRequestPage from './pages/OutgoingFriendRequestPage.jsx';


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout />} errorElement={<ErrorPage />}>
      <Route element={<Outlet />} errorElement={<ErrorPage />}>
        <Route index element={<HomePage />} />
        <Route path='login' element={<LoginPage />} />
        <Route path='signup' element={<SignUpPage />} />
        <Route element={<ProtectedRoute />} errorElement={<ErrorPage />}>
          <Route path='mybooks' element={<MyBooksPage />} />
          <Route path='friends' element={<MyFriendsPage />} />
          <Route path='incomingfriendrequests' element={<IncomingFriendRequestPage />} />
          <Route path='outgoingfriendrequests' element={<OutgoingFriendRequestPage />} />
          <Route path='sharedlibrary' element={<SharedLibraryPage />} />
          <Route path='myborrowedbooks' element={<MyBorrowedBooksPage />} />
          <Route path='mylentbooks' element={<MyLentBooksPage />} />
          <Route path='profile/:userid' element={<PublicUserProfile />} />
          <Route path='settings/:userid' element={<ProfileSettingsPage />} />
          <Route path='addbook' element={<AddABookPage />} />
          <Route path='book/:bookid' element={<BookDetailPage />} />
        </Route>
      </Route>
    </Route>,
  ),
);


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
