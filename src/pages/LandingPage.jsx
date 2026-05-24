import { useNavigate } from 'react-router-dom'
import PageCard from '../components/PageCard'
import imageAsset from '../../Image-Asset.png'
import latrobeLogo from '../../latrobe.png'

function LandingPage() {
  const navigate = useNavigate()

  return (
    <div className="grid w-full items-start gap-8 lg:grid-cols-2">
      <PageCard className="flex h-full self-start">
        <div className="flex w-full flex-col justify-between gap-8">
          <div className="inline-flex rounded-full bg-emerald-50 px-4 py-2 text-sm font-medium text-emerald-700">
            Student-only commuting made simple
          </div>
          <div className="space-y-4">
            <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
              Share smarter rides to campus and beyond.
            </h1>
            <p className="max-w-2xl text-lg text-slate-600">
              CampusRide helps verified university students find safe, affordable carpool options with a simple booking flow and built-in ride safety support.
            </p>
            <p className="text-sm uppercase tracking-[0.2em] text-slate-500">
              Trusted rides. Lower costs. Better commutes.
            </p>
          </div>

          <div className="rounded-2xl bg-slate-900 p-5 text-white">
            <p className="text-sm text-slate-300">Morning ride</p>
            <p className="mt-2 text-lg font-semibold">Bundoora Campus → Melbourne CBD</p>
            <p className="mt-3 text-sm text-emerald-300">Verified driver • 2 seats left • $8</p>
          </div>
        </div>
      </PageCard>

      <div className="h-full self-start rounded-3xl border border-emerald-100 bg-gradient-to-br from-emerald-50 via-white to-sky-50 p-5 shadow-sm sm:p-6">
        <div className="flex h-full w-full flex-col justify-between rounded-3xl border border-white/80 bg-white/90 p-4 shadow-lg shadow-emerald-100/70 backdrop-blur sm:p-5">
          <div className="mb-4 flex items-center justify-between gap-3">
            <span className="rounded-full bg-sky-100 px-3 py-1 text-xs font-semibold tracking-wide text-sky-700">
              Campus commute preview
            </span>
          </div>

          <div className="flex-1 overflow-hidden rounded-2xl bg-slate-100">
            <img
              src={imageAsset}
              alt="CampusRide student carpool preview"
              className="w-full h-auto object-cover rounded-lg"
            />
          </div>

          <div className="mt-4 text-center">
            <p className="text-sm font-medium text-slate-600">Powered by La Trobe University students</p>
            <img
              src={latrobeLogo}
              alt="La Trobe University"
              className="mx-auto mt-4 w-40 h-auto object-contain"
            />
          </div>

          <button
            type="button"
            onClick={() => navigate('/login')}
            className="mt-4 rounded-full bg-emerald-600 px-6 py-3 text-base font-semibold text-white transition hover:bg-emerald-500"
          >
            Get Started
          </button>
        </div>
      </div>
    </div>
  )
}

export default LandingPage