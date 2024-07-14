import React, { useState, useRef } from "react";
import Modal from "react-modal";
Modal.setAppElement("#root");
import { useDispatch, useSelector } from "react-redux";
import "../index.css";
import {
  setName,
  setUsername,
  setImage,
  setImageToGoogle,
  updateUserProfile,
  setGender,
} from "../store/authSlice";
import av1 from "../../public/avatars/boy.png"
import av2 from "../../public/avatars/woman_1.png";
import av3 from "../../public/avatars/gamer.png"
import av4 from "../../public/avatars/hacker.png"
import av5 from "../../public/avatars/man.png"
import av6 from "../../public/avatars/man_1.png";
import av7 from "../../public/avatars/man_2.png";
import av8 from "../../public/avatars/woman.png";

function Profile({ isDarkMode }) {
  const dispatch = useDispatch();
  const uid = useSelector((state) => state.auth.uid);
  const [isEdit, setIsEdit] = useState(false);
  const name = useSelector((state) => state.auth.name);
  const username = useSelector((state) => state.auth.username);
  const email = useSelector((state) => state.auth.email);
  const gender = useSelector((state) => state.auth.gender);
  const image = useSelector((state) => state.auth.image);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const borderColour = isDarkMode ? "border-gray-700" : "border-gray-100";

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleImageSelect = (selectedImage) => {
    dispatch(setImageToGoogle(selectedImage , uid));
    closeModal();
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

  const modalStyles = {
    content: {
      top: "-10%",
      right: "-10%",
      width: "700px",
      height: "175px",
      margin: "auto",
      borderRadius: "20px",
      display: "flex",
      flexDirection: "column",
      inset: "unset",
    },
    overlay: {
      display: "flex",
      top: "-10%",
      right: "-10%",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "rgba(0, 0, 0, 0.75)",
    },
  };

  const commonInputClass =
    "rounded-[10px] text-center bg-transparent border-2 border-black overflow-scroll scrollbar-hide w-full px-4";

  return (
    <div className="flex flex-col p-6">
      <span className="text-3xl font-bold ml-4">SyncBoard Profile</span>
      <div className="flex flex-row mt-8">
        <span className="text-xl font-bold ml-4 mt-4">User Avatar</span>
        <img
          src={image}
          alt="Profile"
          className={`w-24 h-24 object-cover rounded-2xl ml-20 mt-4`}
          style={{ cursor: "pointer" }}
        />
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          contentLabel="Select Image"
          style={modalStyles}
        >
          <h2>Select an Image</h2>
          <div className="image-options w-44 flex flex-row">
            {[av1, av2, av3, av4, av5, av6, av7, av8].map((num) => (
              <img
                key={num}
                src={`${num}`}
                alt={`Avatar ${num}`}
                onClick={() => handleImageSelect(`${num}`)}
                className="w-16 h-16 object-cover"
                style={{ cursor: "pointer", margin: "10px" }}
              />
            ))}
          </div>
          <button onClick={closeModal}>Close</button>
        </Modal>
        <div className="flex flex-col p-4 ml-12 justify-evenly">
          <button
            className={`flex ${borderColour} border-2 p-2 rounded-3xl w-36 justify-center hover:ring-2`}
            onClick={openModal}
          >
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
          className="flex mx-12 mt-40 h-10 self-center px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
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
