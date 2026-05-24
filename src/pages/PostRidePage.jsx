import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PageCard from '../components/PageCard'

const initialForm = {
  from: '',
  to: '',
  date: '',
  time: '',
  driverName: '',
  car: '',
  registrationNumber: '',
  seats: '',
  price: '',
}

function PostRidePage({ onAddRide }) {
  const navigate = useNavigate()
  const [form, setForm] = useState(initialForm)
  const [submitted, setSubmitted] = useState(false)

  const updateField = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    onAddRide({
      id: `ride-${Date.now()}`,
      driverName: form.driverName || 'You',
      rating: 'New driver',
      from: form.from,
      to: form.to,
      date: form.date,
      time: form.time,
      car: form.car,
      registrationNumber: form.registrationNumber,
      seats: form.seats,
      price: form.price.startsWith('$') ? form.price : `$${form.price}`,
    })

    setSubmitted(true)
    setForm(initialForm)
  }

  return (
    <div className="mx-auto w-full max-w-4xl">
      <PageCard>
        <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">Post a new ride</h1>
            <p className="mt-2 text-slate-600">
              Add your route, timing, and driver details so other students can discover your trip.
            </p>
          </div>
          <button
            type="button"
            onClick={() => navigate('/driver-login')}
            className="rounded-full border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
          >
            Back to Driver Login
          </button>
        </div>

        <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-2">
          {[
            ['from', 'From'],
            ['to', 'To'],
            ['date', 'Date'],
            ['time', 'Departure Time'],
            ['driverName', 'Driver Name'],
            ['car', 'Car Model'],
            ['registrationNumber', 'Registration Number'],
            ['seats', 'Available Seats'],
            ['price', 'Price'],
          ].map(([field, label]) => (
            <label key={field} className="block space-y-2">
              <span className="text-sm font-medium text-slate-700">{label}</span>
              <input
                type={field === 'date' ? 'date' : 'text'}
                value={form[field]}
                onChange={(event) => updateField(field, event.target.value)}
                className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
                required
              />
            </label>
          ))}

          <div className="md:col-span-2 flex flex-col gap-4 pt-2 sm:flex-row sm:items-center sm:justify-between">
            <button
              type="submit"
              className="rounded-full bg-slate-900 px-6 py-3 text-base font-semibold text-white transition hover:bg-slate-700"
            >
              Post Ride
            </button>
            {submitted && (
              <p className="rounded-2xl bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">
                Your ride has been posted and will be visible to other students.
              </p>
            )}
          </div>
        </form>
      </PageCard>
    </div>
  )
}

export default PostRidePage