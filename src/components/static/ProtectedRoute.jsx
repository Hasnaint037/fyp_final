import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

function ProtectedRoute({ children }) {
  const user = useSelector(store => store.user)
  if (user !== null) {
    return children
  } else {
    return <Navigate to="/login" />
  }
}

export default ProtectedRoute
