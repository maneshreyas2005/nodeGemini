import React from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';

import LandingPage from './components/LandingPage.jsx';
import GetStartedPage from './components/GetStartedPage.jsx';
import AptitudeExam from './components/AptitudeExam.jsx';
import SignupForm from './components/SignupForm.jsx';
import LoginForm from './components/LoginForm.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <LandingPage />,
  },
  {
    path: '/signup',
    element: <SignupForm />,
  },
  {
    path: '/login',
    element: <LoginForm />,
  },
  {
    path: '/LoginForm',
    element: <LoginForm />,
  },
  {
    path: '/GetStartedPage',
    element: <GetStartedPage />,
  },
  {
    path: '/AptitudeExam',
    element: <AptitudeExam />,
  },
]);

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
