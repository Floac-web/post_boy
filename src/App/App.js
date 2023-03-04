

import React, { useEffect } from 'react'
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import { UserAuth } from '../contexts/AuthContext'
import { ChatPage } from '../Pages/ChatPage/ChatPage'
import { LoadingPage } from '../Components/LoadingPage/LoadingPage'
import { LoginPage } from '../Pages/AuthPages/LoginPage'
import { RegistrationPage } from '../Pages/AuthPages/RegistrationPage'
import { EmaiVerificationPage } from '../Pages/AuthPages/EmaiVerificationPage'
import { SiteRoutes } from '../Routs/SiteRoutes'

const App = () => {
  
  // const curentUser = UserAuth()
  // const navigate = useNavigate()
  
  // useEffect(() => {
  //   if(curentUser === null){
  //     navigate("/login")
  //   }
  //   else if(curentUser){
  //     navigate("/chat")
  //   }
  // },[curentUser])

  // console.log(curentUser)

  // const ProtectedRoute = ({children}) => {
  //   if(!curentUser){
  //     return <Navigate to="/login"/>
  //   } else if(!curentUser.emailVerified){
  //     return <Navigate to="/emailVerification"/>
  //   }

  //   return children
  // }

  // const ProtectedEmailVerificationRoute = ({children}) => {
  //   if(curentUser !== undefined && !curentUser.emailVerified){
  //     return children
  //   }

  //   return <Navigate to="/registration"/>
  // }

  // const ProtectedRoute = ({children}) => {
  //   if(curentUser === null && !curentUser.emailVerified){
  //     return 
  //   }


  // }


  return (
    <SiteRoutes/>
  )
}

export default App
