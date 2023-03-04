import { updateProfile } from "firebase/auth";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import React from "react";
import { useState } from "react";
import Avatar from "react-avatar-edit";
import { auth, storage } from "../../../../utils/firebase";
import "./change-photo-modal.css"

export const ChangePhotoModal = ({
  curentUser,
  setIsModalActive,
  isModalActive,
  setImgCrop,
  imgCrop,
  setStoreImg,
  baseUserProfileImg,
}) => {
  const [modalErr, setModalErr] = useState(null);

  const closeModal = (e) => {
    if (e.target.dataset.close) {
      setIsModalActive(false);
    }
  };

  const onFileLoad = (file) => {
    if (file.type.substring(0, 5) !== "image") {
      setModalErr("файл не є фото");
      file.target.value = "";
    }
  };

  const onBeforeFileLoad = (file) => {
    if (file.target.files[0].size > 10000000) {
      setModalErr("файл занадто великий");
      file.target.value = "";
    } else {
      setModalErr(false);
    }
  };

  const onCrop = (view) => {
    setImgCrop(view);
  };

  const onClose = () => {
    setImgCrop(null);
  };

  const saveImg = async (e) => {
    e.target.disabled = true;

    const storageRef = ref(storage, `/usersProfilePhotos/${curentUser.uid}`);

    await uploadString(storageRef, imgCrop.split(",")[1], "base64");
    const downloadURL = await getDownloadURL(storageRef);
    await updateProfile(auth.currentUser, {
      photoURL: downloadURL,
    });
    e.target.disabled = false;
    document.location.href = "https://floac-web.github.io/post-boy/"

    setStoreImg(imgCrop);
    setIsModalActive(false);
  };


  return (
    <div
      className={
        `${isModalActive ? "add-photo-modal-active" : ""}` +
        " user-edit__add-photo-modal" +
        " add-photo-modal"
      }
      data-close="true"
      onClick={(e) => closeModal(e)}
    >
      <div className="add-photo-modal__window">
        <div className="add-photo-modal__title">Виберіть нове зображення</div>
        <img
          src={
            imgCrop || (curentUser && curentUser.photoURL) || baseUserProfileImg
          }
          onError={({currentTarget}) => {
            currentTarget.src = baseUserProfileImg
          }}
          alt=""
          className="add-photo-modal__preview"
        />
        <div className="add-photo-modal__avatar">
          <Avatar
            width={290}
            height={290}
            imageWidth={290}
            onCrop={onCrop}
            onClose={onClose}
            onBeforeFileLoad={onBeforeFileLoad}
            onFileLoad={onFileLoad}
            // exportMimeType={"image/jpeg"}
          />
        </div>
        {modalErr && (
          <p className="add-photo-modal__error-message">{modalErr}</p>
        )}
        <button className="add-photo-modal__save-btn btn" onClick={saveImg}>
          зберегти
        </button>
      </div>
    </div>
  );
};
