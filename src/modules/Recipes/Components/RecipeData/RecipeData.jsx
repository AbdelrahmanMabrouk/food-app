import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function RecipeData() {

  let navigate = useNavigate()
  return (
    <>  <div className="home-data d-flex justify-content-around align-items-center my-4 p-3">
      <div className="home-title">
        <h5>Fill the <span className='text-success'>Recipes</span> !</h5>
        <p>you can now fill the meals easily using the table and form , click here and sill it with the table !</p>
      </div>
      <button onClick={() => { navigate('/dashboard/recipesList/') }} className='btn btn-success p-3'>All Recipes <i className='fa fa-arrow-alt-circle-right mx-2'></i></button>
    </div>

      <form className='w-50 m-auto'>

        <input type="text" className="form-control my-2" placeholder="Recipe Name" aria-label="E-mail" aria-describedby="basic-addon1"
        // {...register('email', {
        //   required: 'Email is required',
        // })}
        />
        <select type="dropdown" className="form-control my-2" placeholder="Tag">
          <option>Tag</option>
          <option></option>
          <option></option>

        </select>

        <input type="text" className="form-control my-2" placeholder="price" aria-label="price" aria-describedby="basic-addon1"
        // {...register('email', {
        //   required: 'Email is required',
        // })}
        />

        <select type="dropdown" className="form-control my-2" placeholder="Categ">
          <option>Categ</option>
          <option></option>
          <option></option>

        </select>


        <textarea className="form-control my-2" placeholder="Description" aria-label="Description" aria-describedby="basic-addon1">


        </textarea>


      </form>

    </>
  )
}
