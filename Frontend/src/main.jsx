import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import React from 'react'
// import './index.css'
import App from './App.jsx'
import GetStartedPage from './components/GetStartedPage.jsx'
import AptitudeExam from './components/AptitudeExam.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const router = createBrowserRouter([
  {
    path: '/',
    element: <GetStartedPage />,
  },
  {
    path: '/AptitudeExam',
    element: <AptitudeExam />,
  }
])

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <App />
//   </StrictMode>,
// )
createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
