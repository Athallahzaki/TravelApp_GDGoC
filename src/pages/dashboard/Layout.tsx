import Sidebar from '@/components/Sidebar'
import Header from '@/components/Header'
import { Outlet } from 'react-router'

function Layout() {
  return (
    <>
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
