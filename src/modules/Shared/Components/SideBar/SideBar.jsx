import React, { useState } from 'react'
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { Link, useNavigate } from 'react-router-dom';
import toggler from '../../../../assets/images/toggler.png'


export default function SideBar() {

    const [isCollapse, setIsCollapse] = useState(false)
    let navigate = useNavigate()

    let toggleCollapse = ()=>{
      setIsCollapse(!isCollapse)
    }

  return (
    <>
    <div className="sidebar-container">
    <Sidebar collapsed={isCollapse}>
        <Menu>
          <MenuItem className='first-item my-4 ps-1' onClick={toggleCollapse} icon={<img src={toggler} alt='toggler-icon' />}></MenuItem>
          <MenuItem icon={<i className="fa-solid fa-house"></i>} component={<Link to="/dashboard" />}> home</MenuItem>
          <MenuItem icon={<i className="fa-solid fa-user-group"></i>} component={<Link to="/dashboard/users" />}> Users</MenuItem>
          <MenuItem icon={<i className="fa-solid fa-table-cells-large"></i>} component={<Link to="/dashboard/recipesList" />}> Recipes</MenuItem>
          <MenuItem icon={<i className="fa-solid fa-calendar-days"></i>} component={<Link to="/dashboard/categories" />}> Categories</MenuItem>
          {/* <MenuItem icon={<i className="fa-solid fa-unlock"></i>} component={<Link to="changePassword" />}> Change Password</MenuItem> */}
          <MenuItem icon={<i className="fa-solid fa-right-from-bracket"></i>} onClick={()=>{localStorage.removeItem('token') , navigate('/login') }} > Log out</MenuItem>
        </Menu>
      </Sidebar>
    </div>

    </>
  )
}
