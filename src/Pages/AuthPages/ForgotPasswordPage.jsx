


import { async } from '@firebase/util'
import { sendPasswordResetEmail } from 'firebase/auth'
import React from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ValidationMessage, verifyErrorMessage } from '../../utils/authValidation'
import { auth } from '../../utils/firebase'

export const ForgotPasswordPage = () => {

    const [email, setEmail] = useState("")
    const [errMessage, setErrMessage] = useState(null)
    const [isSendedPasswordResetMail, setSendedStatus] = useState(false)

  if(isSendedPasswordResetMail){
    return (
      <div className='login__auth auth'>
        <div className="auth__wrap">
            <div className="auth__text">
                <div className="auth__title">Змініть пароль</div>
                <div className="auth__sub-title">для зміни паролю перейдіть по посиланню відправленому на почту</div>
            </div>
        </div>
      </div>
    )
  }
    const handleForgotPassword = async e => {
        e.preventDefault()
        sendPasswordResetEmail(auth,email)
        .then(
            setSendedStatus(true)
        ).catch( e => {
            console.log(e.message)
            verifyErrorMessage(e.code,setErrMessage)
        })
    }

  return (
    <div className="forgot-password__auth auth">
    <div className="auth__wrap">
      <div className="auth__text">
        <div className="auth__title">Знайдіть свій обліковий запис</div>
        <div className="auth__sub-title">
        будь ласка, введіть адресу електронної пошти, щоб знайти свій обліковий запис
        </div>
      </div>
      <form action="" className="auth__form">
        <div className="auth__inputs">
          <div className="auth__input">
            <input type="text" placeholder=" " id="email"
            onInput={(e) => setEmail(e.target.value)} 
            value={email}/>
            <label htmlFor="email">Email</label>
          </div>
        </div>
          <ValidationMessage errMessage={errMessage} className="auth__errorMessage"/>
        <button className="auth__button btn" onClick={(e) => handleForgotPassword(e)}>
          Знайти
        </button>
      </form>
      <Link to="/registration" className="auth__redirect">
        зареєструватися
      </Link>
    </div>
  </div>
  )
}
