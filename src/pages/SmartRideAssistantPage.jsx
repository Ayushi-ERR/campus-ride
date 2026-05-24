import { useMemo, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import PageCard from '../components/PageCard'
import { formatRideDate, rides } from '../data/rides'

const checklistItems = [
  'Check that the car registration number matches',
  "Verify the driver's identity before entering",
  'Share your trip details with a trusted contact',
]

function Modal({ title, children, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/55 px-4 py-6">
      <div className="w-full max-w-lg rounded-3xl bg-white p-6 shadow-2xl sm:p-8">
        <div className="mb-5 flex items-start justify-between gap-4">
          <h2 className="text-2xl font-bold text-slate-900">{title}</h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-slate-200 px-3 py-1 text-sm font-semibold text-slate-600 transition hover:bg-slate-100"
          >
            Close
          </button>
        </div>
        {children}
      </div>
    </div>
  )
}

function SmartRideAssistantPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const ride = location.state?.ride ?? rides[0]
  const [activeModal, setActiveModal] = useState(null)
  const [copyStatus, setCopyStatus] = useState('')

  const shareMessage = useMemo(
    () =>
      `I'm riding with ${ride.driverName} from ${ride.from} to ${ride.to} on ${formatRideDate(ride.date)} at ${ride.time}. Car: ${ride.car}, Reg: ${ride.registrationNumber}.`,
    [ride],
  )

  const handleCopyMessage = async () => {
    try {
      await navigator.clipboard.writeText(shareMessage)
      setCopyStatus('Ride details copied to clipboard.')
    } catch {
      setCopyStatus('Copy failed. Please copy the message manually.')
    }
  }

  return (
    <>
      <div className="mx-auto w-full max-w-6xl space-y-6">
        <PageCard>
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="space-y-3">
              <span className="inline-flex rounded-full bg-sky-100 px-4 py-2 text-sm font-medium text-sky-700">
                Smart Ride Assistant
              </span>
              <h1 className="text-3xl font-bold tracking-tight text-slate-900">Your trip safety snapshot</h1>
              <p className="max-w-2xl text-slate-600">
                Stay prepared with clear ride details, sharing tools, and safety reminders before departure.
              </p>
            </div>
            <button
              type="button"
              onClick={() => navigate('/browse-rides')}
              className="rounded-full border border-slate-300 px-6 py-3 font-semibold text-slate-700 transition hover:bg-slate-100"
            >
              Browse Rides
            </button>
          </div>
        </PageCard>

        <section className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <PageCard className="border-emerald-200 bg-emerald-50/60">
            <div className="space-y-6">
              <div className="space-y-2">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700">
                  Personalised ride card
                </p>
                <h2 className="text-3xl font-bold text-slate-900">
                  You are riding with {ride.driverName} ({ride.rating}★)
                </h2>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl bg-white p-4 shadow-sm">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Route</p>
                  <p className="mt-2 text-lg font-semibold text-slate-900">{ride.from} → {ride.to}</p>
                </div>
                <div className="rounded-2xl bg-white p-4 shadow-sm">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Date</p>
                  <p className="mt-2 text-lg font-semibold text-slate-900">{formatRideDate(ride.date)}</p>
                </div>
                <div className="rounded-2xl bg-white p-4 shadow-sm">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Departure Time</p>
                  <p className="mt-2 text-lg font-semibold text-slate-900">{ride.time}</p>
                </div>
                <div className="rounded-2xl bg-white p-4 shadow-sm">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Car Model</p>
                  <p className="mt-2 text-lg font-semibold text-slate-900">{ride.car}</p>
                </div>
              </div>

              <div className="rounded-2xl bg-white p-5 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Registration Number</p>
                <p className="mt-2 text-2xl font-bold tracking-wide text-slate-900">{ride.registrationNumber}</p>
              </div>
            </div>
          </PageCard>

          <div className="grid gap-4 self-start">
            <PageCard className="p-5">
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-slate-900">Share Details</h3>
                <p className="text-sm text-slate-600">
                  Share your selected ride information with a trusted contact before you leave.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setCopyStatus('')
                    setActiveModal('share')
                  }}
                  className="rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-700"
                >
                  Share Details
                </button>
              </div>
            </PageCard>

            <PageCard className="p-5">
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-slate-900">Report an Issue</h3>
                <p className="text-sm text-slate-600">
                  Open quick support information if you feel unsafe or need help during the trip.
                </p>
                <button
                  type="button"
                  onClick={() => setActiveModal('issue')}
                  className="rounded-full bg-rose-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-rose-500"
                >
                  Report Issue
                </button>
              </div>
            </PageCard>
          </div>
        </section>

        <PageCard>
          <div className="space-y-4">
            <div>
              <h3 className="text-xl font-bold text-slate-900">Safety checklist</h3>
              <p className="mt-2 text-sm text-slate-600">
                Use this quick checklist before entering the vehicle.
              </p>
            </div>

            <div className="grid gap-3">
              {checklistItems.map((item) => (
                <div key={item} className="flex items-start gap-3 rounded-2xl bg-slate-50 p-4">
                  <span className="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100 text-sm text-emerald-700">
                    ✓
                  </span>
                  <p className="text-sm font-medium text-slate-800">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </PageCard>
      </div>

      {activeModal === 'share' && (
        <Modal title="Share ride details" onClose={() => setActiveModal(null)}>
          <div className="space-y-5">
            <div className="rounded-2xl bg-slate-50 p-4 text-sm leading-7 text-slate-800">
              {shareMessage}
            </div>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <button
                type="button"
                onClick={handleCopyMessage}
                className="rounded-full bg-emerald-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-500"
              >
                Copy Message
              </button>
              {copyStatus && <p className="text-sm font-medium text-slate-600">{copyStatus}</p>}
            </div>
          </div>
        </Modal>
      )}

      {activeModal === 'issue' && (
        <Modal title="Report an issue" onClose={() => setActiveModal(null)}>
          <div className="space-y-4">
            <a
              href="mailto:studentunion@latrobe.edu.au"
              className="block rounded-2xl border border-slate-200 p-4 transition hover:bg-slate-50"
            >
              <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">Email</p>
              <p className="mt-2 text-base font-semibold text-slate-900">studentunion@latrobe.edu.au</p>
            </a>

            <a
              href="tel:1300528762"
              className="block rounded-2xl border border-slate-200 p-4 transition hover:bg-slate-50"
            >
              <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">Non-emergency helpline</p>
              <p className="mt-2 text-base font-semibold text-slate-900">1300 528 762</p>
            </a>

            <a
              href="tel:000"
              className="block rounded-2xl border border-rose-200 bg-rose-50 p-4 transition hover:bg-rose-100"
            >
              <p className="text-sm font-semibold uppercase tracking-wide text-rose-600">Emergency number (Victoria)</p>
              <p className="mt-2 text-base font-bold text-rose-700">000</p>
            </a>
          </div>
        </Modal>
      )}
    </>
  )
}

export default SmartRideAssistantPage