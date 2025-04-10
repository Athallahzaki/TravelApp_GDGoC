import '@/App.css'
import { ThemeProvider } from '@/components/theme-provider'
import Sidebar from '@/components/Sidebar'
import Header from '@/components/Header'
import Home from './pages/dashboard/Home'

function App() {
  return (
    <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
      <Sidebar />
      <main className="grid h-full w-full pl-[300px]">
        <Header />
        <div className='p-2'>
          <Home />
        </div>
      </main>
    </ThemeProvider>
  )
}

export default App
