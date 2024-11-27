import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../../feature/store/store";
import { displayUserById, profilePhotoUploadApi } from "../../../feature/reducers/userSlice";
import { HiCamera } from "react-icons/hi2";
import Modal from "../crop/Modal";
import { NotificationService } from "../../../service/NotificationService";

const ProfileComponent = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [userId, setUserId] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [croppedImage, setCroppedImage] = useState("");
  const [file, setFile] = useState<File | null>(null); // Datei für den Upload speichern

  // Benutzer-ID aus localStorage abrufen
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUserId = localStorage.getItem("userId");
      console.log("Geladene Benutzer-ID:", storedUserId);
      setUserId(storedUserId);
    }
  }, []);

  // Benutzer aus Redux-State abrufen
  const user = useSelector((state: RootState) => {
    console.log("Aktueller Redux-State:", state.users);
    return userId ? displayUserById(state, userId) : null;
  });

  // Profilbild initial setzen
  useEffect(() => {
    if (user?.profile_photo) {
      setCroppedImage(user.profile_photo);
    }
  }, [user]);

  const handleSaveImage = async (file: File) => {
    try {
      const response = await dispatch(profilePhotoUploadApi(file)).unwrap();
      console.log("Profile Photo UserSlice:", response);
      NotificationService.success(response.message || "Profilbild erfolgreich hochgeladen!");
    } catch (error) {
      console.error("Fehler beim Hochladen des Profilbilds:", error);
      NotificationService.error("Fehler beim Hochladen des Profilbilds!");
    }
  };

  // Rückgabe, falls keine Benutzer-ID vorhanden
  if (!userId) {
    return <p>Lädt Benutzerinformationen...</p>;
  }

  // Rückgabe, falls Benutzer nicht gefunden
  if (!user) {
    return <p>Benutzer nicht gefunden.</p>;
  }

  return (
    <div className="profile-container mx-auto max-w-3xl p-6">
      <h1 className="text-3xl font-bold text-center text-orange-600 pb-4">
        {`${user.firstName || "Benutzer"}'s Profil`}
      </h1>

      <div className="profile-photo-container mb-6 flex justify-center relative">
        <div className="relative">
          <img
            src={croppedImage || "https://www.example.com/default-avatar.png"}
            alt="Profilbild"
            className="w-40 h-40 rounded-full border-4 border-orange-500 shadow-lg object-cover"
          />
          <HiCamera
            className="absolute bottom-2 right-2 text-3xl text-orange-500 bg-white rounded-full p-1 shadow-lg cursor-pointer hover:text-cyan-700"
            onClick={() => setShowModal(true)}
          />
        </div>
      </div>

      {showModal && (
        <Modal
          updateAvatar={(imgSrc: string) => {
            setCroppedImage(imgSrc);
          }}
          closeModal={() => setShowModal(false)}
          onSave={(croppedFile: File) => handleSaveImage(croppedFile)}
        />
      )}
    </div>
  );
};

export default ProfileComponent;
