


import { async } from '@firebase/util'
import { arrayUnion, doc, serverTimestamp, Timestamp, updateDoc } from 'firebase/firestore'
import React from 'react'
import { useState } from 'react'
import { UserAuth } from '../../../../contexts/AuthContext'
import { UserChat } from '../../../../contexts/ChatContex'
import { SendSvg } from '../../../../Img/SendSvg'
import { db } from '../../../../utils/firebase'
import {v4 as uuid} from "uuid"

export const SenderMessages = ({className}) => {

    const curentUser = UserAuth()
    const {chatData} = UserChat()

    const [value, setValue] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault()
        e.target[0].focus()
        
        if(value !== "" && curentUser && chatData.chatId){
            setValue("")
            
            const chatRef = doc(db,"chats",chatData.chatId)
            await updateDoc(chatRef,{
                messages: arrayUnion({
                    text: value,
                    id: uuid(),
                    senderId: curentUser.uid,
                    date: Timestamp.now()
                })
            })

            await updateDoc(doc(db,"userChats", curentUser.uid),{
                [chatData.chatId+".lastMessage"]: value,
                [chatData.chatId+".date"]: serverTimestamp()
            })

            await updateDoc(doc(db,"userChats", chatData.user.uid),{
                [chatData.chatId+".lastMessage"]: value,
                [chatData.chatId+".date"]: serverTimestamp()
            })

            
        }
    }

    return (
        <form className={`${className} form`} onSubmit={(e) => handleSubmit(e)}>
                <input type="text" className='input' placeholder='Повідомлення' 
                onInput={e => setValue(e.target.value)}
                value={value}
                />
                <button className='btn'><SendSvg/></button>
        </form>
    )
}
