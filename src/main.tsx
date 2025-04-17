import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@/index.css'
import App from '@/App'
import { createBrowserRouter, RouterProvider } from 'react-router'
import Home from '@/pages/dashboard/Home'
import DashboardLayout from '@/pages/dashboard/Layout'
import Destination from '@/pages/dashboard/destination'
import ModifyDestination from '@/pages/dashboard/destination/modify'
import Plan from '@/pages/dashboard/plan'
import ModifyPlan from '@/pages/dashboard/plan/modify'
import User from '@/pages/dashboard/User'
import Booking from '@/pages/dashboard/Booking'
import Landing from '@/pages/landing/Landing'
import { Toaster } from '@/components/ui/sonner'
import RegisterPreview from '@/pages/auth/Register'
import LoginPreview from '@/pages/auth/Login'
import AuthLayout from '@/pages/auth/Layout'
import { AuthProvider } from '@/contexts/authContext'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { DialogManager } from '@/components/AlertDialog'

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Landing /> },
      {
        path: '',
        element: <AuthLayout />,
        children: [
          { path: 'register', element: <RegisterPreview /> },
          { path: 'login', element: <LoginPreview /> },
        ],
      },
      {
        path: 'dashboard',
        element: <DashboardLayout />,
        children: [
          { index: true, element: <Home /> },
          {
            path: 'destinations',
            children: [
              {index: true, element: <Destination />},
              {
                path: 'edit/:editId',
                element: <ModifyDestination />
              },
              {
                path: 'add',
                element: <ModifyDestination />
              },
            ]
          },
          {
            path: 'plans',
            children: [
              {index: true, element: <Plan />},
              {
                path: 'edit/:editId',
                element: <ModifyPlan />
              },
              {
                path: 'add',
                element: <ModifyPlan />
              },
            ]
          },
          { 
            path: 'users', 
            element: <User /> 
          },
          { 
            path: 'bookings', 
            element: <Booking /> 
          },
        ],
      },
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
      </QueryClientProvider>
      
      <DialogManager />
      <Toaster position='top-center' richColors />
    </AuthProvider>
  </StrictMode>,
)
