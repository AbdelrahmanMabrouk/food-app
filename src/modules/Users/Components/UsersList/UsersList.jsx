import React, { useEffect, useState } from 'react'
import Header from '../../../Shared/Components/Header/Header'
import headerImg from '../../../../assets/images/header-recipes.svg'
import axios from 'axios'
import { BASE_IMG_URL, USERS_URLS } from '../../../../assets/Constants/END_POINTS'
import noDataImg from '../../../../assets/images/no-data.png'


export default function UsersList() {

  const [recipesUserList, setRecipesUserList] = useState([])

  let getRecipesUserList = async () => {

    try {
      let response = await axios.get(USERS_URLS.getListUsers, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }

      })
      setRecipesUserList(response.data.data);
      console.log(response.data.data);

    } catch (error) {

      console.log(error);

    }
  }

  useEffect(() => {
    getRecipesUserList()
  }, [])







  return (

    <>
      <Header imgUrl={headerImg} title={'Users List'} decription={'You can now add your items that any user can order it from the Application and you can edit'} />
      <div className="title my-5">

        <h4>Users Table Details</h4>
        <span>You can check all details</span>
      </div>
      <table className="table StandardTable">
        <thead>
          <tr >
            <th scope="col">#Id</th>
            <th scope="col">Item Name</th>
            <th scope="col">Image</th>
            <th scope="col">country</th>
            {/* <th scope="col">creationDate</th> */}
            <th scope="col">Actions</th>

          </tr>
        </thead>

        <tbody >
          {recipesUserList.map((recipesUser) =>
            <tr key={recipesUser.id} >
              <th>{recipesUser.id}</th>

              <td scope="row">{recipesUser.userName}</td>
              <td>{recipesUser.imagePath ? <img className='img-list' src={`${BASE_IMG_URL}/${recipesUser.imagePath}`} alt="" /> :
                <img src={noDataImg} alt="" className='img-list' />

              }</td>
              {/* <td><img className='img-list' src={`${BASE_IMG_URL}/${recipesUser.imagePath}`} alt="" /></td> */}

              <td>{recipesUser.country}</td>
             

              <td >
                <i className='fa fa-edit text-warning mx-3' aria-hidden='true'></i>
                <button type='button' className='fa fa-trash text-danger border-0' aria-hidden='true'></button>
              </td>
            </tr>
          )}


        </tbody>
      </table>
    </>
  )
}