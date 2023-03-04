import React from 'react'


  const weekPasswordMessage = " пароль має містити мінімув 6 символів";
  const invalidEmailMessage = "пошту введено некоректно";
  const missingEmailMessage = "пошту не введено";
  const internalErrorMessage = "дані введено некоректно";
  const emailAlreadyInUseMessage = "пошта вже використовується";
  const wrongPasswordMessage = "невірний пароль"
  const unverifiedEmailMessage = "для входу підтвердіть свою почту"
  const userNotFoundMessage = "користувача не знайдено"


  export function verifyErrorMessage(errorCode,setFunction){
    switch (errorCode) {
        case "auth/weak-password": {
            setFunction(weekPasswordMessage);
          break;
        }
        case "auth/invalid-email": {
            setFunction(invalidEmailMessage);
          break;
        }
        case "auth/internal-error": {
            setFunction(internalErrorMessage);
          break;
        }
        case "auth/missing-email": {
            setFunction(missingEmailMessage);
          break;
        }
        case "auth/email-already-in-use": {
            setFunction(emailAlreadyInUseMessage)
            break;
        }
        case "auth/wrong-password" : {
            setFunction(wrongPasswordMessage)
            break;
        }
        case "auth/unverified-email": {
            setFunction(unverifiedEmailMessage)
            break;
        }
        case "auth/user-not-found": {
            setFunction(userNotFoundMessage)
            break;
        }
  }
}




export const ValidationMessage = ({errMessage, className}) => {
    return (
      <p className={`errorMessage ${className || ""}`}>{errMessage}</p>
    )
  //   const baseClassName = `errorMessage ${className || ""}`
  //   switch (errMessage) {
  //     case internalErrorMessage: {
  //         return (<p className={baseClassName}>{errMessage}</p>)
  //     }
  //     case invalidEmailMessage: {
  //         return (<p className={`invalid-email errorMessage ${className || ""}`}>{errMessage}</p>)
  //     }
  //     case missingEmailMessage: {
  //         return (<p className={`missing-email errorMessage ${className || ""}`}>{errMessage}</p>)
  //     }
  //     case weekPasswordMessage: {
  //         return (<p className={`weak-password errorMessage ${className || ""}`}>{errMessage}</p>)
  //     }
  //     case emailAlreadyInUseMessage: {
  //         return (<p className={`email-in-use errorMessage ${className || ""}`}>{errMessage}</p>)
  //     }
  //     case wrongPasswordMessage: {
  //         return (<p className={`wrong-password errorMessage`}></p>)
  //     }
  // }
}
