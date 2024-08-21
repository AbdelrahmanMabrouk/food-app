import React, { useEffect, useState } from 'react'
import Header from '../../../Shared/Components/Header/Header'
import headerImg from '../../../../assets/images/header-recipes.svg'
import axios from 'axios'
import { BASE_IMG_URL, USERS_URLS } from '../../../../assets/Constants/END_POINTS'
import noDataImg from '../../../../assets/images/no-data.png'
import DeleteConfirmation from '../../../Shared/Components/DeleteConfirmation/DeleteConfirmation'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { toast } from 'react-toastify'
import NoData from '../../../Shared/Components/NoData/NoData'


export default function UsersList() {

  const [userList, setUserList] = useState([])
  const [arrayOfPages, setArrayOfPages] = useState([])


  const [show, setShow] = useState(false);
  const [userId, setUserId] = useState(0)

  const handleClose = () => setShow(false);
  const handleShow = (id) => {
    setUserId(id)
    setShow(true)


  }

  let deleteUser = async (id) => {

    try {
      let response = await axios.delete(USERS_URLS.delete(userId), {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      })

      console.log(response);
      handleClose()
      getUserList()
      toast.success('deleted succefully')
    } catch (error) {
      console.log(error);
      toast.info('not deleted')

    }

  }








  let getUserList = async (pageNumber, pageSize,) => {

    try {
      let response = await axios.get(USERS_URLS.getListUsers, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        params: { pageSize: pageSize, pageNumber: pageNumber, }


      })
      setArrayOfPages(Array(response.data.totalNumberOfPages).fill().map((_, i) => i + 1))
      setUserList(response.data.data);
      console.log(response.data.data);

    } catch (error) {

      console.log(error);

    }
  }

  useEffect(() => {
    getUserList(1, 5)
  }, [])







  return (

    <>
      <Header imgUrl={headerImg} title={'Users List'} decription={'You can now add your items that any user can order it from the Application and you can edit'} />



      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>

        </Modal.Header>
        <Modal.Body>
          <DeleteConfirmation deleteItem={'User'} ></DeleteConfirmation>
        </Modal.Body>
        <Modal.Footer>

          <Button variant="outline-danger" onClick={deleteUser}>
            Delete This User ?
          </Button>
        </Modal.Footer>
      </Modal>




      <div className="title my-5">

        <h4>Users Table Details</h4>
        <span>You can check all details</span>
      </div>

      {userList.length > 0 ? <table className="table StandardTable">
        <thead>
          <tr >
            <th scope="col">#Id</th>
            <th scope="col">Item Name</th>
            <th scope="col">Image</th>
            <th scope="col">country</th>

            <th scope="col">Actions</th>

          </tr>
        </thead>

        <tbody >
          {userList.map((recipesUser) =>
            <tr key={recipesUser.id} >
              <th>{recipesUser.id}</th>

              <td scope="row">{recipesUser.userName}</td>
              <td>{recipesUser.imagePath ? <img className='img-list' src={`${BASE_IMG_URL}/${recipesUser.imagePath}`} alt="" /> :
                <img src={noDataImg} alt="" className='img-list' />

              }</td>
              <td>{recipesUser.country}</td>


              <td >
                <button type='button' className='fa fa-trash text-danger border-0' aria-hidden='true' onClick={() => { handleShow(recipesUser.id) }}></button>
              </td>
            </tr>
          )}


        </tbody>
      </table>



        : <NoData />
      }

      {/* <div className="pagination-button my-3 d-flex w-25 ">

        <nav aria-label="Page navigation example">
          <ul className="pagination">
            <li className="page-item">
              <a className="page-link" href="#" aria-label="Previous">
                <span aria-hidden="true">«</span>
              </a>
            </li>
            {arrayOfPages.map((pageNo) =>
              <li key={pageNo} className="page-item " onClick={() => getUserList(pageNo, 5)}><button className="page-link" type='button' >{pageNo}</button></li>
            )}
            <li className="page-item" >
              <a className="page-link" href="#" aria-label="Next">
                <span aria-hidden="true">»</span>
              </a>
            </li>
          </ul>
        </nav>
      </div> */}
    </>
  )
}