


import React from 'react'
import { Messenger } from '../../Components/Messenger/Messenger'
import { Header } from '../../Components/header/Header'
import "./chatPage.css"
import { UserAuth } from '../../contexts/AuthContext'
import {LoadingPage} from "../../Components/LoadingPage/LoadingPage"
import { Outlet } from 'react-router-dom'



export const ChatPage = () => {
  const currentUser = UserAuth()

  if(!currentUser) {
    return (<LoadingPage/>)
  }
  
  return (
    <div className='post-boy'>
        <Header/>
        <Messenger/>
        {/* <Outlet/> */}
    </div>
  )


  
}
