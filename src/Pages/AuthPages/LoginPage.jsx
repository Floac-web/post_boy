import { Link, useNavigate } from "react-router-dom";

import React from "react";
import "./auth.css";
import { GoogleAuthButton } from "../../Components/GoogleAuthButton";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../utils/firebase";
import { useState } from "react";
import { ValidationMessage, verifyErrorMessage } from "../../utils/authValidation";
import { CHAT__ROUTE, FORGOT__PASSWORD__ROUTE } from "../../Routs/SiteRoutes";
import { UserAuth } from "../../contexts/AuthContext";
import { LoadingPage } from "../../Components/LoadingPage/LoadingPage";
import { doc, getDoc, setDoc } from "firebase/firestore";

export const LoginPage = () => {
    const curentUser = UserAuth()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [errMessage, setErrMessage] = useState("")
    const navigate = useNavigate()
    
    if(curentUser === undefined){
        return <LoadingPage/>
    }
    const emailSingIn = async e => {
        e.preventDefault()
        try {
            
            const userCredential = await signInWithEmailAndPassword(auth,email,password)
            
            if(userCredential.user.emailVerified) {
              //const userChatsRef = doc(db,"userChats", userCredential.user.uid )
                const userChatsRef = doc(db,"userChats", userCredential.user.uid)
                const chatsRes = await getDoc(userChatsRef)

                if(!chatsRes.exists()){
                  await setDoc(userChatsRef,{})
                }
               navigate(CHAT__ROUTE) 
            } else {
              verifyErrorMessage("auth/unverified-email", setErrMessage)
            }
              
            // setErrMessage("auth/unverified-email")

        } catch (error) {
            verifyErrorMessage(error.code, setErrMessage)
        }
    }
  return (
    <div className="login__auth auth">
      <div className="auth__wrap">
        <div className="auth__text">
          <div className="auth__title">Ввійти в аккаунт</div>
          <div className="auth__sub-title">
            для входу введіть ваші дані, або зареєструйтеся
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
            <div className="auth__input">
              <input type="password" placeholder=" " id="password" 
              onInput={(e) => setPassword(e.target.value)}
              value={password}/>
              <label htmlFor="password">Password</label>
            </div>
          </div>
            <ValidationMessage errMessage={errMessage} className="auth__errorMessage"/>
          <button className="auth__button btn" onClick={(e) => emailSingIn(e)}>
            Ввійти
          </button>
        </form>
        <Link className="auth__forgot-password" to={FORGOT__PASSWORD__ROUTE}>
            забули пароль?
        </Link>
        <div className="auth__google">
          <div className="auth__sub-title">
            обо ввійдіть за допомогую Google
          </div>
          <GoogleAuthButton />
        </div>
        <Link to="/registration" className="auth__redirect">
          зареєструватися
        </Link>
      </div>
    </div>
  );
};
