


import React from 'react'
import { LoadingPage } from '../../Components/LoadingPage/LoadingPage'
import { UserAuth } from '../../contexts/AuthContext'

export const EmaiVerificationPage = () => {
  const curentUser = UserAuth()

  if(curentUser === undefined){
    return <LoadingPage/>
  }
  return (
    <div className='login__auth auth'>
        <div className="auth__wrap">
            <div className="auth__text">
                <div className="auth__title">Підтвердіть пошту</div>
                <div className="auth__sub-title">Для входу в аккаунт піддтвердіть свою пошту. Перейдіть по посиланню відправленому на пошту</div>
            </div>
        </div>
    </div>
  )
}
