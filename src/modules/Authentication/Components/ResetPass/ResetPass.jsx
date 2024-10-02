import React, { useState } from 'react'
import logo from '../../../../assets/images/logo.png'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';







export default function ResetPass() {
  let [isPasswordVisibale, setIsPasswordVisibale] = useState(false)
  let navigate = useNavigate()
  let { register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch

  } = useForm()

  let onSubmite = async (data) => {

    try {

      let response = await axios.post('https://upskilling-egypt.com:3006/api/v1/Users/Reset', data)

      console.log(response);
      toast.success(response?.data?.message, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      navigate('/login')


    } catch (error) {
      toast.error(error?.response?.data?.message, {
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
        <h4>Forgot Your Password?</h4>
        <p className='texted-muted fw-light'>No worries! Please enter your email and we will send a password reset link </p>

        <div className=" mb-3">
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
            <input type="text" className="form-control" placeholder="OTP" aria-label="E-mail" aria-describedby="basic-addon1"

              {...register('seed', {
                required: 'OTP is required',
                pattern: {
                  value: '',
                  message: 'OTP must be vaild'

                }

              })}

            />
          </div>
          {errors.seed && <p className='text-danger'>{errors.seed.message}</p>}

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
              <i className={`fa  ${isPasswordVisibale ? 'fa-eye' : 'fa-eye-slash'} `} id="basic-addon1" /> </button>
          </div>

          {errors.password && <p className='text-danger'>{errors.password.message}</p>}

        </div>



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
              <i className={`fa  ${isPasswordVisibale ? 'fa-eye' : 'fa-eye-slash'} `} id="basic-addon1" /> </button>
          </div>

          {errors.confirmPassword && <p className='text-danger'>{errors.confirmPassword.message}</p>}

        </div>

        <button type='submit' className='btn btn-success d-block w-100 p-2 mt-4' disabled={isSubmitting}>Reset Password</button>

      </form>




    </>
  )
}


