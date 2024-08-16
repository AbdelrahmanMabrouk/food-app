import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from '../../../../modules/Shared/Components/AuthLayout/Auth.module.css'
import { EmailValidations } from '../../../../assets/Constants/Validations.js';




export default function Login({ saveLoginData }) {

  let [isPasswordVisibale, setIsPasswordVisibale] = useState(false)

  let navigate = useNavigate()

  let { register,
    handleSubmit,
    formState: { errors },

  } = useForm()

  let onSubmite = async (data) => {

    //success
    //failure

    try {

      let response = await axios.post('https://upskilling-egypt.com:3006/api/v1/Users/Login', data)

      console.log(response);
      localStorage.setItem('token', response?.data.token);
      saveLoginData();
      toast.success('Login successfully', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });

      navigate('/dashboard')


    } catch (error) {
      // toast.error(error.response.data.message);
      toast.error(error.response.data.message, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });

    }

  }



  return (
    <>

      <form onSubmit={handleSubmit(onSubmite)}>
        <div className={styles['form-header']}>
          <h3>Log In</h3>
          <p>Welcome Back! Please enter your details</p>
        </div>
        <div className="mb-4">
          <div className="input-group">
            <span className="input-group-text" id="basic-addon1"><i className="fa-solid fa-envelope"></i></span>
            <input type="text" className="form-control" placeholder="Enter your E-mail" aria-label="E-mail" aria-describedby="basic-addon1"
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

        <div className="mb-3">
          <div className="input-group ">
            <span className="input-group-text" id="basic-addon1"><i className="fas fa-lock" /></span>
            <input type={isPasswordVisibale ? 'text' : 'password'} className="form-control" placeholder="Password" aria-label="E-mail" aria-describedby="basic-addon1"
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
              <i className={`fa ${isPasswordVisibale ? 'fa-eye-slash' : 'fa-eye'}`} id="basic-addon1" /> </button>
          </div>

          {errors.password && <p className='text-danger'>{errors.password.message}</p>}

        </div>


        <div className="links d-flex justify-content-between ">
          <Link to={'/register'} className='text-decoration-none text-black'>Register Now?</Link>
          <Link to={'/forgetPass'} className='text-decoration-none text-success'>Forgot Password?</Link>
        </div>
        <button type='submit' className='btn btn-success d-block w-100 p-2 mt-4'>Login</button>
      </form>



    </>
  )
}
