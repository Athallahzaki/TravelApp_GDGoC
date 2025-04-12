import { useAuth } from '@/contexts/authContext';
import { Navigate, Outlet } from 'react-router'

function Layout() {
  const { userLoggedIn } = useAuth();
  return (
    <div className="flex min-h-screen min-w-screen items-center justify-center bg-gradient-to-br from-blue-100 to-blue-400">
      {userLoggedIn && (<Navigate to={'/dashboard'} replace={true} />)}
      <div className="w-full max-w-md p-8 bg-primary-foreground rounded-2xl shadow-xl">
        {/* Branding */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold">TravelApp</h1>
          <p className="text-muted-foreground">Your gateway to an amazing experience</p>
        </div>

        {/* Login/Register Content */}
        <Outlet />

        {/* Footer */}
        <div className="text-center mt-6">
          <p className="text-sm text-muted-foreground">
            © 2025 TravelApp. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Layout
