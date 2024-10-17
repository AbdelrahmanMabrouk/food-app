import React from 'react'
import SideBar from '../SideBar/SideBar'
import Navbar from '../Navbar/Navbar'
import { Outlet } from 'react-router-dom'

export default function MasterLayout() {


  



  return (
    <>

        
        <div className="d-flex">
          <div className=" vh-100  " style={{ backgroundColor: "rgba(31, 38, 62, 1)", borderRadius:'0 40px 0 0' }}>
            <SideBar/>
          </div>
          <div className=" w-100 container-fluid">
            <Navbar/>
            <Outlet/>
          </div>
        </div>
      


    </>
  )
}
