import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'

export default function Layout() {
  return (
    <div className="min-h-screen bg-[hsl(var(--color-background))]">
      <Navbar />
      <main className="pt-0">
        <Outlet />
      </main>
    </div>
  )
}
