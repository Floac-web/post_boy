

import React from 'react'
import { UserChat } from '../../../contexts/ChatContex'
import { ArrowLeft } from '../../../Img/ArrowLeft'
import userImgUrl from "../../../Img/user.png"
import { DeleteChatButton } from '../../deleteChatButton/DeleteChatButton'
import { SignOutButton } from '../../SignOutButton'
import "./chat-body.css"
import { ChatBodyHeader } from './ChatBodyHeader/ChatBodyHeader'
import { Messages } from './Messages/Messages'
import { SenderMessages } from './SenderMessages/SenderMessages'

export const ChatBody = () => {

  const {chatData} = UserChat()

  const {uid} = chatData.user
  return (
    <div className={`${uid ? "chat-body_active": ""} chat-body`}>
        <ChatBodyHeader/>
        <div className="chat-body__messages-wrapper">
          <Messages className="chat-body__messages"/>
        </div>
        <div className="chat-body__input-wrapper">
            <SenderMessages className="chat-body__form"/>
        </div>
    </div>
  )
}
