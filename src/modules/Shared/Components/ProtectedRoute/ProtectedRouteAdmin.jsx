import React, { useContext } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../../../context/context'

export default function ProtectedRouteAdmin({ children }) {

  let { loginData } = useContext(AuthContext)

  if (loginData?.userGroup == 'SuperAdmin') {
    return children
  }
  else {
    return <Navigate to='/dashboard' />
  }

}
