import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PageCard from '../components/PageCard'

function DriverLoginPage() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('driver@campusride.com')
  const [password, setPassword] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    navigate('/post-ride')
  }

  return (
    <div className="mx-auto flex w-full max-w-xl items-center">
      <PageCard>
        <div className="mb-8 space-y-2">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Driver Login</h1>
          <p className="text-slate-600">
            Sign in to offer a ride and post your trip details for student riders.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <label className="block space-y-2">
            <span className="text-sm font-medium text-slate-700">Email</span>
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="driver@campusride.com"
              className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
              required
            />
          </label>

          <label className="block space-y-2">
            <span className="text-sm font-medium text-slate-700">Password</span>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Enter your password"
              className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
              required
            />
          </label>

          <div className="flex flex-col gap-3 sm:flex-row">
            <button
              type="submit"
              className="flex-1 rounded-full bg-slate-900 px-6 py-3 text-base font-semibold text-white transition hover:bg-slate-700"
            >
              Login as Driver
            </button>
            <button
              type="button"
              onClick={() => navigate('/login')}
              className="rounded-full border border-slate-300 px-6 py-3 text-base font-semibold text-slate-700 transition hover:bg-slate-100"
            >
              Back to Login
            </button>
          </div>
        </form>
      </PageCard>
    </div>
  )
}

export default DriverLoginPage