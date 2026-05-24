import { useNavigate } from 'react-router-dom'
import PageCard from '../components/PageCard'

function StatCard({ label, value }) {
  return (
    <div className="rounded-2xl bg-slate-50 p-5">
      <p className="text-sm font-medium text-slate-500">{label}</p>
      <p className="mt-2 text-3xl font-bold text-slate-900">{value}</p>
    </div>
  )
}

function AdminDashboardPage({ pendingUsers, verifiedUsers, onApproveUser, onRejectUser }) {
  const navigate = useNavigate()

  return (
    <div className="mx-auto w-full max-w-6xl space-y-6">
      <PageCard>
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">
              Admin Panel — Student Verification
            </h1>
            <p className="mt-2 text-slate-600">
              Review pending login requests, approve verified students, and monitor user stats.
            </p>
          </div>

          <button
            type="button"
            onClick={() => navigate('/login')}
            className="rounded-full border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
          >
            Back to Login
          </button>
        </div>
      </PageCard>

      <section className="grid gap-4 md:grid-cols-3">
        <StatCard label="Total Users" value={pendingUsers.length + verifiedUsers.length} />
        <StatCard label="Verified Users" value={verifiedUsers.length} />
        <StatCard label="Pending Requests" value={pendingUsers.length} />
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <PageCard>
          <div className="space-y-4">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">Pending Users</h2>
              <p className="mt-1 text-sm text-slate-600">
                Review non-student-domain login requests waiting for approval.
              </p>
            </div>

            {pendingUsers.length > 0 ? (
              <div className="space-y-3">
                {pendingUsers.map((email) => (
                  <div
                    key={email}
                    className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
                  >
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <p className="font-semibold text-slate-900">{email}</p>
                        <p className="text-sm text-amber-600">Status: Pending</p>
                      </div>

                      <div className="flex gap-3">
                        <button
                          type="button"
                          onClick={() => onApproveUser(email)}
                          className="rounded-full bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-500"
                        >
                          Approve
                        </button>
                        <button
                          type="button"
                          onClick={() => onRejectUser(email)}
                          className="rounded-full bg-rose-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-rose-500"
                        >
                          Reject
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-6 text-sm text-slate-600">
                No pending verification requests.
              </div>
            )}
          </div>
        </PageCard>

        <PageCard>
          <div className="space-y-4">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">Verified Users</h2>
              <p className="mt-1 text-sm text-slate-600">
                Approved students who can access the rider flow.
              </p>
            </div>

            {verifiedUsers.length > 0 ? (
              <div className="space-y-3">
                {verifiedUsers.map((email) => (
                  <div
                    key={email}
                    className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4"
                  >
                    <p className="font-semibold text-slate-900">{email}</p>
                    <p className="text-sm text-emerald-700">Verified Student</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-6 text-sm text-slate-600">
                No users have been approved yet.
              </div>
            )}
          </div>
        </PageCard>
      </section>
    </div>
  )
}

export default AdminDashboardPage