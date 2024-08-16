import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import logo from '../../../../assets/images/logo.png'


export default function NotFound() {

  let navigate = useNavigate()

  return (
    <>
      <div className="notfound-bg">
        <div className="notfound-bg1">
          <Link to={'/login'}> <img src={logo} alt="food-logo" className='w-25' /></Link>
          <div className="content d-flex flex-column ">
            <h2>Oops.</h2>
            <h4>Page  not found </h4>
            <h5>...</h5>
            <p>This Page doesn’t exist or was removed!
              We suggest you  back to home.</p>
          </div>

          <button className='btn btn-success' onClick={() => navigate("/dashboard")} ><i className="fa-solid fa-right-from-bracket"></i> Back To Home </button>

        </div>
      </div>




    </>
  )
}
