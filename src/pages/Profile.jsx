import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../index.css";
import {
  setName,
  setUsername,
  setImage,
  updateUserProfile,
  setGender,
} from "../store/authSlice";

function Profile({ isDarkMode }) {
  const dispatch = useDispatch();
  const uid = useSelector((state) => state.auth.uid);
  const [showAvatarModal, setShowAvatarModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const fileInputRef = useRef(null);
  const name = useSelector((state) => state.auth.name);
  const username = useSelector((state) => state.auth.username);
  const email = useSelector((state) => state.auth.email);
  const gender = useSelector((state) => state.auth.gender);
  const image = useSelector((state) => state.auth.image);
  const borderColor = isDarkMode ? "border-gray-800" : "border-gray-100";

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setShowAvatarModal(true);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "name":
        dispatch(setName(value));
        break;
      case "username":
        dispatch(setUsername(value));
        break;
      case "gender":
        dispatch(setGender(value));
        break;
      default:
        break;
    }
  };

  const handleSubmit = () => {
    const updatedUserData = {
      name,
      username,
      email,
      gender,
      image,
    };
    dispatch(updateUserProfile(updatedUserData , uid));
    setIsEdit(false);
  };

  const commonInputClass =
    "text-md rounded-[10px] text-center bg-transparent border-2 border-black overflow-scroll scrollbar-hide w-full px-4";

  return (
    <div className="flex flex-col p-6">
      <span className="text-3xl font-bold ml-4">SyncBoard Profile</span>
      <div className="flex flex-row mt-8">
        <span className="text-xl font-bold ml-4 mt-4">User Avatar</span>
        <img
          className={`w-24 h-24 rounded-2xl border-2 ${borderColor} ml-32 mt-4 object-cover`}
          src={image}
          alt="User Avatar"
        />
        <div className="flex flex-col p-4 ml-12 justify-evenly">
          <input
            type="file"
            accept="image/png,image/jpeg,image/jpg"
            className="flex"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
          <button className="flex" onClick={handleButtonClick}>
            Change Avatar
          </button>
          <span className="flex">
            * Supported image types : .jpg, .jpeg, .png
          </span>
        </div>
      </div>
      <div className="flex flex-row mt-8">
        <span className="flex text-xl font-bold ml-4 mt-4">
          User Information :
        </span>
        <div className="flex ml-4">
          <div className="flex flex-col p-4 justify-evenly gap-4 w-80">
            <div className="flex text-lg items-center">
              <label className="w-40">Name</label>
              {isEdit ? (
                <input
                  type="text"
                  name="name"
                  value={name}
                  onChange={handleInputChange}
                  className={`${commonInputClass} form`}
                />
              ) : (
                <span className={commonInputClass}>{name}</span>
              )}
            </div>
            <div className="flex text-lg items-center">
              <label className="w-40">Username</label>
              {isEdit ? (
                <input
                  type="text"
                  name="username"
                  value={username}
                  onChange={handleInputChange}
                  className={`${commonInputClass} form`}
                />
              ) : (
                <span className={commonInputClass}>{username}</span>
              )}
            </div>
            <div className="flex text-lg items-center">
              <label className="w-40">Email</label>
              <span className={`${commonInputClass}`}>{email}</span>
            </div>
            <div className="flex text-lg items-center">
              <label className="w-40">Gender</label>
              {isEdit && !gender ? (
                <select
                  name="gender"
                  value={gender}
                  onChange={handleInputChange}
                  className={`${commonInputClass} form`}
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              ) : (
                <span className={commonInputClass}>{gender}</span>
              )}
            </div>
          </div>
        </div>
        <button
          className="flex ml-4 h-10 self-center px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={() => (isEdit ? handleSubmit() : setIsEdit(true))}
        >
          {isEdit ? "Save" : "Edit"}
        </button>
      </div>
      <div className="flex flex-row mt-8">
        <span className="flex text-xl font-bold ml-4 mt-4">Rooms : </span>
        <h1 className="mt-4 ml-12 text-lg">This feature will be added soon</h1>
      </div>
    </div>
  );
}

export default Profile;
