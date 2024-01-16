import React from 'react'
import ReactDOM from 'react-dom/client'
import SpecialistsPage from './SpecialistsPage.tsx'
import 'bootstrap/dist/css/bootstrap.min.css'
import { createBrowserRouter,  RouterProvider } from 'react-router-dom'
import NavigationBar from './NavigationBar.tsx'
import MainPage from './MainPage.tsx'
import SpecialistPage from './SpecialistPage.tsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainPage />
  },
  {
    path: '/specialists',
    element: <SpecialistsPage />
  },
  {
    path: '/specialists/:specialistId',
    element: <SpecialistPage />
  },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <NavigationBar />
    <RouterProvider router={router} />
  </React.StrictMode>,
)
