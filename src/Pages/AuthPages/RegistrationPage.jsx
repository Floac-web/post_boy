import { Link, useNavigate } from "react-router-dom";

import React from "react";
import { GoogleAuthButton } from "../../Components/GoogleAuthButton";
import "./auth.css";
import { useState } from "react";
import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { auth, db } from "../../utils/firebase";
import { ValidationMessage, verifyErrorMessage } from "../../utils/authValidation";
import { UserAuth } from "../../contexts/AuthContext";
import { LoadingPage } from "../../Components/LoadingPage/LoadingPage";
import { doc, setDoc } from "firebase/firestore";

export const RegistrationPage = () => {

  const currentUser = UserAuth()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMessage, setErrMessage] = useState("");
  const navigation = useNavigate()


  if(currentUser === undefined) {
    return (<LoadingPage/>)
  }
  // const weekPasswordMessage = " пароль має містити мінімув 6 символів";
  // const invalidEmailMessage = "пошту введено некоректно";
  // const missingEmailMessage = "пошту не введено";
  // const internalErrorMessage = "дані введено некоректно";
  // const emailAlreadyInUseMessage = "пошта вже використовується";

  const emailRegistr = async (e) => {
    e.preventDefault();
    
    try {
        
      await createUserWithEmailAndPassword(
        auth,
        email,
        password
      )
      // const userChatsRef = doc(db,"userChats", userCredential.user.uid )
      // await setDoc(userChatsRef,{})
      // console.log(userCredential.user.uid)
      await sendEmailVerification(auth.currentUser)
      navigation("/emailVerification")
      
      
    } catch (e) {
        verifyErrorMessage(e.code,setErrMessage)
      }

    ;
    

    //const userCredential = await createUserWithEmailAndPassword(auth,email,password)
  };

  return (
    <div className="registration__auth auth">
      <div className="auth__wrap">
        <div className="auth__text">
          <div className="auth__title">Реєстрація</div>
          <div className="auth__sub-title">
            для реєстрації введіть свою пошту та пароль
          </div>
        </div>
        <form action="" className="auth__form">
          <div className="auth__inputs">
            <div className="auth__input">
              <input
                type="email"
                placeholder=" "
                id="email"
                onInput={(e) => setEmail(e.target.value)}
                value={email}
              />
              <label htmlFor="email">Email</label>
            </div>
            <div className="auth__input">
              <input
                type="password"
                placeholder=" "
                id="password"
                onInput={(e) => setPassword(e.target.value)}
                value={password}
              />
              <label htmlFor="password">Password</label>
            </div>
          </div>
          {/* {authValidationMessage(errMessage,"auth__errorMessage")} */}
          <ValidationMessage errMessage={errMessage} className="auth__errorMessage"/>
          <button className="auth__button btn" onClick={(e) => emailRegistr(e)}>
            Зареєструватися
          </button>
        </form>
        <div className="auth__google">
          <div className="auth__sub-title">
            обо ввійдіть за допомогую Google
          </div>
          <GoogleAuthButton />
        </div>
        <Link to="/login" className="auth__redirect">
          ввійти
        </Link>
      </div>
    </div>
  );
};
