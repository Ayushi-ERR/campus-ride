import { useNavigate } from 'react-router-dom'
import PageCard from '../components/PageCard'

function VerificationPendingPage({ pendingEmail }) {
  const navigate = useNavigate()

  return (
    <div className="mx-auto flex w-full max-w-2xl items-center">
      <PageCard>
        <div className="space-y-6 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-amber-100 text-3xl">
            ⏳
          </div>
          <div className="space-y-3">
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">Verification Pending</h1>
            <p className="text-slate-600">
              We are reviewing your email domain to confirm student access. Once verified, you’ll be able to browse and book rides safely.
            </p>
            {pendingEmail && (
              <p className="rounded-2xl bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700">
                Request submitted for: {pendingEmail}
              </p>
            )}
          </div>
          <div className="flex flex-col justify-center gap-3 sm:flex-row">
            <button
              type="button"
              onClick={() => navigate('/login')}
              className="rounded-full border border-slate-300 px-6 py-3 font-semibold text-slate-700 transition hover:bg-slate-100"
            >
              Back to Login
            </button>
            <button
              type="button"
              onClick={() => navigate('/')}
              className="rounded-full bg-emerald-600 px-6 py-3 font-semibold text-white transition hover:bg-emerald-500"
            >
              Return to Home
            </button>
          </div>
        </div>
      </PageCard>
    </div>
  )
}

export default VerificationPendingPage