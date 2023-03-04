import React from "react";
import { useState } from "react";
import baseUserProfileImg from "../../../Img/user.png";
import { ChangePhotoModal } from "./changePhotoModal/ChangePhotoModal";
import "./photo-editor.css";
export const PhotoEditor = ({
  curentUser,
  imgCrop,
  setImgCrop,
  storeImg,
  setStoreImg,
}) => {
  const [isModalActive, setIsModalActive] = useState(false);

  return (
    <>
      <div className="user-edit__photo-editor photo-editor">
        <div
          className="photo-editor__img-label"
          onClick={() => setIsModalActive(true)}
        >
          <img
            src={
              storeImg
                ? storeImg
                : (curentUser && curentUser.photoURL) || baseUserProfileImg
            }
            onError={({currentTarget}) => {
              currentTarget.src = baseUserProfileImg
            }}
            alt=""
          />
        </div>
        <div
          className="photo-editor__text-label"
          onClick={() => setIsModalActive(true)}
        >
          змінити фото профілю
        </div>
      </div>
      <ChangePhotoModal
        curentUser={curentUser}
        setIsModalActive={setIsModalActive}
        isModalActive={isModalActive}
        setImgCrop={setImgCrop}
        imgCrop={imgCrop}
        setStoreImg={setStoreImg}
        baseUserProfileImg={baseUserProfileImg}
      />
    </>
  );
};
