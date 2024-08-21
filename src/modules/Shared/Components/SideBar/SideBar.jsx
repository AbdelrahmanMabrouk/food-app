import React, { useContext, useEffect, useState } from 'react'
import { Sidebar, Menu, MenuItem, SubMenu ,} from 'react-pro-sidebar';
import { Link, useNavigate } from 'react-router-dom';
import toggler from '../../../../assets/images/toggler.png'
import { AuthContext } from '../../../../context/context';




export default function SideBar() {

  const [isCollapse, setIsCollapse] = useState(true)

  let {loginData} = useContext(AuthContext)
  let navigate = useNavigate()

  let toggleCollapse = () => {
    setIsCollapse(!isCollapse)
  }
 

  return (
    <>

   

    <div className="">
        <Sidebar collapsed={isCollapse} className='sidebar-container'>
          <Menu className=''>
            <MenuItem className='first-item my-4 ps-1' onClick={toggleCollapse} icon={<img src={toggler} alt='toggler-icon' />}></MenuItem>
            <MenuItem icon={<i className="fa-solid fa-house"></i>} component={<Link to="/dashboard" />}> home</MenuItem>
            {loginData?.userGroup =='SuperAdmin'?<MenuItem icon={<i className="fa-solid fa-user-group"></i>} component={<Link to="/dashboard/users" />}> Users</MenuItem>:""}
            <MenuItem icon={<i className="fa-solid fa-table-cells-large"></i>} component={<Link to="/dashboard/recipesList" />}> Recipes</MenuItem>
            {loginData?.userGroup =='SuperAdmin'?<MenuItem icon={<i className="fa-solid fa-calendar-days"></i>} component={<Link to="/dashboard/categories" />}> Categories</MenuItem>:""}
            {loginData?.userGroup !='SuperAdmin'?<MenuItem icon={<i className="fa-solid fa-heart"></i>} component={<Link to="/dashboard/favourites" />} > Favourits</MenuItem> :''}
            {/* <MenuItem icon={<i className="fa-solid fa-unlock"></i>} component={<Link to="changePassword" />}> Change Password</MenuItem> */}
            <MenuItem icon={<i className="fa-solid fa-right-from-bracket"></i>} onClick={() => { localStorage.removeItem('token'), navigate('/login') }} > Log out</MenuItem>
          </Menu>
        </Sidebar>
      </div>


    

    </>
  )
}
