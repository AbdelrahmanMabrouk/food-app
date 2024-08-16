import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ForgetPass() {

  let navigate = useNavigate()
  let { register,
    handleSubmit,
    formState: { errors , isSubmitting },

  } = useForm()

  let onSubmite = async (data) => {

    try {

      let response = await axios.post('https://upskilling-egypt.com:3006/api/v1/Users/Reset/Request', data)

      console.log(response);
      toast.success(response.data.message, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      navigate('/resetPass')


    } catch (error) {
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
        <h4>Forgot Your Password?</h4>
        <p className='texted-muted fw-light'>No worries! Please enter your email and we will send a password reset link </p>
        <div className="mb-4">
          <div className="input-group ">
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
        <button type='submit' className='btn btn-success d-block w-100 p-2 mt-4' disabled={isSubmitting}>Submit</button>

      </form>



    </>
  )
}
