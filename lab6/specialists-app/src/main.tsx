import React from 'react'
import ReactDOM from 'react-dom/client'
import SpecialistsPage from './SpecialistsPage.tsx'
import 'bootstrap/dist/css/bootstrap.min.css'
import { createBrowserRouter,  RouterProvider } from 'react-router-dom'
import NavigationBar from './NavigationBar.tsx'
import MainPage from './MainPage.tsx'
import SpecialistPage from './SpecialistPage.tsx'
import AuthPage from './AuthPage.tsx'
import RegistrationPage from './RegistrationPage.tsx'
import ModeratorRequestsPage from './ModeratorRequestsPage.tsx'
import LogoutPage from './LogoutPage.tsx'
import ServiceRequestsPage from './ServiceRequestsPage.tsx'
import ServiceRequestsPageTable from './ServiceRequestsPageTable.tsx'
import { Provider } from "react-redux";
import { auth_store } from './specialists_store/specialists_store.ts'
import SpecialistsTablePage from './SpecialistsTablePage.tsx'
import SpecialistDetailPage from './SpecialistDetailPage.tsx'
import AppFooter from './components/AppFooter.tsx'

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
    path: '/authorization',
    element: <AuthPage />
  },
  {
    path: '/registration',
    element: <RegistrationPage />
  },
  {
    path: '/moderator_requests',
    element: <ModeratorRequestsPage />
  },
  {
    path: '/specialists/:specialistId',
    element: <SpecialistPage />
  },
  {
    path: '/specialists_table/:specialistId',
    element: <SpecialistDetailPage />
  },
  {
    path: '/specialists_table/add_spec/',
    element: <SpecialistDetailPage />
  },
  {
    path: '/specialists_table',
    element: <SpecialistsTablePage />
  },
  {
    path: '/service_requests/',
    element: <ServiceRequestsPage />
  },
  {
    path: '/service_requests_table/',
    element: <ServiceRequestsPageTable />
  },
  {
    path: '/logout',
    element: <LogoutPage />
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={auth_store}>
      <NavigationBar />
      <RouterProvider router={router} />
      {/* <AppFooter/> */}
    </Provider>
  </React.StrictMode>,
)
