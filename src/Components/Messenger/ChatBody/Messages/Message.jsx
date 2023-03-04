
import React from 'react'
import { useEffect } from 'react'
import { useRef } from 'react'
import { UserAuth } from '../../../../contexts/AuthContext'

export const Message = ({message}) => {

    const curentUser = UserAuth()

    const ref = useRef()
    
    useEffect(() => {
        ref.current?.scrollIntoView({behavior: "smooth"})
    },[message])


    return (
        <div ref={ref} className={`${message.senderId === curentUser.uid ? "messages__own-message"
        : "messages__alien-message"} message`}>
        <p>{message.text}</p>
        </div>
    )
}
