

import { collection, getDocs } from 'firebase/firestore'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { UserAuth } from '../../contexts/AuthContext'
import { SearchSvg } from '../../Img/SearchSvg'
import { db } from '../../utils/firebase'
import { SearchedUser } from './SearchedUser'
import "./searchUsers.css"



const markUserMail = (str,pos,len) => {
    return (
        <p>{str.slice(0,pos)}<span className='markUserMail'>{str.slice(pos,pos + len)}</span>{str.slice(pos + len,str.lenght)}</p>
    )
}


export const SearchUsers = ({className}) => {
    const curentUser = UserAuth()
    const [value, setValue] = useState("")
    const [userList, setUserList] = useState(null)
    const [searchedUsers, setSearchedUsers] = useState(null)

    useEffect(() => {
        getDocs(collection(db,"users"))
        .then(res => {
            let users = []
            res.forEach(r => users.push(r.data()))
            setUserList(users)

        })
    },[])




    const handleSearch = (value) => {
        setValue(value)
        const searchedUserList = userList.filter(user => {
            const userMail = user.email.toString()
            const isCurentUser = curentUser.email === userMail
            const searchedIndex = userMail.toLowerCase().indexOf(value.toLowerCase())
            if(searchedIndex !== -1 && value !== "" && !isCurentUser){
                user.markedEmail = markUserMail(user.email,searchedIndex,value.length)
                return user
            }
        })

        if(searchedUserList === [] || value === ""){
            setSearchedUsers(null)
        }else{
            setSearchedUsers(searchedUserList)
        }
    }
   
    
    return (
        <div className={`${className} search`}>
            
                <div className="search__input">
                    <input className="input" type="text" placeholder='Пошук'
                    onInput={(e) => handleSearch(e.target.value)}
                    value={value}
                    />
                    <SearchSvg/>
                </div>
                {searchedUsers && <ul className="search__user-list">
                    {searchedUsers?.map(user => (
                        <SearchedUser key={user.uid} name={user.name} markedEmail={user.markedEmail || user.email}
                        email={user.email}
                        uid={user.uid} setValue={setValue} setSearchedUsers={setSearchedUsers}
                        photoUrl={user.photoUrl}/>
                    ))}
                </ul>}
            
        </div>
    )
}
