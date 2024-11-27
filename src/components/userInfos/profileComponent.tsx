import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../../feature/store/store";
import { displayUserById, profilePhotoUploadApi } from "../../../feature/reducers/userSlice";
import { HiCamera } from "react-icons/hi2";
import Modal from "../crop/Modal";
import axios from "axios";
import { NotificationService } from "../../../service/NotificationService";

const ProfileComponent = () => {
  const dispatch = useDispatch<AppDispatch>();
  const userId = localStorage.getItem("userId");

  // Benutzerinformationen abrufen
  const user = useSelector((state: RootState) =>
    displayUserById(state, userId || "")
  );

  const [showModal, setShowModal] = useState(false); // Modal-Status
  const [croppedImage, setCroppedImage] = useState(user?.profile_photo || ""); // Geschnittenes Bild

  const handleSaveImage = async (file: File) => {
    try {
      const formData = new FormData();
      formData.append("userImage", file); // Das Feld muss "userImage" heißen
  
      const response = await axios.post("http://localhost:7001/user/profile/photo", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true, // Wichtig, damit Cookies (z. B. accessToken) gesendet werden
      });
  
      console.log("Profilbild erfolgreich hochgeladen:", response.data);
  
      // Aktualisiere das Profilbild in der UI
      NotificationService.success("Profilbild erfolgreich hochgeladen!");
    } catch (error) {
      console.error("Fehler beim Hochladen des Profilbilds:", error);
      NotificationService.error("Fehler beim Hochladen des Profilbilds!");
    }
  };
  
  

  return (
    <div className="profile-container mx-auto max-w-3xl p-6">
      <h1 className="text-3xl font-bold text-center text-orange-600 pb-4">
        {`${user?.firstName || "Benutzer"}'s Profil`}
      </h1>
  
      <div className="profile-photo-container mb-6 flex justify-center relative">
        <div className="relative">
          <img
            src={croppedImage || user?.profile_photo || "https://www.example.com/default-avatar.png"}
            alt="Profilbild"
            className="w-40 h-40 rounded-full border-4 border-orange-500 shadow-lg object-cover"
          />
          <HiCamera
            className="absolute bottom-2 right-2 text-3xl text-orange-500 bg-white rounded-full p-1 shadow-lg cursor-pointer hover:text-cyan-700"
            onClick={() => setShowModal(true)} // Modal öffnen
          />
        </div>
      </div>
  
      {showModal && (
        <Modal
          updateAvatar={(imgSrc: string) => {
            setCroppedImage(imgSrc); // Aktualisiere das Bild lokal
          }}
          closeModal={() => setShowModal(false)} // Modal schließen
          onSave={(file: File) => handleSaveImage(file)} // Datei speichern
        />
      )}
    </div>
  );
};

export default ProfileComponent;
