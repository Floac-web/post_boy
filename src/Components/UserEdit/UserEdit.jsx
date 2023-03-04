import React from "react";
import { Link } from "react-router-dom";
import { CHAT__ROUTE, GIT__NAME__ROUTE } from "../../Routs/SiteRoutes";
import { SignOutButton } from "../SignOutButton";
import baseUserImgUrl from "../../Img/user.png";
import Avatar from "react-avatar-edit";
import baseUserProfileImg from "../../Img/user.png";
import "./user-edit.css";
import { useState } from "react";
import { UserAuth } from "../../contexts/AuthContext";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  uploadBytes,
  uploadString,
} from "firebase/storage";
import { useEffect } from "react";
import { async } from "@firebase/util";
import { auth, db, storage } from "../../utils/firebase";
import { doc, updateDoc } from "firebase/firestore";
import { updateProfile } from "firebase/auth";
import { ArrowLeft } from "../../Img/ArrowLeft";
import { PhotoEditor } from "./changePhoto/PhotoEditor";
import { ChangePhotoModal } from "./changePhoto/changePhotoModal/ChangePhotoModal";
import { NameEditor } from "./changeName/NameEditor";

export const UserEdit = () => {
  const curentUser = UserAuth();
  // const [curentName, setCurentName] = useState(curentUser?.displayName)
  const [imgCrop, setImgCrop] = useState();
  const [storeImg, setStoreImg] = useState(curentUser?.photoURL);


  return (
    <div className="user-edit">
      <div className="user-edit__container container">
        <div className="user-edit__wrapper">
          <Link to={CHAT__ROUTE} className="user-edit__redirect-chat">
            <ArrowLeft />
          </Link>
          <div className="user-edit__title">редагувати профіль</div>
          <PhotoEditor curentUser={curentUser} imgCrop={imgCrop} setImgCrop={setImgCrop}
          storeImg={storeImg} setStoreImg={setStoreImg}/>
          {/* <NameEditor curentUserName={curentName} className="user-edit__name-editor" setCurentName={setCurentName}/> */}
          {/* <SignOutButton /> */}
          <SignOutButton/>
        </div>
      </div>
    </div>
  );
};
