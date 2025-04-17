import Header from '@/components/Header'
import { Navigate, Outlet } from 'react-router'
import { useAuth } from '@/contexts/authContext';
import { SidebarProvider } from '@/components/ui/sidebar';
import Sidebar from '@/components/DashboardSidebar';

function Layout() {
  const { userLoggedIn } = useAuth();
  return (
    <>
      {!userLoggedIn && (<Navigate to={'/login'} replace={true} />)}
      <SidebarProvider>
        <Sidebar />
        <main className="grid h-full w-full">
          <Header />
          <div className='p-2'>
            <Outlet />
          </div>
        </main>
      </SidebarProvider>
    </>
  )
}

export default Layout
