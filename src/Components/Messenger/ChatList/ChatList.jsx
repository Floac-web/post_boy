

import { collection, doc, getDoc, onSnapshot, query } from 'firebase/firestore'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { UserAuth } from '../../../contexts/AuthContext'
import "./chat-list.css"
import { db } from '../../../utils/firebase'
import { ChatListItem } from './ChatListItem'
import { UserChat } from '../../../contexts/ChatContex'
import { async } from '@firebase/util'


export const ChatList = () => {
  // const [chatsArray, setChatsArray] = useState([])
  // const [userChatsArray, setUserChatsArray] = useState([])

  const [chatList, setChatList] = useState([])
  const {chatData, dispatch} = UserChat()
  const curentUser = UserAuth()

  // const localSortChats = (UnsortChatList,chatItemId) => {
  //   const chatListClone = UnsortChatList
  //   const sortedItemIndex = UnsortChatList.findIndex(e => e[0] == chatItemId)
  //   // UnsortChatList[sortedItemIndex][1].date = chatItemRealtimeDate[chatItemId].date
  //   // UnsortChatList[sortedItemIndex][1].lastMessage = chatItemRealtimeDate[chatItemId].lastMessage


  //   const sortedPartOfList = chatListClone.slice(0,sortedItemIndex + 1)
  //   sortedPartOfList.sort((a,b) => b[1].date - a[1].date)
  //   const notSotringPartOfList = chatListClone.slice(sortedItemIndex + 1, chatListClone.length)
  //   setChatList(sortedPartOfList.concat(notSotringPartOfList))
  // }

   function sortList (list) {
    if(list){
      return list.sort((a,b) => (b[1].date - a[1].date))
    }
  }

  // function removeDeletedChat(changedChatList){
  //   // console.log(changedChatList)
  //   // if(changedChatList.every(element => {
  //   //   console.log(element[0] !== chatData.chatId)
  //   //   return element[0] !== chatData.chatId
  //   // })){
  //   //   dispatch({type: "REMOVE__CHAT"})
  //   // }
    
  //   console.log(changedChatList)
   
  // }

  useEffect(() => {
    const setUserChatList = () => {
      // const getChatedUsers = async (chatedUserUid, chatedUserLastMessage,
      //   chatedUserDate, chatId, userChatsListObject) => {
      //   const chatedUserRef = doc(db,"users",chatedUserUid)
      //   //console.log(chatedUserUid,"list")
        
      //   const chatedUserSnap = await getDoc(chatedUserRef)
      //   const chatedUserInfo = chatedUserSnap.data()
      //   userChatsListObject[chatId] = {chatedUserInfo,chatedUserLastMessage,
      //   chatedUserDate, chatId}
      //       //console.log(userChatsListObject)
      //       // if(userChatsArrayLength === 0){
      //       //   setChatList([])
      //       // }else{
      //       //   setChatList(Object.entries(userChatsListObject))
      //       // }
      //   //console.log("changed")
      //   setChatList(Object.entries(userChatsListObject))
      //       // console.log(userChatsListObject)
      //       // delete userChatsListObject[chatId]
      //       //delete userChatsListObject[chatId]
      // } 


      const userChatsRef = doc(db,"userChats", curentUser.uid);
      const unsub = onSnapshot(userChatsRef,(doc) => {
        // userChatsList = doc.data()
        // const chatsArrayList = Object.entries(doc.data())
        // //console.log(doc.data())
        // const arrayOfChats = []
        // chatsArrayList.forEach(chat => {
        //   const chatedUserUid = chat[1].userInfo.uid
        //   const lastChatMessage = chat[1].lastChatMessage
        //   const dateLastMessage = chat[1].date
        //   arrayOfChats.push({chatedUserUid,lastChatMessage,dateLastMessage})
          
        //   //console.log(chat[1].userInfo.uid)
        //   setChatsArray(arrayOfChats)
        // })

        const chatsArray = Object.entries(doc.data())
        //console.log(chatsArray)
        setChatList(sortList(chatsArray))
        // const userChatsListObject = {};
        // const chatsArrayList = Object.entries(doc.data())


        //console.log(chatsArrayList)
        // console.log(doc.data())
        // console.log(chatsArrayList)
        // console.log(chatsArrayList.length)
        // console.log(chatsArrayList === [])
        // if(!chatsArrayList.length === 0){
        //   setChatList([])
        // }else if(chatsArrayList.length > 0){



          // chatsArrayList.forEach((chat) => {
          //   const chatId = chat[0]
          //   const chatedUserUid = chat[1].userInfo.uid
          //   const chatedUserLastMessage = chat[1].lastMessage
          //   const chatedUserDate = chat[1].date
  
          //   getChatedUsers(chatedUserUid,chatedUserLastMessage,
          //   chatedUserDate, chatId, userChatsListObject)
          // })




          // setChatList(Object.entries(userChatsListObject))
        // }
        // console.log(userChatsListObject,"userList")

      })
      //const chatsSnap = await getDoc(userChatsRef)
      //const userChatsList = Object.entries(chatsSnap.data())
      //let chatedUsersUid = []
      // Object.entries(userChatsList).forEach((chat) => {
      //   const chatedUserUid = chat[1].userInfo.uid
      //   //chatedUsersUid.push(chatedUserUid)
      //   // const chatedUserRef = doc(db,"users",chatedUserUid)
      //   // console.log(userChatsList)
      //   // const unSub = onSnapshot(chatedUserRef, (document) => {
            
      //   })

        return () => {
          unsub()
          //unSub()
        }

      }
      //console.log(chatedUsersUid)

      // const chatedUsers = chatedUsersUid.map(async (userUid) => {
      //   const userSnap = await getDoc(doc(db,"users", userUid))
      //   return userSnap.data()
      // })
      // console.log(chatedUsers, "chatedUsers")

      // console.log(chatsSnap.data())
      // console.log(userChatsList)
      // testChatList.map((chat) => {
      //   console.log(chat)
      // })
    
    
    curentUser.uid && setUserChatList()
    
  },[curentUser.uid])

  // useEffect(() => {
  //   const usrChatsAray = []
  //   chatsArray.forEach(async chat => {
  //     const chatedUserRef = doc(db,"users",chat.chatedUserUid)
  //     const chatedUserSnap
  //     console.log(chat)
  //   })
  //   //console.log(chatsArray)
  // },[chatsArray?.length])


  
  // useEffect(() => {
  //     if(curentUser.uid){ 
  //       const unSub = onSnapshot(userChatsRef, (document) => {
    
  //     })

  //     return () => {
  //       unSub()
  //     }
  //     }

  // },[curentUser.uid])



  // useEffect(() => {
    
  //   if(chatList && realtimeChatList){
      
        
  //       if(chatList.length < Object.entries(realtimeChatList).length){
  //         //console.log(chatList, realtimeChatList)
  //         chatList.forEach(element => {
  //             console.log(element[0] === realtimeChatList[element[0]])
  //         });
  //       }
       
  //       const changedChat = chatList.filter((element) => {
  //         if(realtimeChatList[element[0]].date){
  //           return element[1].date.seconds !== realtimeChatList[element[0]].date.seconds
  //         }
  //       })
  //       changedChat[0] && sortChats(chatList,changedChat[0][0],realtimeChatList)
      
  //   }

  // },[realtimeChatList])


  // function sortList (list){
  //   list.sort((a,b) => ([1].date - b[1].date))

  //   // const sortCheck = () => {
  //   //   return list.every((element,index,array) => {
      
  //   //     const len = array.length
         
  //   //     const a = element[1].date.seconds
  //   //     const b = array[index < (len - 1) ? index + 1 : (len - 1) ][1].date.seconds
  //   //     if(a && b){
  //   //       return element[1].date.seconds >= array[index < (len - 1) ? index + 1 : (len - 1) ][1].date.seconds
  //   //     }
  //   //     return false
  //   //   })
  //   // }
  // }

  //console.log(testChatList)

  useEffect(() => {
      if(chatList?.every(element => {
        return element[0] !== chatData.chatId ? chatData.chatId : false
      })){
        dispatch({type: "REMOVE__CHAT"})
      }    
    
  },[chatList?.length])

  
  return (
    <div className={`${chatData.chatId ? "chat-list_hide": ""} chat-list`}>
      {chatList?.map(chat => {
        if(chat[1].userInfo){
          return (<ChatListItem key={chat[1].userInfo.uid} userInfo={chat[1].userInfo}
          lastMessage={chat[1].lastMessage}/>)
        }
      })}
    </div>
  )
  // console.log(Array.isArray(testChatList))
  // if(Array.isArray(testChatList)){
  //   console.log(sortList(testChatList))
  // }
  //   return (
  //   <div className={`${Array.isArray(chatList) ? "chat-list_hide": ""} chat-list`}>
  //     {Array.isArray(chatList) && sortList(chatList).map(chat => {
  //       // {console.log(chat[1])}
  //       if(chat[1].chatedUserInfo){
  //         return (<ChatListItem key={chat[1].chatedUserInfo.uid} userInfo={chat[1].chatedUserInfo}
  //         lastMessage={chat[1].chatedUserLastMessage}/>)
  //       }
  //     })}
  //   </div>
  // )
  // testChatList.map((chat) => {
  //   console.log(chat)
  // })
  
  // return (
  //   <div className={`${testChatList.chatId ? "chat-list_hide": ""} chat-list`}>
  //     {testChatList?.map(chat => {
  //       if(chat.userInfo){
  //         return (<ChatListItem key={chat.userInfo.uid} userInfo={chat.userInfo}
  //         lastMessage={chat.lastMessage}/>)
  //       }
  //     })}
  //   </div>
  // )
}
