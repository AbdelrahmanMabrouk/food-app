import React, { useContext, useEffect, useState } from 'react'
import Header from '../../../Shared/Components/Header/Header'
import recipeImg from '../../../../assets/images/categoryImg.png'
import axios from 'axios'
import { BASE_IMG_URL, CATEGORIES_URLS, GETALLTAGS, RECIPES_URLS, USER_RECIPES } from '../../../../assets/Constants/END_POINTS'
import NoData from '../../../Shared/Components/NoData/NoData'
import noDataImg from '../../../../assets/images/no-data.png'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import DeleteConfirmation from '../../../Shared/Components/DeleteConfirmation/DeleteConfirmation';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../../../context/context'

export default function RecipesList() {
  let navigate = useNavigate()
  let { loginData } = useContext(AuthContext)

  const [nameValue, setNameValue] = useState()
  const [tagValue, setTagValue] = useState()
  const [catValue, setCatValue] = useState()

  const [tagsList, setTagsList] = useState([])
  const [categoryList, setCategoryList] = useState([]);


  const [arrayOfPages, setArrayOfPages] = useState([])
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


  let getRecipesList = async (pageNumber, pageSize, nameInput, tagInput, catInput) => {

    try {
      let response = await axios.get(RECIPES_URLS.getList, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        params: {
          pageSize: pageSize,
          pageNumber: pageNumber,
          name: nameInput,
          tagId: tagInput,
          categoryId: catInput
        }

      })
      setArrayOfPages(Array(response.data.totalNumberOfPages).fill().map((_, i) => i + 1))


      setRecipesList(response.data.data);
      console.log(response.data.data);



    } catch (error) {
      console.log(error);

    }
  }


  let getValueName = (e) => {
    setNameValue(e.target.value);
    getRecipesList(1, 4, nameValue, tagValue, catValue)
  }

  let getValueTag = (e) => {
    setTagValue(e.target.value);
    getRecipesList(1, 4, nameValue, tagValue, catValue)
  }
  let getValueCat = (e) => {
    setCatValue(e.target.value);
    getRecipesList(1, 4, nameValue, tagValue, catValue)
  }



  let getAllTags = async () => {

    try {
      let response = await axios.get(GETALLTAGS, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      })
      setTagsList(response.data)


    } catch (error) {
      console.log(error);

    }

  }

  let getCategoriesList = async () => {
    try {
      let response = await axios.get(CATEGORIES_URLS.getList,
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      setCategoryList(response.data.data);
    } catch (error) {
      console.log(error);
    }
  }

  let addToFav = async (id) => {
    try {
      let response = await axios.post(USER_RECIPES.addToFav,{
        "recipeId": id,
      },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      setCategoryList(response.data.data);
      toast.success('recipe added to favourite list')
    } catch (error) {
      console.log(error);
    }
  }


  useEffect(() => {
    getRecipesList(1, 4)
    getCategoriesList()
    getAllTags()
  }, [])


  return (
    <>
      <Header title={'Recipes'} item={'Item'} decription={'You can now add your items that any user can order it from the Application and you can edit'} imgUrl={recipeImg} />

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
        {loginData?.userGroup == 'SuperAdmin' ? <button className='btn btn-success' onClick={() => { navigate('/dashboard/recipe-data') }}>Add New Recipe</button> : ''}
      </div>
      <div className="row">
        <div className="col-md-6">
          <input type="text" placeholder='search by name' className='form-control my-2' onChange={getValueName} />
        </div>
        <div className="col-md-3">
          <select className="form-control my-2 form-select" placeholder="Tag" onChange={getValueTag}>
            <option value='' hidden > select tag</option>
            {tagsList.map(tag => <option key={tag.id} value={tag.id}>{tag.name}</option>)},
          </select>
        </div>
        <div className="col-md-3">
          <select className="form-control my-2 form-select" placeholder="category" onChange={getValueCat}>
            <option value='' hidden > select category</option>
            {categoryList?.map((category) => (
              <option key={category.id} value={category.id}>{category.name}</option>
            ))}

          </select>
        </div>
      </div>
      {recipesList.length > 0 ? <div className="table-container">
        <table className="table StandardTable">
          <thead>
            <tr >
              <th scope="col">Item Name</th>
              <th scope="col">Image</th>
              <th scope="col">Price</th>
              <th scope="col">Description</th>
              <th scope="col">tag</th>
              {loginData?.userGroup == 'SuperAdmin' ? <th scope="col">Actions</th> : <th scope="col">Favourits</th>}

            </tr>
          </thead>

          <tbody >
            {recipesList.map((recipe) =>
              <tr key={recipe.id} >
                <th scope="row">{recipe.name}</th>
                <td>{recipe.imagePath ? <img className='img-list' src={` ${BASE_IMG_URL}/${recipe.imagePath} `} alt="" /> :
                  <img src={noDataImg} alt="" className='img-list' />

                }</td>

                <td>{recipe.price}</td>
                <td>{recipe.description}</td>
                <td>{recipe.tag.name}</td>
                {loginData?.userGroup == 'SuperAdmin' ? <td >
                  <i className='fa fa-edit text-warning mx-3' aria-hidden='true'></i>
                  <button type='button' className='fa fa-trash text-danger border-0' aria-hidden='true' onClick={() => handleShow(recipe.id)}></button>
                </td> : <td><button onClick={()=>addToFav(recipe.id)} type='button'  className='fa-solid fa-heart text-danger border-0' aria-hidden='true'></button></td>}
              </tr>
            )}


          </tbody>
        </table>

        <div className="pagination-button my-3 d-flex w-25 m-auto">

          <nav aria-label="Page navigation example">
            <ul className="pagination">
              <li className="page-item">
                <a className="page-link" href="#" aria-label="Previous">
                  <span aria-hidden="true">«</span>
                </a>
              </li>
              {arrayOfPages?.map((pageNo) =>
                <li key={pageNo} className="page-item " onClick={() => getRecipesList(pageNo, 4)}><button className="page-link" type='button' >{pageNo}</button></li>
              )}
              <li className="page-item" >
                <a className="page-link" href="#" aria-label="Next">
                  <span aria-hidden="true">»</span>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div> : <NoData />}







    </>
  )
}
