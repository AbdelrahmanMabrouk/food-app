// import { useState } from 'react'  
import { createBrowserRouter, createHashRouter, RouterProvider } from 'react-router-dom'
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
import VerifyAccount from './modules/Authentication/Components/VerifyAccount/VerifyAccount'
import Favourites from './modules/Recipes/Components/Favourites/Favourites'
import ProtectedRouteAdmin from './modules/Shared/Components/ProtectedRoute/ProtectedRouteAdmin'


function App() {



  const routes = createHashRouter([

    {
      path: '',
      element: <AuthLayout />,
      errorElement: <NotFound />,
      children: [
        { index: true, element: <Login saveLoginData /> },
        { path: 'login', element: <Login /> },
        { path: 'forgetPass', element: <ForgetPass /> },
        { path: 'resetPass', element: <ResetPass /> },
        { path: 'register', element: <Register /> },
        { path: 'verify-Account', element: <VerifyAccount /> },
      ]
    },
    {
      path: 'dashboard',
      element: <ProtectedRoute> <MasterLayout /></ProtectedRoute>,
      errorElement: <NotFound />,
      children: [
        { index: true, element: <Home /> },
        { path: 'home', element: <Home /> },
        { path: 'recipesList', element: <RecipesList /> },
        { path: 'recipe-data', element: <ProtectedRouteAdmin><RecipeData /></ProtectedRouteAdmin> },
        { path: 'favourites', element: <Favourites /> },
        { path: 'categories', element: <ProtectedRouteAdmin> <CategoriesList /></ProtectedRouteAdmin> },
        { path: 'users', element: <ProtectedRouteAdmin><UsersList /></ProtectedRouteAdmin> },
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
