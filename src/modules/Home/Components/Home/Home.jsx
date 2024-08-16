import React from 'react'
import Header from '../../../Shared/Components/Header/Header'
import headerImg from '../../../../assets/images/header.png'
import { useNavigate } from 'react-router-dom'

export default function Home({ loginData }) {

  let navigate=useNavigate()
  return (
    <>

      <Header imgUrl={headerImg} title={`Welcome ${loginData?.userName}`} decription={'This is a welcoming screen for the entry of the application , you can now see the options'} />

      <div className="home-data d-flex justify-content-around align-items-center my-4 p-3">
        <div className="home-title">
          <h5>Fill the <span className='text-success'>Recipes</span> !</h5>
          <p>you can now fill the meals easily using the table and form , click here and sill it with the table !</p>
        </div>
        <button onClick={()=>{navigate('/dashboard/recipesList/')}} className='btn btn-success p-3'>Fill Recipes <i className='fa fa-arrow-alt-circle-right mx-2'></i></button>
      </div>
    </>
  )
}
