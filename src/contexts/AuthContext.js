


import { upload } from '@testing-library/user-event/dist/upload'
import { onAuthStateChanged, updateProfile } from 'firebase/auth'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { getDownloadURL, ref, uploadString } from 'firebase/storage'
import React, { createContext, useContext, useEffect, useState } from 'react'
import { auth, db, storage } from '../utils/firebase'

const AuthContext = createContext()

export const AuthContextProvider = ({children}) => {

    const [curentUser,setCurentUser] = useState()


    useEffect(() => {
        const unSub = onAuthStateChanged(auth, async (user) => {
            if(user && user.emailVerified){
                if(user.photoURL.indexOf("firebasestorage") === -1){
                    const storageRef = ref(storage, `/usersProfilePhotos/${user.uid}`)
                    await uploadString(storageRef, user.photoURL)
                    const downloadURL = await getDownloadURL(storageRef);
                    await updateProfile(auth.currentUser, {
                      photoURL: downloadURL,
                    });

                    user.photoURL = downloadURL
                    setCurentUser(user)
                    
                    setDoc(doc(db,"users", user.uid),{
                        uid: user.uid,
                        name: user.displayName,
                        email: user.email,
                        photoUrl: downloadURL,
                    })
                    console.log(user.photoURL)
                    console.log("Not in Storage")
                }else{
                    setCurentUser(user)

                    setDoc(doc(db,"users", user.uid),{
                        uid: user.uid,
                        name: user.displayName,
                        email: user.email,
                        photoUrl: user.photoURL,
                    })
                }
            }
            
            setCurentUser(user)
            
            
        })
            return () => {unSub()}
    },[])
    

    return (
        <AuthContext.Provider value={curentUser}>
            {children}
        </AuthContext.Provider>
    )
}

export const UserAuth = () => {
    return useContext(AuthContext)
}