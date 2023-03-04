

import { doc, getDoc, query, where } from 'firebase/firestore'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { UserAuth } from '../../../contexts/AuthContext'

import { UserChat } from '../../../contexts/ChatContex'

import userImg from "../../../Img/user.png"
import { combinedChatUid } from '../../../utils/combinedChatUid'
import { db } from '../../../utils/firebase'


export const ChatListItem = ({userInfo, lastMessage}) => {

    //const curentUser = UserAuth()
    const {chatData,dispatch} = UserChat()
    //const [lastMessage, setLastMessage] = useState("")
    const {name, photoUrl,uid} = userInfo
    
    const chatSelect = async() => {
        dispatch({type:"CHANGE__USER", payload: userInfo})
    }

    // useEffect(() => {
    //     if(chatData){
    //         setLastMessage(realtimeChatList[combinedChatUid(curentUser.uid,uid)]
    //         .lastMessage)
    //     }
        
    // },[realtimeChatList])

    
    
    return (
        <div className={`${chatData.user.uid === uid ? "chat-list__conversation_active" : ""} chat-list__conversation conversation`} 
        onClick={() => chatSelect()}>
            <div className="conversation__item" >
                <div className="conversation__img">
                    <img src={photoUrl || userImg} 
                                          onError={({currentTarget}) => {
                                            currentTarget.src = userImg
                                          }} alt="" />
                </div>
                <div className="conversation__description">
                    <div className="conversation__title">{name}</div>
                    <div className="conversation__last-message">{lastMessage}</div>
                </div>
            </div>
    </div>
    )
}
