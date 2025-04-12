import Sidebar from '@/components/Sidebar'
import Header from '@/components/Header'
import { Navigate, Outlet } from 'react-router'
import { useAuth } from '@/contexts/authContext';

function Layout() {
  const { userLoggedIn } = useAuth();
  return (
    <>
      {!userLoggedIn && (<Navigate to={'/login'} replace={true} />)}
      <Sidebar />
      <main className="grid h-full w-full pl-[300px]">
        <Header />
        <div className='p-2'>
          <Outlet />
        </div>
      </main>
    </>
  )
}

export default Layout
