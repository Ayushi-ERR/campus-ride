import { Outlet } from 'react-router-dom'
import Header from './Header'

function AppLayout() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <Header />
      <main className="mx-auto flex min-h-[calc(100vh-88px)] w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Outlet />
      </main>
    </div>
  )
}

export default AppLayout