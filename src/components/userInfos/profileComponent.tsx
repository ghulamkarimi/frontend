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

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onload = (e) => {
        console.log("Bildvorschau:", e.target?.result); // Debugging
        setCroppedImage(e.target?.result as string);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      NotificationService.error("Bitte wählen Sie zuerst ein Bild aus.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("userImage", file);

      console.log("Upload wird gestartet:", file.name);

      const response = await dispatch(profilePhotoUploadApi(file)).unwrap();
      console.log("Profilbild erfolgreich hochgeladen:", response);
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
            onClick={() => document.getElementById("file-upload")?.click()}
          />
        </div>
      </div>

      <input
        id="file-upload"
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />

      {file && (
        <button
          onClick={handleUpload}
          className="mt-4 px-4 py-2 bg-orange-500 text-white rounded-lg shadow-md hover:bg-orange-600"
        >
          Bild hochladen
        </button>
      )}

      {showModal && (
        <Modal
          updateAvatar={(imgSrc: string) => {
            setCroppedImage(imgSrc);
          }}
          closeModal={() => setShowModal(false)}
          onSave={(file: File) => handleUpload()}
        />
      )}
    </div>
  );
};

export default ProfileComponent;
