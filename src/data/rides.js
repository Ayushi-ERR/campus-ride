export const rides = [
  {
    id: 'ride-1',
    driverName: 'Sarah Nguyen',
    rating: 4.9,
    from: 'Bundoora Campus',
    to: 'Melbourne CBD',
    date: '2026-04-30',
    time: '8:15 AM',
    car: 'Toyota Corolla',
    registrationNumber: '1AB-2CD',
    seats: 2,
    price: '$8',
  },
  {
    id: 'ride-2',
    driverName: 'James Patel',
    rating: 4.8,
    from: 'Preston',
    to: 'Bundoora Campus',
    date: '2026-04-30',
    time: '9:00 AM',
    car: 'Mazda 3',
    registrationNumber: '2EF-7GH',
    seats: 3,
    price: '$6',
  },
  {
    id: 'ride-3',
    driverName: 'Emily Chen',
    rating: 5,
    from: 'Reservoir',
    to: 'City Campus',
    date: '2026-05-01',
    time: '7:40 AM',
    car: 'Hyundai i30',
    registrationNumber: '3JK-4LM',
    seats: 1,
    price: '$7',
  },
]

export function formatRideDate(dateString) {
  if (!dateString) {
    return ''
  }

  const parsedDate = new Date(`${dateString}T00:00:00`)

  if (Number.isNaN(parsedDate.getTime())) {
    return dateString
  }

  return parsedDate.toLocaleDateString('en-AU', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}