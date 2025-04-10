import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@/index.css'
import App from '@/App'
import { BrowserRouter, Route, Routes } from 'react-router'
import Home from '@/pages/dashboard/Home'
import Layout from '@/pages/dashboard/Layout'
import Destination from '@/pages/dashboard/Destination'
import Plan from '@/pages/dashboard/Plan'
import User from '@/pages/dashboard/User'
import Booking from '@/pages/dashboard/Booking'
import Landing from '@/pages/landing/Landing'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />}>
          <Route index element={<Landing />} />

          <Route path='dashboard' element={<Layout />}>
            <Route index element={<Home />} />
            <Route path='destinations' element={<Destination />} />
            <Route path='plans' element={<Plan />} />
            <Route path='users' element={<User />} />
            <Route path='bookings' element={<Booking />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
