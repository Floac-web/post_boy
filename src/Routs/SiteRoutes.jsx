


import React from 'react'
import { useEffect } from 'react'
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import { Header } from '../Components/header/Header'
import { Messenger } from '../Components/Messenger/Messenger'
import { UserEdit } from '../Components/UserEdit/UserEdit'
import { UserAuth } from '../contexts/AuthContext'
import { EmaiVerificationPage } from '../Pages/AuthPages/EmaiVerificationPage'
import { ForgotPasswordPage } from '../Pages/AuthPages/ForgotPasswordPage'
import { LoginPage } from '../Pages/AuthPages/LoginPage'
import { RegistrationPage } from '../Pages/AuthPages/RegistrationPage'
import { ChatPage } from '../Pages/ChatPage/ChatPage'
import { UserEditPage } from '../Pages/UserEditPage/UserEditPage'

export const MAIN__ROUTE = "/"
export const GIT__NAME__ROUTE = "/post-boy/"
export const CHAT__ROUTE = "/chat"
export const USER__EDIT__ROUTE = '/edit'
export const LOGIN__ROUTE = "/login"
export const SIGNUP__ROUTE = "/registration"
export const EMAIL__VERIFICATION__ROUTE = "/emailVerification"
export const FORGOT__PASSWORD__ROUTE = "/forgot-password"
export const RESET__PASSWORD__ROUTE = "/reset-password"

export const SiteRoutes = () => {

  const curentUser = UserAuth()
 


  const ProtectedChatRoute = ({children}) => {
    if(curentUser === null || (curentUser && !curentUser.emailVerified)){
      return <Navigate to={LOGIN__ROUTE}/>
    }

    return children

  }

  const ProtectedVerificationRoute = ({children}) => {
    if(curentUser === null || (curentUser && curentUser.emailVerified)){
      return <Navigate to={LOGIN__ROUTE}/>
    }

    return children
  }

  
  return (
    <Routes>
      {/* <Route path={GIT__NAME__ROUTE} element={<Navigate to={LOGIN__ROUTE} />}/>
      <Route path={CHAT__ROUTE} element={<ProtectedChatRoute><ChatPage/></ProtectedChatRoute>}/> */}
      {/* <Route path={GIT__NAME__ROUTE} element={<ProtectedChatRoute><ChatPage/></ProtectedChatRoute>}>
        <Route path={GIT__NAME__ROUTE + CHAT__ROUTE} element={<Messenger/>}/>
        <Route path={GIT__NAME__ROUTE + USER__EDIT__ROUTE} element={<UserEdit/>}/>
      </Route> */}
      <Route path={GIT__NAME__ROUTE} element={<Navigate to={CHAT__ROUTE} />}/>
      <Route path={MAIN__ROUTE} element={<Navigate to={CHAT__ROUTE} />}/>
      {/* <Route path={MAIN__ROUTE} element={<ProtectedChatRoute><ChatPage/></ProtectedChatRoute>}>
        <Route path={CHAT__ROUTE} element={<Messenger/>}/>
        <Route path={USER__EDIT__ROUTE} element={<UserEdit/>}/>
      </Route> */}
      <Route path={CHAT__ROUTE} element={<ProtectedChatRoute><ChatPage/></ProtectedChatRoute>}/>
      <Route path={USER__EDIT__ROUTE} element={<ProtectedChatRoute><UserEditPage/></ProtectedChatRoute>}/>
      
      <Route path={LOGIN__ROUTE} element={<LoginPage/>}/>
      <Route path={SIGNUP__ROUTE} element={<RegistrationPage/>}/>
      <Route path={EMAIL__VERIFICATION__ROUTE} element={<ProtectedVerificationRoute><EmaiVerificationPage/></ProtectedVerificationRoute>}/>
      <Route path={FORGOT__PASSWORD__ROUTE} element={<ForgotPasswordPage/>}/>
    </Routes>
  )
}
