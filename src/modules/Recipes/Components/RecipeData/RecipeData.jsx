import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CATEGORIES_URLS, GETALLTAGS, RECIPES_URLS } from '../../../../assets/Constants/END_POINTS'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

export default function RecipeData() {

  let { register, handleSubmit, formState: { errors } } = useForm()

  let navigate = useNavigate()

  let [tagsList, setTagsList] = useState([])
  const [categoryList, setCategoryList] = useState([]);

  let getAllTags = async () => {

    try {
      let response = await axios.get(GETALLTAGS, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      })
      setTagsList(response.data)
      console.log(response.data);

    } catch (error) {
      console.log(error);

    }

  }

  let getCategoriesList = async () => {
    try {
      let response = await axios.get(CATEGORIES_URLS.getList,
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      
        params:{pageSize:1000}
      }

      );
      console.log(response.data.data);
      setCategoryList(response.data.data);



    } catch (error) {
      console.log(error);
    }
  }


  useEffect(() => {
    getAllTags()
    getCategoriesList()
  }, [])


  const appendFormData = (data) => {

    const formData = new FormData()

    formData.append('name', data.name)
    formData.append('price', data.price)
    formData.append('description', data.description)
    formData.append('tagId', data.tagId)
    formData.append('categoriesIds', data.categoriesIds)
    formData.append('recipeImage', data.recipeImage[0])

    return formData
  }


  let onSubmit = async (data) => {

    let recipeData = appendFormData(data);

    try {

      let response = await axios.post(RECIPES_URLS.create, recipeData, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      })

      navigate('/dashboard/recipesList')
      toast.success(response.data.message)
      console.log(response);


    } catch (error) {
      toast.info('not added')

      console.log(error);

    }


  }




  return (
    <>  <div className="home-data d-flex justify-content-around align-items-center my-4 p-3">
      <div className="home-title">
        <h5>Fill the <span className='text-success'>Recipes</span> !</h5>
        <p>you can now fill the meals easily using the table and form , click here and sill it with the table !</p>
      </div>
      <button onClick={() => { navigate('/dashboard/recipesList/') }} className='btn btn-success p-3'>All Recipes <i className='fa fa-arrow-alt-circle-right mx-2'></i></button>
    </div>

      <form className='w-50 m-auto' onSubmit={handleSubmit(onSubmit)}>

        <input type="text" className="form-control my-2" placeholder="Recipe Name" aria-label="E-mail" aria-describedby="basic-addon1"
          {...register('name', {
            required: 'name is required',
          })}
        />
        {errors.name && <span className='text-danger'>{errors.name.message}</span>}

        <select className="form-control my-2 form-select" placeholder="Tag" {...register('tagId', {
          required: 'tag is required',
        })}>
          <option value='' hidden > select tag</option>
          {tagsList.map(tag => <option key={tag.id} value={tag.id}>{tag.name}</option>)},
        </select>
        {errors.tagId && <span className='text-danger'>{errors.tagId.message}</span>}


        <input type="text" className="form-control my-2 " placeholder="price" aria-label="price" aria-describedby="basic-addon1"
          {...register('price', {
            required: 'price is required',
          })}
        />
        {errors.price && <span className='text-danger'>{errors.price.message}</span>}


        <select className="form-control my-2 form-select" placeholder="category"  {...register('categoriesIds', {
          required: 'category is required',
        })} >
          <option value='' hidden > select category</option>
          {categoryList.map((category) => (
            <option key={category.id} value={category.id}>{category.name}</option>
          ))}

        </select>

        {errors.categoriesIds && <span className='text-danger'>{errors.categoriesIds.message}</span>}
        <textarea className="form-control my-2" placeholder="Description" aria-label="Description" aria-describedby="basic-addon1"
          {...register('description', {
            required: 'description is required',
          })} >
        </textarea>
        {errors.description && <span className='text-danger'>{errors.description.message}</span>}

        <input type="file" className="form-control my-2" placeholder="upload image" aria-label="upload image" aria-describedby="basic-addon1"
          {...register('recipeImage', {
            required: 'Image is required',
          })}
        />
        {errors.recipeImage && <span className='text-danger'>{errors.recipeImage.message}</span>}
        <div className="w-25 d-flex ms-auto my-5">
          <button className='btn btn-outline-success px-4'>cancel</button>
          <button className='btn btn-success mx-3 px-4'>save</button>
        </div>
      </form>

    </>
  )
}
