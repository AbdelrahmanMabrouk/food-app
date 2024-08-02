// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
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


function App() {

  const routes = createBrowserRouter([

    {
      path: '',
      element: <AuthLayout />,
      errorElement: <NotFound />,
      children: [
        { index: true, element: <Login /> },
        { path: 'login', element: <Login /> },
        { path: 'forgetPass', element: <ForgetPass /> },
        { path: 'resetPass', element: <ResetPass /> },
        { path: 'register', element: <Register /> },
      ]
    },
    {
      path: 'home',
      element: <MasterLayout />,
      errorElement: <NotFound />,
      children: [
        { index: true, element: <Home /> },
        { path: 'home', element: <Home /> },
        { path: 'recipesList', element: <RecipesList /> },
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
