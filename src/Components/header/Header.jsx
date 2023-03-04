

import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { UserAuth } from '../../contexts/AuthContext'
import "./header.css"

import { SignOutButton } from '../SignOutButton'
import { SearchUsers } from '../UserSearch/SearchUsers'
import { Link } from 'react-router-dom'
import baseUserProfileImg from "../../Img/user.png"
import { GIT__NAME__ROUTE, USER__EDIT__ROUTE } from '../../Routs/SiteRoutes'

export const Header = () => {

    const curentUser = UserAuth()
    const [UserPhoto, setUserPhoto] = useState("./user.png")
    
    useEffect(() => {
        try{
            if(curentUser){
                curentUser.photoURL ? setUserPhoto(curentUser.photoURL) : setUserPhoto("./user.png")
            }
        }catch (e){
            console.log(e)
        }
        
    },[curentUser])
    

    return (
        <header className="header">
            <div className="header__container">
                <div className="header__wrapper">
                    <div className="header__title">
                        <h2>P<span>ost</span>B<span>oy</span></h2>
                    </div>
                    <SearchUsers className="header__search"/>
                    <Link className='header__user' to={USER__EDIT__ROUTE}>
                        <img src={UserPhoto} alt="" 
                                  onError={({currentTarget}) => {
                                    currentTarget.src = baseUserProfileImg
                                  }}/>
                    </Link>
                    {/* <div className="header__user">
                        <img src={UserPhoto} alt="" />
                    </div> */}
                </div>
            </div>
        </header>
    )
}
