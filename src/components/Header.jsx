import { Link } from 'react-router-dom'

function Header() {
  return (
    <header className="border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-5 sm:px-6 lg:px-8">
        <Link to="/" className="flex flex-col">
          <span className="text-2xl font-bold tracking-tight text-slate-900">CampusRide</span>
          <span className="text-sm font-medium text-emerald-600">Verified Student Carpool</span>
        </Link>
        <div className="hidden rounded-full bg-emerald-50 px-4 py-2 text-sm font-medium text-emerald-700 sm:block">
          Safe, affordable rides for students
        </div>
      </div>
    </header>
  )
}

export default Header