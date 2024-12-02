import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css'
import Layout from './layouts/Layout.jsx';
import ErrorPage from './pages/ErrorPage.jsx';
import HomePage from './pages/HomePage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import SignUp from './pages/SignUpPage.jsx';
import MyFriendsPage from './pages/MyFriendsPage.jsx';
import SharedLibraryPage from './pages/SharedLibraryPage.jsx';
import MyBooksPage from './pages/MyBooksPage.jsx';
import MyBorrowedBooksPage from './pages/MyBorrowedBooksPage.jsx';
import MyLentBooksPage from './pages/MyLentBooksPage.jsx';
import PublicUserProfile from './pages/PublicUserProfile.jsx';
import ProfileSettingsPage from './pages/ProfileSettingsPage.jsx';
import BookDetailPage from './pages/BookDetailPage.jsx';
import ProtectedRoute from './layouts/ProtectedRoute.jsx';





const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
      {
        path: '/login',
        element: <LoginPage />,
      },
      {
        path: '/signup',
        element: <SignUp />,
      },
      {
        path: '/friends',
        element: (
          <ProtectedRoute>
            <MyFriendsPage />
          </ProtectedRoute>
        ),
      },
      {
        path: '/sharedlibrary',
        element: (
          <ProtectedRoute>
            <SharedLibraryPage />
          </ProtectedRoute>
        ),
      },
      {
        path: '/mybooks',
        element: (
          <ProtectedRoute>
            <MyBooksPage />
          </ProtectedRoute>
        ),
      },
      {
        path: '/myborrowedbooks',
        element: (
          <ProtectedRoute>
            <MyBorrowedBooksPage />
          </ProtectedRoute>
        ),
      },
      {
        path: '/mylentbooks',
        element: (
          <ProtectedRoute>
            <MyLentBooksPage />
          </ProtectedRoute>
        ),
      },
      {
        path: '/profile/:userid',
        element: (
          <ProtectedRoute>
            <PublicUserProfile />
          </ProtectedRoute>
        ),
      },
      {
        path: '/settings/:userid',
        element: (
          <ProtectedRoute>
            <ProfileSettingsPage />
          </ProtectedRoute>
        ),
      },
      {
        path: '/book/:bookid',
        element: (
          <ProtectedRoute>
            <BookDetailPage />
          </ProtectedRoute>
        ),
      }
    ],
  },
]);


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
