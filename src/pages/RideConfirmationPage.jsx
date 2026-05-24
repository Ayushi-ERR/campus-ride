import { useLocation, useNavigate } from 'react-router-dom'
import PageCard from '../components/PageCard'
import { formatRideDate, rides } from '../data/rides'

function RideConfirmationPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const ride = location.state?.ride ?? rides[0]

  return (
    <div className="mx-auto flex w-full max-w-3xl items-center">
      <PageCard>
        <div className="space-y-6">
          <div className="space-y-3">
            <span className="inline-flex rounded-full bg-emerald-50 px-4 py-2 text-sm font-medium text-emerald-700">
              Booking confirmed
            </span>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">Your ride is confirmed</h1>
            <p className="text-slate-600">
              You’re all set. Review your ride summary below and open the Smart Ride Assistant for helpful safety guidance.
            </p>
          </div>

          <div className="rounded-2xl bg-slate-50 p-6">
            <div className="grid gap-3 text-sm text-slate-700 sm:grid-cols-2">
              <p><span className="font-semibold text-slate-900">Driver:</span> {ride.driverName}</p>
              <p><span className="font-semibold text-slate-900">Rating:</span> ⭐ {ride.rating}</p>
              <p><span className="font-semibold text-slate-900">Route:</span> {ride.from} → {ride.to}</p>
              <p><span className="font-semibold text-slate-900">Departure:</span> {formatRideDate(ride.date)}, {ride.time}</p>
              <p><span className="font-semibold text-slate-900">Car:</span> {ride.car}</p>
              <p><span className="font-semibold text-slate-900">Registration:</span> {ride.registrationNumber}</p>
              <p><span className="font-semibold text-slate-900">Price:</span> {ride.price}</p>
            </div>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={() => navigate('/ride-assistant', { state: { ride } })}
              className="rounded-full bg-emerald-600 px-6 py-3 font-semibold text-white transition hover:bg-emerald-500"
            >
              View Ride Assistant
            </button>
            <button
              type="button"
              onClick={() => navigate('/browse-rides')}
              className="rounded-full border border-slate-300 px-6 py-3 font-semibold text-slate-700 transition hover:bg-slate-100"
            >
              Browse Rides
            </button>
          </div>
        </div>
      </PageCard>
    </div>
  )
}

export default RideConfirmationPage