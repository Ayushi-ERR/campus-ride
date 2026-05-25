import { useCallback, useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import AppLayout from './components/AppLayout'
import AdminDashboardPage from './pages/AdminDashboardPage'
import BrowseRidesPage from './pages/BrowseRidesPage'
import DriverLoginPage from './pages/DriverLoginPage'
import LandingPage from './pages/LandingPage'
import LoginPage from './pages/LoginPage'
import PostRidePage from './pages/PostRidePage'
import RideConfirmationPage from './pages/RideConfirmationPage'
import SmartRideAssistantPage from './pages/SmartRideAssistantPage'
import VerificationPendingPage from './pages/VerificationPendingPage'

const API_BASE = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000'

function App() {
  const [availableRides, setAvailableRides] = useState([])
  const [pendingUsers, setPendingUsers] = useState([])
  const [verifiedUsers, setVerifiedUsers] = useState([])
  const [lastPendingEmail, setLastPendingEmail] = useState('')

  const fetchRides = useCallback(async () => {
    try {
      const response = await fetch(`${API_BASE}/rides`)
      const data = await response.json()
      setAvailableRides(Array.isArray(data) ? data : [])
    } catch (error) {
      console.error('Failed to fetch rides:', error)
    }
  }, [])

  const fetchUsers = useCallback(async () => {
    try {
      const response = await fetch(`${API_BASE}/users`)
      const data = await response.json()
      if (Array.isArray(data)) {
        setPendingUsers(data.filter((u) => u.status === 'pending').map((u) => u.email))
        setVerifiedUsers(data.filter((u) => u.status === 'verified').map((u) => u.email))
      }
    } catch (error) {
      console.error('Failed to fetch users:', error)
    }
  }, [])

  useEffect(() => {
    fetchRides()
    fetchUsers()
  }, [fetchRides, fetchUsers])

  const addRide = async (ride) => {
    try {
      await fetch(`${API_BASE}/rides`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(ride),
      })
      await fetchRides()
    } catch (error) {
      console.error('Failed to add ride:', error)
    }
  }

  const removeRide = async (rideId) => {
    try {
      await fetch(`${API_BASE}/rides/${encodeURIComponent(rideId)}`, {
        method: 'DELETE',
      })
      await fetchRides()
    } catch (error) {
      console.error('Failed to remove ride:', error)
    }
  }

  const addPendingUser = async (email) => {
    const normalizedEmail = email.trim().toLowerCase()
    setLastPendingEmail(normalizedEmail)

    if (!normalizedEmail) {
      return
    }

    try {
      await fetch(`${API_BASE}/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: normalizedEmail, status: 'pending' }),
      })
      await fetchUsers()
    } catch (error) {
      console.error('Failed to add pending user:', error)
    }
  }

  const addVerifiedUser = async (email) => {
    const normalizedEmail = email.trim().toLowerCase()

    if (!normalizedEmail) {
      return
    }

    try {
      await fetch(`${API_BASE}/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: normalizedEmail, status: 'verified' }),
      })
      await fetchUsers()
    } catch (error) {
      console.error('Failed to add verified user:', error)
    }
  }

  const approvePendingUser = async (email) => {
    try {
      await fetch(`${API_BASE}/users/${encodeURIComponent(email)}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'verified' }),
      })
      await fetchUsers()
    } catch (error) {
      console.error('Failed to approve user:', error)
    }
  }

  const rejectPendingUser = async (email) => {
    try {
      await fetch(`${API_BASE}/users/${encodeURIComponent(email)}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'rejected' }),
      })
      await fetchUsers()
    } catch (error) {
      console.error('Failed to reject user:', error)
    }
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