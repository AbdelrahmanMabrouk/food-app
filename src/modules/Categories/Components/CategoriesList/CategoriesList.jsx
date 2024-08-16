import React, { useEffect, useState } from 'react'
import Header from '../../../Shared/Components/Header/Header'
import categoryImg from '../../../../assets/images/categoryImg.png'
import { CATEGORIES_URLS } from '../../../../assets/Constants/END_POINTS';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import DeleteConfirmation from '../../../Shared/Components/DeleteConfirmation/DeleteConfirmation';
import { toast } from 'react-toastify';
import NoData from '../../../Shared/Components/NoData/NoData';
import { useForm } from 'react-hook-form';

export default function CategoriesList() {

  let { register,
    handleSubmit,
    formState: { errors }
  } = useForm()


  const [show, setShow] = useState(false);
  const [categoryId, setcategoryId] = useState(0);

  const [showAdd, setShowAdd] = useState(false);
  const handleAddClose = () => setShowAdd(false);
  const handleAddShow = () => setShowAdd(true);




  const handleClose = () => setShow(false);
  const handleShow = (id) => {
    setcategoryId(id)
    setShow(true)
  }


  const [categoryList, setCategoryList] = useState([]);

  let deleteCategory = async (id) => {
    try {
      let response = await axios.delete(CATEGORIES_URLS.delete(categoryId), {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      })
      console.log(response);
      handleClose()
      getCategoriesList()
      toast.success('deleted succefully')

    } catch (error) {
      console.log(error);
      toast.info('not deleted')

    }

  }
  let getCategoriesList = async () => {
    try {
      let response = await axios.get(CATEGORIES_URLS.getList,
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }

      );
      // console.log(response.data.data);

      setCategoryList(response.data.data);



    } catch (error) {
      console.log(error);
    }
  }


  let addCategory = async (data) => {

    try {
        let response = await axios.post(CATEGORIES_URLS.create,data,{
          headers:{Authorization:`Bearer ${localStorage.getItem('token')}`}
        })
        console.log(response);
        getCategoriesList()
        handleAddClose()
        toast.success('Category Item Added')
    } catch (error) {
      
      console.log(error);
      
    }
    

  };


  useEffect(() => {
    getCategoriesList()

  }, [])



  return (

    <>
      <Header title={'Categories'} item={'Item'} decription={'You can now add your items that any user can order it from the Application and you can edit'} imgUrl={categoryImg} />



      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>

        </Modal.Header>
        <Modal.Body>
          <DeleteConfirmation deleteItem={'Category'} ></DeleteConfirmation>
        </Modal.Body>
        <Modal.Footer>

          <Button variant="outline-danger" onClick={deleteCategory}>
            Delete This Category ?
          </Button>
        </Modal.Footer>
      </Modal>


      <Modal show={showAdd} onHide={handleAddClose}>
        <Modal.Header closeButton>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit(addCategory)} className='p-2'>
            <input type="text" className="form-control my-3" placeholder="Enter your Category Name" aria-label="name" aria-describedby="basic-addon1"
              {...register('name', {
                required: 'Category Name is required',

              })}
            />
            {errors.name && <span className='text-danger'>{errors.name.message}</span>}

            <Button type='submit' variant="outline-success" onClick={addCategory} className='d-flex ms-auto' >
              Save
            </Button>
          </form>
        </Modal.Body>
        <Modal.Footer>


        </Modal.Footer>
      </Modal>


      <div className="title d-flex justify-content-between my-5">
        <div className="title-info">
          <h4>Categories Table Details</h4>
          <span>You can check all details</span>
        </div>
        <button className='btn btn-success' onClick={handleAddShow}>Add New Category</button>
      </div>

      {categoryList.length > 0 ? <div className="table-container">
        <div className="table-info d-flex justify-content-between p-4 mb-2 ">
          <h5>Name</h5>
          <h5>Actions</h5>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Creation Date</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {categoryList.map((category) =>
              <tr key={category.id}>
                <th scope="row">{category.id}</th>
                <td>{category.name}</td>
                <td>{category.creationDate}</td>
                <td >
                  <i className='fa fa-edit text-warning mx-3' aria-hidden='true'></i>
                  <button type='button' className='fa fa-trash text-danger border-0' aria-hidden='true' onClick={() => handleShow(category.id)}></button>
                </td>
              </tr>
            )}


          </tbody>
        </table>
      </div> : <NoData />}




    </>

  )
}
