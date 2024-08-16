import React, { useEffect, useState } from 'react'
import Header from '../../../Shared/Components/Header/Header'
import recopesImg from '../../../../assets/images/categoryImg.png'
import axios from 'axios'
import { BASE_IMG_URL, RECIPES_URLS } from '../../../../assets/Constants/END_POINTS'
import NoData from '../../../Shared/Components/NoData/NoData'
import noDataImg from '../../../../assets/images/no-data.png'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import DeleteConfirmation from '../../../Shared/Components/DeleteConfirmation/DeleteConfirmation';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom'

export default function RecipesList() {
  let navigate = useNavigate()

  const [recipesList, setRecipesList] = useState([])
  const [show, setShow] = useState(false);
  const [recipeId, setRcipeId] = useState(0)
  
  const handleClose = () => setShow(false);
  const handleShow = (id) => {
    setRcipeId(id)
    setShow(true)
  }

  let deleteRecipe = async (id) => {

    try {
      let response = await axios.delete(RECIPES_URLS.delete(recipeId), {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      })
      console.log(localStorage.getItem('token'));
      
      console.log(response);
      handleClose()
      getRecipesList()
      toast.success('deleted succefully')
    } catch (error) {
      console.log(error);
      toast.info('not deleted')

    }

  }


  let getRecipesList = async () => {

    try {
      let response = await axios.get(RECIPES_URLS.getList, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      })

      setRecipesList(response.data.data);
      console.log(response.data.data);



    } catch (error) {
      console.log(error);

    }
  }




  useEffect(() => {
    getRecipesList()
  }, [])






  return (
    <>
      <Header title={'Recipes'} item={'Item'} decription={'You can now add your items that any user can order it from the Application and you can edit'} imgUrl={recopesImg} />

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>

        </Modal.Header>
        <Modal.Body>
          <DeleteConfirmation deleteItem={'Recipe'} ></DeleteConfirmation>
        </Modal.Body>
        <Modal.Footer>

          <Button variant="outline-danger" onClick={deleteRecipe}>
            Delete This recipe ?
          </Button>
        </Modal.Footer>
      </Modal>

      
      
      
      <div className="title d-flex justify-content-between my-5">
        <div className="title-info">
          <h4>Recipes Table Details</h4>
          <span>You can check all details</span>
        </div>
        <button className='btn btn-success' onClick={()=>{navigate('/dashboard/recipe-data')}}>Add New Recipe</button>
      </div>

      <div className="table-container">

        <table className="table StandardTable">
          <thead>
            <tr >
              <th scope="col">Item Name</th>
              <th scope="col">Image</th>
              <th scope="col">Price</th>
              <th scope="col">Description</th>
              <th scope="col">tag</th>
              <th scope="col">Actions</th>

            </tr>
          </thead>

          <tbody >
            {recipesList.map((recipe) =>
              <tr key={recipe.id} >
                <th scope="row">{recipe.name}</th>
                <td>{recipe.imagePath ? <img className='img-list' src={` ${BASE_IMG_URL}/${recipe.imagePath} `} alt="" /> :
                  <img src={noDataImg} alt="" className='img-list' />

                }</td>

                {/* <td><img className='img-list' src={` ${BASE_IMG_URL}/${recipe.imagePath} `} alt="" /></td> */}
                <td>{recipe.price}</td>
                <td>{recipe.description}</td>
                <td>{recipe.tag.name}</td>
                <td >
                  <i className='fa fa-edit text-warning mx-3' aria-hidden='true'></i>
                  <button type='button' className='fa fa-trash text-danger border-0' aria-hidden='true' onClick={() => handleShow(recipe.id)}></button>
                </td>
              </tr>
            )}


          </tbody>
        </table>
      </div>







    </>
  )
}
