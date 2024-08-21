import React, { useContext } from 'react'
import { AuthContext } from '../../../../context/context'

import navImg from '../../../../assets/images/nav-img.png'



export default function Navbar() {
  let {loginData}=useContext(AuthContext)
  

  return (
    <>

      <div className="">
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
          <div className="container-fluid">
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav ms-auto mb-2 mb-lg-0 d-flex align-items-center">
                <li className="nav-item  mx-2">
                 <img src={navImg} alt="" />
                </li>
                <li className="nav-item">
                  {loginData?.userName}
                </li>
              </ul>

            </div>
          </div>
        </nav>
      </div>


    </>
  )
}
