
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore"
import { getStorage} from "firebase/storage";






const firebaseConfig = {

  apiKey: "AIzaSyDXve0u14uebAIfVxb3Ma7LhXTvkcIVKXw",

  authDomain: "post-boy.firebaseapp.com",

  projectId: "post-boy",

  storageBucket: "post-boy.appspot.com",

  messagingSenderId: "889753741595",

  appId: "1:889753741595:web:b9e0dc8a8106fd94f5cbbe"

};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const provider = new GoogleAuthProvider()
export const db = getFirestore(app)
export const storage = getStorage(app)