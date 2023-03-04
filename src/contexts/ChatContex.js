import { createContext, useContext, useReducer, useState } from "react";
import { combinedChatUid } from "../utils/combinedChatUid";
import { UserAuth } from "./AuthContext";


const ChatContext = createContext()

export const ChatContextProvider = ({children}) => {
    const curentUser = UserAuth()
   
    const INITIAL__STATE = {
        chatId: null,
        user: {}
    }

    const chatReducer = (state,action) => {
        switch(action.type){
            case "CHANGE__USER":
                return {
                    user: action.payload,
                    chatId: combinedChatUid(curentUser.uid,action.payload.uid)
                }
            
            case "REMOVE__CHAT":
                return{
                    user: {},
                    chatId: null,
                }

            default:
                return state
        }
    }


    const [state, dispatch] = useReducer(chatReducer,INITIAL__STATE)

    return (
        <ChatContext.Provider value={{chatData:state, dispatch}}>
            {children}
        </ChatContext.Provider>
    )
}


export const UserChat = () => {
    return useContext(ChatContext)
}