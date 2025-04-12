import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@/index.css'
import App from '@/App'
import { BrowserRouter, Route, Routes } from 'react-router'
import Home from '@/pages/dashboard/Home'
import DashboardLayout from '@/pages/dashboard/Layout'
import Destination from '@/pages/dashboard/Destination'
import Plan from '@/pages/dashboard/Plan'
import User from '@/pages/dashboard/User'
import Booking from '@/pages/dashboard/Booking'
import Landing from '@/pages/landing/Landing'
import { Toaster } from '@/components/ui/sonner'
import RegisterPreview from '@/pages/auth/Register'
import LoginPreview from '@/pages/auth/Login'
import AuthLayout from '@/pages/auth/Layout'
import { AuthProvider } from '@/contexts/authContext'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<App />}>
            <Route index element={<Landing />} />

            <Route element={<AuthLayout />}>
              <Route path='register' element={<RegisterPreview />} />
              <Route path='login' element={<LoginPreview />} />
            </Route>

            <Route path='dashboard' element={<DashboardLayout />}>
              <Route index element={<Home />} />
              <Route path='destinations' element={<Destination />} />
              <Route path='plans' element={<Plan />} />
              <Route path='users' element={<User />} />
              <Route path='bookings' element={<Booking />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
      
      <Toaster position='top-center' richColors />
    </AuthProvider>
  </StrictMode>,
)
