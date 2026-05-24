import { formatRideDate } from '../data/rides'

function RideCard({
  ride,
  actionLabel = 'Select Ride',
  onAction,
  isRecommended = false,
  onRemove,
}) {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div className="space-y-3">
          <div>
            {isRecommended && (
              <span className="mb-3 inline-flex rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-700">
                ⭐ Recommended for you
              </span>
            )}
            <p className="text-lg font-semibold text-slate-900">{ride.driverName}</p>
            <p className="text-sm text-amber-500">⭐ {ride.rating} student rating</p>
          </div>

          <div className="grid gap-2 text-sm text-slate-600 sm:grid-cols-2">
            <p><span className="font-medium text-slate-800">Route:</span> {ride.from} → {ride.to}</p>
            <p><span className="font-medium text-slate-800">Departure:</span> {formatRideDate(ride.date)}, {ride.time}</p>
            <p><span className="font-medium text-slate-800">Car:</span> {ride.car}</p>
            <p><span className="font-medium text-slate-800">Seats left:</span> {ride.seats}</p>
          </div>
        </div>

        <div className="flex min-w-36 flex-col items-start gap-3 md:items-end">
          <div className="flex items-center justify-between gap-3 md:w-full">
            <p className="text-2xl font-bold text-emerald-600">{ride.price}</p>
            {onRemove && (
              <button
                type="button"
                onClick={onRemove}
                className="flex h-7 w-7 items-center justify-center rounded-full bg-red-500 text-sm font-bold text-white hover:bg-red-600"
                aria-label={`Remove ride by ${ride.driverName}`}
              >
                ×
              </button>
            )}
          </div>
          <button
            type="button"
            onClick={onAction}
            className="w-full rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-700 md:w-auto"
          >
            {actionLabel}
          </button>
        </div>
      </div>
    </article>
  )
}

export default RideCard