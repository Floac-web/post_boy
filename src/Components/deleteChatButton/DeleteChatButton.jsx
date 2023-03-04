


import { deleteField, doc, updateDoc } from 'firebase/firestore'
import React from 'react'
import { UserAuth } from '../../contexts/AuthContext'
import { UserChat } from '../../contexts/ChatContex'
import { DeleteSvg } from '../../Img/DeleteSvg'
import { db } from '../../utils/firebase'
import "./deleteChatButton.css"

export const DeleteChatButton = ({className}) => {

  const {chatData,dispatch} = UserChat();
  const curentUser = UserAuth()

  const deleteChat = async e => {
    if(chatData.chatId){
      const chatId = chatData.chatId
      const curentUserChatsRef = doc(db,"userChats", curentUser.uid)
      await updateDoc(curentUserChatsRef,{
        [chatId]: deleteField()
      })

      const companionChatsRef = doc(db,"userChats", chatData.user.uid)
      await updateDoc(companionChatsRef,{
        [chatId]: deleteField()
      })
      // console.log(curentUser.uid, chatData.chatId, "firstMove")
      // console.log(chatData.user.uid, chatData.chatId, "secondMove")

      const chatRef = doc(db,"chats",chatId)
      await updateDoc(chatRef,{
        messages: deleteField()
      })

      dispatch({type: "REMOVE__CHAT"})
      // console.log(chatData.chatId,"thirdMove")
    }
  }
  
  return (
    <div className={`${className ? className : ""} delete-Chat-Btn btn`} onClick={e => deleteChat(e)}>
        <DeleteSvg/>
    </div>
  )
}
