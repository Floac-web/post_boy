

import React from 'react'
import { UserChat } from '../../../../contexts/ChatContex'
import { ArrowLeft } from '../../../../Img/ArrowLeft'
import { DeleteChatButton } from '../../../deleteChatButton/DeleteChatButton'
import userImgUrl from "../../../../Img/user.png"
import "./chatBodyHeader.css"
import { useEffect } from 'react'

export const ChatBodyHeader = () => {

    const {chatData,dispatch} = UserChat()

    const { name, photoUrl, uid} = chatData.user

    const removeChat = () => {
        if(chatData){
          dispatch({type: "REMOVE__CHAT"})
        }
      }
    

    return (
        <div className="chat-body__header">
            <div className="chat-body__chat-user chat-user">
                <div className="chat-body__remove-chat-btn" onClick={() => removeChat()}>
                <ArrowLeft/>
                </div>
                <div className="chat-user__img">
                <img src={photoUrl || userImgUrl}                                        onError={({currentTarget}) => {
                                            currentTarget.src = userImgUrl
                                          }} alt="" />
                </div>
                <div className="chat-user__description">
                <div className="chat-user__name">{name}</div>
                </div>
            </div>
            <DeleteChatButton className="chat-body__delete-Chat-Btn"/>
    </div>
    )
}
