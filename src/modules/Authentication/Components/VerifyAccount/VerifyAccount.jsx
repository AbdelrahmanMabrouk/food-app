import axios from 'axios'
import React from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { USERS_URLS } from '../../../../assets/Constants/END_POINTS'

export default function VerifyAccount() {


  let navigate = useNavigate()
  let { register,
    handleSubmit,
    formState: { errors, isSubmitting },

  } = useForm()

  let onSubmite = async (data) => {

    try {

      let response = await axios.put(USERS_URLS.verify, data)

      console.log(response);
      toast.success(response.data.message);
      navigate('/login')


    } catch (error) {
      toast.error(error.response.data.message);
    }

  }



  return (
    <>

      <form onSubmit={handleSubmit(onSubmite)}>
        <h4>Verify Your Account</h4>
        <p className='texted-muted fw-light'>Please enter your email and code </p>
        <div className="mb-3">
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
        <div className="mb-3">
          <div className="input-group ">
            <span className="input-group-text" id="basic-addon1"><i className="fa-solid fa-check"></i></span>
            <input type="text" className="form-control" placeholder="code" aria-label="code" aria-describedby="basic-addon1"

              {...register('code', {
                required: 'code is required',
              })}

            />
          </div>
          {errors.code && <p className='text-danger'>{errors.code.message}</p>}

        </div>
        <button type='submit' className='btn btn-success d-block w-100 p-2 mt-4' disabled={isSubmitting}>Verify</button>

      </form>




    </>
  )
}
