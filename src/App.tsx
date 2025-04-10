import { ThemeProvider } from '@/components/theme-provider'
import { Outlet } from 'react-router'

function App() {
  return (
    <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
      <Outlet />
    </ThemeProvider>
  )
}

export default App
