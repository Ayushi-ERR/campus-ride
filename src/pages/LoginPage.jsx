import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import PageCard from '../components/PageCard'

function LoginPage({ onAddPendingUser, onAddVerifiedUser, verifiedUsers }) {
  const navigate = useNavigate()
  const [email, setEmail] = useState('student@latrobe.edu.au')
  const [password, setPassword] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()

    const normalizedEmail = email.trim().toLowerCase()

    if (normalizedEmail === 'admin@campusride.com') {
      navigate('/admin-dashboard')
      return
    }

    if (verifiedUsers.includes(normalizedEmail)) {
      navigate('/browse-rides')
      return
    }

    if (normalizedEmail.endsWith('.edu') || normalizedEmail.endsWith('.edu.au')) {
      onAddVerifiedUser(normalizedEmail)
      navigate('/browse-rides')
      return
    }

    onAddPendingUser(normalizedEmail)
    navigate('/verification-pending')
  }

  return (
    <div className="mx-auto flex w-full max-w-xl items-center">
      <PageCard>
        <div className="mb-8 space-y-2">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Welcome back</h1>
          <p className="text-slate-600">
            Sign in using your student email to access verified rides around campus.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <label className="block space-y-2">
            <span className="text-sm font-medium text-slate-700">Student email</span>
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@university.edu.au"
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

          <button
            type="submit"
            className="w-full rounded-full bg-slate-900 px-6 py-3 text-base font-semibold text-white transition hover:bg-slate-700"
          >
            Login
          </button>

          <div className="space-y-3 pt-2 text-center text-sm">
            <Link to="/driver-login" className="font-medium text-emerald-700 hover:text-emerald-600">
              Want to offer a ride? Login as Driver
            </Link>
            <p className="text-slate-500">Admin Login uses the same form with admin@campusride.com</p>
          </div>
        </form>
      </PageCard>
    </div>
  )
}

export default LoginPage