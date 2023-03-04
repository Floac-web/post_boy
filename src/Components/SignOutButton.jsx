

import { signOut } from 'firebase/auth'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { auth } from '../utils/firebase'

export const SignOutButton = () => {
  const navigate = useNavigate()
  return (
    <button className="sign-out-btn btn" onClick={(e) => {
        e.preventDefault()
        navigate("/login")
        signOut(auth)
        
    }}>вийти з аккаунту</button>
  )
}
