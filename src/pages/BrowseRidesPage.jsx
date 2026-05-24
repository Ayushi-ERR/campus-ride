import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import RideCard from '../components/RideCard'

function BrowseRidesPage({ rides, onRemoveRide }) {
  const navigate = useNavigate()
  const [search, setSearch] = useState({
    from: '',
    to: '',
    date: '',
  })
  const [recommendedRideId, setRecommendedRideId] = useState(null)

  const handleSearch = () => {
    const normalizedFrom = search.from.trim().toLowerCase()
    const normalizedTo = search.to.trim().toLowerCase()
    const normalizedDate = search.date.trim().toLowerCase()

    let bestMatchId = null
    let bestScore = 0

    rides.forEach((ride) => {
      let score = 0

      if (normalizedFrom && ride.from.toLowerCase().includes(normalizedFrom)) {
        score += 1
      }

      if (normalizedTo && ride.to.toLowerCase().includes(normalizedTo)) {
        score += 1
      }

      if (normalizedDate && ride.date.toLowerCase() === normalizedDate) {
        score += 1
      }

      if (score > bestScore) {
        bestScore = score
        bestMatchId = ride.id
      }
    })

    setRecommendedRideId(bestScore > 0 ? bestMatchId : null)
  }

  return (
    <div className="w-full space-y-8">
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">Browse available rides</h1>
            <p className="mt-2 text-slate-600">
              Find a reliable student carpool based on your route, date, and schedule.
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

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <input
            type="text"
            value={search.from}
            onChange={(event) => setSearch({ ...search, from: event.target.value })}
            placeholder="From"
            className="rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
          />
          <input
            type="text"
            value={search.to}
            onChange={(event) => setSearch({ ...search, to: event.target.value })}
            placeholder="To"
            className="rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
          />
          <input
            type="date"
            value={search.date}
            onChange={(event) => setSearch({ ...search, date: event.target.value })}
            className="rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
          />
        </div>

        <button
          type="button"
          onClick={handleSearch}
          className="mt-4 rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-700"
        >
          Search Rides
        </button>
      </section>

      <section className="grid gap-5">
        {rides.map((ride) => (
          <RideCard
            key={ride.id}
            ride={ride}
            isRecommended={recommendedRideId === ride.id}
            onRemove={() => {
              if (recommendedRideId === ride.id) {
                setRecommendedRideId(null)
              }

              onRemoveRide(ride.id)
            }}
            onAction={() => navigate('/ride-confirmation', { state: { ride } })}
          />
        ))}
      </section>
    </div>
  )
}

export default BrowseRidesPage