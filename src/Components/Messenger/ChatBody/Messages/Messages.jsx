


import { doc, onSnapshot } from 'firebase/firestore'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { UserChat } from '../../../../contexts/ChatContex'
import { db } from '../../../../utils/firebase'
import { Message } from './Message'
import "./messages.css"

export const Messages = ({className}) => {

    const [messages, setMessages] = useState([])
    const {chatData} = UserChat()

    useEffect(() => {
        if(chatData.chatId){
            const mesegesRef = doc(db,"chats", chatData.chatId)
            const unSub = onSnapshot(mesegesRef,(doc) => {
                doc.exists() && setMessages(doc.data().messages)
            })
    
            return () => {unSub()}
        } else{
            setMessages(null)
        }

    },[chatData.chatId])

    return (
        <div className={`${className} messages`}>
            {messages?.map(m => <Message message={m} key={m.id}/>)}
        </div>
    )
}
