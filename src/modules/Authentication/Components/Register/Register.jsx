import axios from 'axios';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom';
import { USERS_URLS } from '../../../../assets/Constants/END_POINTS';
import { toast } from 'react-toastify';






export default function Register() {

  let navigate = useNavigate()

  let [isPasswordVisibale, setIsPasswordVisibale] = useState(false)


  let { register, handleSubmit, formState: { errors }, watch } = useForm()


  const appendFormData = (data) => {

    const formData = new FormData()

    formData.append('userName', data.userName)
    formData.append('email', data.email)
    formData.append('country', data.country)
    formData.append('phoneNumber', data.phoneNumber)
    formData.append('password', data.password)
    formData.append('confirmPassword', data.confirmPassword)
    formData.append('profileImage', data.profileImage[0])

    return formData
  }



  let onSubmit =  async (data) => {

    let registerData = appendFormData(data);
    try {
      let response = await axios.post(USERS_URLS.register,registerData)
      console.log(response);
      navigate('/verify-Account')
      toast.success(response.data.message)
      
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message)
    }
  

  }




  return (
    <>

      <h3>Register</h3>
      <span className='text-muted'>Welcome Back! Please enter your details</span>

      <form onSubmit={handleSubmit(onSubmit)} className='my-4'>

        <div className="row">
          <div className="col-md-6">
            <div className="mb-3">
              <div className="input-group">
                <span className="input-group-text" id="basic-addon1"><i className="fa-solid fa-mobile-screen"></i></span>
                <input type="userName" className="form-control" placeholder="UserName" aria-label="UserName" aria-describedby="basic-addon1"
                  {...register('userName', {
                    required: 'userName is required',
                  })}
                />
              </div>
              {errors.userName && <p className='text-danger'>{errors.userName.message}</p>}
            </div>
          </div>
          <div className="col-md-6">
            <div className="mb-3">
              <div className="input-group">
                <span className="input-group-text" id="basic-addon1"><i className="fa-solid fa-envelope"></i></span>
                <input type="text" className="form-control " placeholder="Enter your E-mail" aria-label="E-mail" aria-describedby="basic-addon1"
                  {...register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                      message: 'Email must be vaild'
                    }

                  })}
                />
              </div>
              {errors.email && <p className='text-danger'>{errors.email.message}</p>}
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <div className="mb-3">
              <div className="input-group">
                <span className="input-group-text" id="basic-addon1"><i className="fa-solid fa-globe"></i></span>
                <input type="text" className="form-control" placeholder="Country" aria-label="Country" aria-describedby="basic-addon1"
                  {...register('country', {
                    required: 'country  is required',
                  })}
                />
              </div>
              {errors.country && <p className='text-danger'>{errors.country.message}</p>}
            </div>
          </div>
          <div className="col-md-6">
            <div className="mb-3">
              <div className="input-group">
                <span className="input-group-text" id="basic-addon1"><i className="fa-solid fa-mobile-screen"></i></span>
                <input type="phoneNumber" className="form-control " placeholder="phoneNumber" aria-label="phoneNumber" aria-describedby="basic-addon1"
                  {...register('phoneNumber', {
                    required: 'phoneNumber is required',
                  })}
                />
              </div>
              {errors.PhoneNumber && <p className='text-danger'>{errors.PhoneNumber.message}</p>}
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <div className="mb-3">
              <div className="input-group ">
                <span className="input-group-text" id="basic-addon1"><i className="fas fa-lock" /></span>
                <input type={isPasswordVisibale ? 'text' : 'password'} className="form-control" placeholder="password" aria-label="password" aria-describedby="basic-addon1"
                  {...register('password', {
                    required: 'password is required',
                    pattern: {
                      value: /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/,
                      message: 'password must be at least 8 characters'
                    }
                  })}
                />
                <button onMouseDown={(e) => { e.preventDefault() }} onMouseUp={(e) => { e.preventDefault() }} type='button' onClick={() => { setIsPasswordVisibale(prev => !prev) }} className="input-group-text" >
                  <span className='sr-only'>{isPasswordVisibale ? 'hide password' : 'show password'}</span>
                  <i className={`fa  ${isPasswordVisibale ? 'fa-eye-slash' : 'fa-eye'} `} id="basic-addon1" /> </button>
              </div>

              {errors.password && <p className='text-danger'>{errors.password.message}</p>}

            </div>
          </div>
          <div className="col-md-6">
            <div className="mb-3">
              <div className="input-group ">
                <span className="input-group-text" id="basic-addon1"><i className="fas fa-lock" /></span>
                <input type={isPasswordVisibale ? 'text' : 'password'} className="form-control" placeholder="Confirm Password" aria-label="E-mail" aria-describedby="basic-addon1"
                  {...register('confirmPassword', {
                    required: 'Confirm password is required',
                    validate: (value) => value == watch("password") || "password don't match",
                    pattern: {
                      value: /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/,
                      message: 'password must be at least 8 characters',
                    },

                  })}

                />
                <button onMouseDown={(e) => { e.preventDefault() }} onMouseUp={(e) => { e.preventDefault() }} type='button' onClick={() => { setIsPasswordVisibale(prev => !prev) }} className="input-group-text" >
                  <span className='sr-only'>{isPasswordVisibale ? 'hide password' : 'show password'}</span>
                  <i className={`fa  ${isPasswordVisibale ? 'fa-eye-slash' : 'fa-eye'} `} id="basic-addon1" /> </button>
              </div>

              {errors.confirmPassword && <p className='text-danger'>{errors.confirmPassword.message}</p>}

            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-12">
            <div className="mb-3">
              <div className="input-group ">
                <span className="input-group-text" id="basic-addon1"><i className="fa-solid fa-image" /></span>
                <input type='file' className="form-control" placeholder="profileImage" aria-label="profileImage" aria-describedby="basic-addon1"
                  {...register('profileImage', {
                    required: 'profileImage is required',
                  })}
                /> 
              </div>
                {errors.profileImage && <p className='text-danger'>{errors.profileImage.message}</p>}
            </div>
          </div>
        </div>




        <div className="login-link d-flex ms-auto my-2">
          <Link to={'/login'} className='text-decoration-none text-success d-flex ms-auto' >Login Now?</Link>
        </div>

        <button className='btn btn-success d-block w-75 m-auto text-center'>Register</button>
      </form>



    </>
  )
}
