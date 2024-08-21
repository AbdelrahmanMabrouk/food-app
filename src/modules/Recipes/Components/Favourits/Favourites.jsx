import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { BASE_IMG_URL, USER_RECIPES } from '../../../../assets/Constants/END_POINTS'
import NoData from '../../../Shared/Components/NoData/NoData'
import Header from '../../../Shared/Components/Header/Header'
import recipeImg from '../../../../assets/images/categoryImg.png'
import noDataImg from '../../../../assets/images/no-data.png'
import { toast } from 'react-toastify'

export default function Favourites() {

  const [favList, setfavList] = useState([])


  let getListFavList = async () => {

    try {
      let response = await axios.get(USER_RECIPES.getList, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      })
      console.log(response.data.data);
      setfavList(response.data.data)
    } catch (error) {
      console.log(error);

    }
  }
  let removeFromFave = async (id) => {
    try {
      let response = await axios.delete(USER_RECIPES.removeFromFav(id),
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      setfavList(response.data.data); 
      toast.success('removed')
      getListFavList()
    } catch (error) {
      console.log(error);
    }
  }





  useEffect(() => {
    getListFavList()
  }, [])


  return (
    <>
      <Header title={'Favourit'} item={'Items'} decription={'You can now add your items that any user can order it from the Application and you can edit'} imgUrl={recipeImg} />

      {favList?.length > 0 ? <div className="container">
        <div className="row">
          {favList.map((favItem) =>
            <div key={favItem.id} className="col-md-2">
              <div className="recipe-favourit">
                <div className="card m-3">
                  {favItem.recipe.imagePath ?<div> <img className='favImage' src={` ${BASE_IMG_URL}/${favItem.recipe.imagePath} `} alt="" /> </div>:
                    <div><img src={noDataImg} alt="" className='favImage' /></div>}
                  <div className="card-body">
                    <h5 className="card-title">{favItem.recipe.name}</h5>
                    <p className="card-text">{favItem.recipe.description}</p>
                    <a className="btn btn-danger" onClick={()=> removeFromFave(favItem.id)}>Remove favourit</a>
                  </div>
                </div>
              </div>
            </div>)}
        </div>
      </div>
        : <NoData />}

    </>
  )
}
