
import {GoogleButton} from "react-google-button"
import React, { useEffect } from 'react'
import { signInWithPopup  } from "firebase/auth"
import { auth, db, provider } from "../utils/firebase"
import { useNavigate } from "react-router-dom"
import { doc, getDoc, setDoc } from "firebase/firestore"



export const GoogleAuthButton = () => {
    const navigate = useNavigate()

    const googleAuth = async () => {
        try{
            
            const res = await signInWithPopup(auth,provider)
            
            const userChatsRef = doc(db,"userChats",res.user.uid)

            const chatsRes = await getDoc(userChatsRef)

            if(!chatsRes.exists()){
                await setDoc(userChatsRef,{})
            }

            navigate("/chat")

        }
        catch (e){
            console.log("error is", e)
        }
    }


  return (
    
        <GoogleButton onClick={() => googleAuth()}/>
    
  )
}
