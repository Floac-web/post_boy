


import { doc, getDoc, serverTimestamp, setDoc, updateDoc } from 'firebase/firestore'
import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { UserAuth } from '../../contexts/AuthContext'
import { UserChat } from '../../contexts/ChatContex'
import UserImgUrl from "../../Img/user.png"
import { CHAT__ROUTE, USER__EDIT__ROUTE } from '../../Routs/SiteRoutes'
import { combinedChatUid } from '../../utils/combinedChatUid'
import baseUserProfileImg from "../../Img/user.png"
import { db } from '../../utils/firebase'

export const SearchedUser = ({name, email,markedEmail, uid,photoUrl, setValue, setSearchedUsers}) => {

  const curentUser = UserAuth()
  const {dispatch} = UserChat()
  const location = useLocation()
  const navigate = useNavigate()

  const handleSelect = async () => {
    setValue("")
    setSearchedUsers(null)

    if(location.pathname === USER__EDIT__ROUTE){
      navigate(CHAT__ROUTE)
    }

    const combinedId = combinedChatUid(curentUser.uid,uid)
    const chatRef = doc(db,"chats", combinedId)

    const res = await getDoc(chatRef)
    
    if(res.data() && !res.data().messages){
      await setDoc(chatRef,{messages: []})

      await updateDoc(doc(db,"userChats",curentUser.uid),{
        [combinedId+".userInfo"]: {
          name,email,uid,photoUrl
        },
        [combinedId+".date"]: serverTimestamp()
      })

      await updateDoc(doc(db,"userChats",uid),{
        [combinedId+".userInfo"]: {
          name: curentUser.displayName,
          email: curentUser.email,
          uid: curentUser.uid,
          photoUrl: curentUser.photoURL,
        },
        [combinedId+".date"]: serverTimestamp()
      })

      dispatch({type:"CHANGE__USER", payload:{
        email,name,photoUrl,uid
      }})


    }else if(res.data() && res.data().messages){
      dispatch({type:"CHANGE__USER", payload:{
        email,name,photoUrl,uid
      }})
    }
  }

  return (
    <li className="search__searched-user searched-user" onClick={() => handleSelect()}>
        <div className="searched-user__img">
            <img src={photoUrl || UserImgUrl}
                      onError={({currentTarget}) => {
                        currentTarget.src = baseUserProfileImg
                      }} alt="" />
        </div>
        <div className="searched-user__description">
            <div className="searched-user__name">
                    {name}
            </div>
            <div className="searched-user__email">
                    {markedEmail}
            </div>
        </div>
    </li>
  )
}
