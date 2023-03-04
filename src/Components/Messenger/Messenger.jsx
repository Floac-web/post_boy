


import React from 'react'
import { ChatBody } from './ChatBody/ChatBody'
import { ChatList } from './ChatList/ChatList'
import "./messanger.css"

export const Messenger = () => {
  return (
    <div className='messanger'>
        <ChatList/>
        <ChatBody/>
    </div>
  )
}
