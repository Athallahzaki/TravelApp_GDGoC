import { useAuth } from '@/contexts/authContext';
import { Navigate, Outlet } from 'react-router'

function Layout() {
  const { userLoggedIn } = useAuth();
  return (
    <div className="flex min-h-screen min-w-screen items-center justify-center bg-radial from-zinc-50 to-slate-300 dark:from-slate-500 dark:to-zinc-700">
      {userLoggedIn && (<Navigate to={'/dashboard'} replace={true} />)}
      <div className="w-full max-w-md p-8 bg-primary-foreground/75 backdrop-blur-2xl rounded-2xl shadow-2xl">
        {/* Branding */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-black">Trabook</h1>
          <p className="text-muted-foreground">Your gateway to an amazing experience</p>
        </div>

        {/* Login/Register Content */}
        <Outlet />

        {/* Footer */}
        <div className="text-center mt-6">
          <p className="text-sm text-muted-foreground">
            © 2023 Trabook. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Layout
