import React, { useEffect } from 'react'
import logo from '../../../../assets/images/logo.png'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';





export default function Login() {
  let navigate = useNavigate()
  // const togglePassword = document.querySelector("#togglePassword");
  // const password = document.querySelector("#password");

  // function toggle() {
  //   togglePassword.addEventListener("click", function () {

  //     // toggle the type attribute
  //     const type = password.getAttribute("type") === "password" ? "text" : "password";
  //     password.setAttribute("type", type);

  //     // toggle the eye icon
  //     this.classList.toggle('fa-eye');
  //     });

  // } 

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

      navigate('/home')


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
      <div className="auth-container bg-warning">
        <div className="container-fluid bg-overlay">
          <div className="row vh-100 justify-content-center align-items-center">
            <div className="col-md-5 bg-white p-5 rounded rounded-2">
              <div className="">
                <div className="text-center">
                 <Link to={'/login'}> <img src={logo} alt="food-logo" className='w-50' /></Link>
                </div>

                <form onSubmit={handleSubmit(onSubmite)}>
                  <h4>Log In</h4>
                  <p className='texted-muted fw-light'>Welcome Back! Please enter your details</p>
                  <div className="input-group mb-4">
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


                  <div className="input-group mb-3"  >
                    <span className="input-group-text"><i className="fas fa-lock" /></span>
                    <input className="form-control" id="password" name="password" placeholder="Password" type='password'

                      {...register('password', {
                        required: 'password is required',
                        // pattern: {
                        //   value: /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/,
                        //   message: 'password must be at least 8 characters'
                        // }
                      })}

                    />
                    <span className="input-group-text"  ><i className="far fa-eye-slash" id="togglePassword" /> </span>
                  </div>

                  {errors.password && <p className='text-danger'>{errors.password.message}</p>}


                  <div className="links d-flex justify-content-between ">
                    <Link to={'/register'} className='text-decoration-none text-black'>Register Now?</Link>
                    <Link to={'/forgetPass'} className='text-decoration-none text-success'>Forgot Password?</Link>
                  </div>


                  <button type='submit' className='btn btn-success d-block w-100 p-2 mt-4'>Login</button>

                </form>
              </div>
            </div>
          </div>
        </div>
      </div>



    </>
  )
}
