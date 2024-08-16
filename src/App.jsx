// import { useState } from 'react'  
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import './App.css'
import AuthLayout from './modules/Shared/Components/AuthLayout/AuthLayout'
import Login from './modules/Authentication/Components/Login/Login'
import ForgetPass from './modules/Authentication/Components/ForgetPass/ForgetPass'
import ResetPass from './modules/Authentication/Components/ResetPass/ResetPass'
import Register from './modules/Authentication/Components/Register/Register'
import Home from './modules/Home/Components/Home/Home'
import MasterLayout from './modules/Shared/Components/MasterLayout/MasterLayout'
import RecipesList from './modules/Recipes/Components/RecipesList/RecipesList'
import CategoriesList from './modules/Categories/Components/CategoriesList/CategoriesList'
import UsersList from './modules/Users/Components/UsersList/UsersList'
import NotFound from './modules/Shared/Components/NotFound/NotFound'
import { ToastContainer } from 'react-toastify';
import { useEffect, useState } from 'react'
import { jwtDecode } from 'jwt-decode'
import ProtectedRoute from './modules/Shared/Components/ProtectedRoute/ProtectedRoute'
import 'react-toastify/dist/ReactToastify.css';
import RecipeData from './modules/Recipes/Components/RecipeData/RecipeData'


function App() {

  const [loginData, setLoginData] = useState(null)

  let saveLoginData = () => {

    let encodedToken = localStorage.getItem('token')

    let decodedToken = jwtDecode(encodedToken)

    setLoginData(decodedToken);

  };

  useEffect (() => {
      
    if (localStorage.getItem('token')) {
      saveLoginData()
    }
  }, [])

  const routes = createBrowserRouter([

    {
      path: '',
      element: <AuthLayout />,
      errorElement: <NotFound />,
      children: [
        { index: true, element: <Login saveLoginData={saveLoginData} /> },
        { path: 'login', element: <Login saveLoginData={saveLoginData} /> },
        { path: 'forgetPass', element: <ForgetPass /> },
        { path: 'resetPass', element: <ResetPass /> },
        { path: 'register', element: <Register /> },
      ]
    },
    {
      path:'dashboard',
      element: <ProtectedRoute> <MasterLayout loginData={loginData}/></ProtectedRoute>,
      errorElement: <NotFound />,
      children: [
        { index: true, element: <Home loginData={loginData} /> },
        { path: 'home', element:<Home/>},
        { path: 'recipesList', element: <RecipesList /> },
        { path: 'recipe-data', element: <RecipeData /> },
        { path: 'categories', element: <CategoriesList /> },
        { path: 'users', element: <UsersList /> },
      ]

    }


  ])

  return (
    <>
      <ToastContainer />

      <RouterProvider router={routes} />
    </>
  )
}

export default App
