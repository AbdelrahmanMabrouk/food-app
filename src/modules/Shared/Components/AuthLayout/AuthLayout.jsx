import React, { useEffect } from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import logo from '../../../../assets/images/logo.png'

export default function AuthLayout() {

  let navigate = useNavigate()

  useEffect(() => {
    if (localStorage.getItem('token')) {
      navigate('/dashboard')
    }
  }, []);


  return (
    <>
      <div className="auth-container bg-warning">
        <div className="container-fluid bg-overlay">
          <div className="row vh-100 justify-content-center align-items-center">
            <div className="col-md-5 bg-white p-5 rounded rounded-2">
              <div className="">
                <div className="text-center">
                  <Link to={'/login'}> <img src={logo} alt="food-logo" className='w-50' /></Link>
                </div>
                <Outlet />
              </div>
            </div>
          </div>
        </div>
      </div>

    </>
  )
}
