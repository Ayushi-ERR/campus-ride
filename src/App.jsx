import { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import AppLayout from './components/AppLayout'
import { rides as initialRides } from './data/rides'
import AdminDashboardPage from './pages/AdminDashboardPage'
import BrowseRidesPage from './pages/BrowseRidesPage'
import DriverLoginPage from './pages/DriverLoginPage'
import LandingPage from './pages/LandingPage'
import LoginPage from './pages/LoginPage'
import PostRidePage from './pages/PostRidePage'
import RideConfirmationPage from './pages/RideConfirmationPage'
import SmartRideAssistantPage from './pages/SmartRideAssistantPage'
import VerificationPendingPage from './pages/VerificationPendingPage'

const RIDES_STORAGE_KEY = 'rides'
const PENDING_USERS_STORAGE_KEY = 'pendingUsers'
const VERIFIED_USERS_STORAGE_KEY = 'verifiedUsers'

const loadStoredArray = (storageKey, fallbackValue) => {
  if (typeof window === 'undefined') {
    return fallbackValue
  }

  try {
    const storedValue = window.localStorage.getItem(storageKey)

    if (!storedValue) {
      return fallbackValue
    }

    const parsedValue = JSON.parse(storedValue)
    return Array.isArray(parsedValue) ? parsedValue : fallbackValue
  } catch {
    return fallbackValue
  }
}

function App() {
  const [availableRides, setAvailableRides] = useState(() => loadStoredArray(RIDES_STORAGE_KEY, initialRides))
  const [pendingUsers, setPendingUsers] = useState(() => loadStoredArray(PENDING_USERS_STORAGE_KEY, []))
  const [verifiedUsers, setVerifiedUsers] = useState(() => loadStoredArray(VERIFIED_USERS_STORAGE_KEY, []))
  const [lastPendingEmail, setLastPendingEmail] = useState('')

  useEffect(() => {
    window.localStorage.setItem(RIDES_STORAGE_KEY, JSON.stringify(availableRides))
  }, [availableRides])

  useEffect(() => {
    window.localStorage.setItem(PENDING_USERS_STORAGE_KEY, JSON.stringify(pendingUsers))
  }, [pendingUsers])

  useEffect(() => {
    window.localStorage.setItem(VERIFIED_USERS_STORAGE_KEY, JSON.stringify(verifiedUsers))
  }, [verifiedUsers])

  const addRide = (ride) => {
    setAvailableRides((currentRides) => [ride, ...currentRides])
  }

  const removeRide = (rideId) => {
    setAvailableRides((currentRides) => currentRides.filter((ride) => ride.id !== rideId))
  }

  const addPendingUser = (email) => {
    const normalizedEmail = email.trim().toLowerCase()

    setLastPendingEmail(normalizedEmail)

    if (!normalizedEmail) {
      return
    }

    setPendingUsers((currentUsers) => {
      if (currentUsers.includes(normalizedEmail) || verifiedUsers.includes(normalizedEmail)) {
        return currentUsers
      }

      return [...currentUsers, normalizedEmail]
    })
  }

  const approvePendingUser = (email) => {
    setPendingUsers((currentUsers) => currentUsers.filter((userEmail) => userEmail !== email))
    setVerifiedUsers((currentUsers) => {
      if (currentUsers.includes(email)) {
        return currentUsers
      }

      return [...currentUsers, email]
    })
  }

  const rejectPendingUser = (email) => {
    setPendingUsers((currentUsers) => currentUsers.filter((userEmail) => userEmail !== email))
  }

  const addVerifiedUser = (email) => {
    const normalizedEmail = email.trim().toLowerCase()

    if (!normalizedEmail) {
      return
    }

    setVerifiedUsers((currentUsers) => {
      if (currentUsers.includes(normalizedEmail)) {
        return currentUsers
      }

      return [...currentUsers, normalizedEmail]
    })
  }

  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<LandingPage />} />
        <Route
          path="/login"
          element={(
            <LoginPage
              onAddPendingUser={addPendingUser}
              onAddVerifiedUser={addVerifiedUser}
              verifiedUsers={verifiedUsers}
            />
          )}
        />
        <Route path="/driver-login" element={<DriverLoginPage />} />
        <Route
          path="/verification-pending"
          element={<VerificationPendingPage pendingEmail={lastPendingEmail} />}
        />
        <Route
          path="/browse-rides"
          element={<BrowseRidesPage rides={availableRides} onRemoveRide={removeRide} />}
        />
        <Route path="/post-ride" element={<PostRidePage onAddRide={addRide} />} />
        <Route
          path="/admin-dashboard"
          element={(
            <AdminDashboardPage
              pendingUsers={pendingUsers}
              verifiedUsers={verifiedUsers}
              onApproveUser={approvePendingUser}
              onRejectUser={rejectPendingUser}
            />
          )}
        />
        <Route path="/ride-confirmation" element={<RideConfirmationPage />} />
        <Route path="/ride-assistant" element={<SmartRideAssistantPage />} />
      </Route>
    </Routes>
  )
}

export default App
