import React, { useRef, useState } from "react";
import ReactCrop, {
  centerCrop,
  convertToPixelCrop,
  makeAspectCrop,
} from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { type Crop } from "react-image-crop";
import setCanvasPreview from "../crop/setCanvasPreview";

const ASPECT_RATIO = 1; // Seitenverhältnis für den Zuschnitt
const MIN_DIMENSION = 150; // Mindestgröße des Bildes
const ImageCropper = ({
    closeModal,
    updateAvatar,
    onSave,
  }: {
    closeModal: () => void;
    updateAvatar: (imgSrc: string) => void;
    onSave: (file: File) => void; // Ändere FormData zu File
  }) => {
    const imgRef = useRef<HTMLImageElement | null>(null);
    const previewCanvasRef = useRef<HTMLCanvasElement | null>(null);
    const [imgSrc, setImgSrc] = useState<string>("");
    const [crop, setCrop] = useState<Crop>();
    const [error, setError] = useState<string>("");
  
    // Datei auswählen
    const onSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;
  
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        setImgSrc(reader.result?.toString() || "");
      });
      reader.readAsDataURL(file);
    };
  
    const handleSave = () => {
      if (imgRef.current && previewCanvasRef.current && crop) {
        const canvasElement = previewCanvasRef.current;
  
        canvasElement.toBlob((blob) => {
          if (blob) {
            const file = new File([blob], "profile.jpg", { type: blob.type });
            onSave(file); // Übergibt das File-Objekt
          }
        });
      }
    };
  return (
    <div>
      <label className="block mb-3 w-fit">
        <span className="sr-only">Wählen Sie ein Profilbild</span>
        <input
          type="file"
          accept="image/*"
          onChange={onSelectFile}
          className="block w-full text-sm text-slate-500 file:mr-4 file:py-1 file:px-2 file:rounded-full file:border-0 file:text-xs file:bg-gray-700 file:text-sky-300 hover:file:bg-gray-600"
        />
      </label>
      {error && <p className="text-red-400 text-xs">{error}</p>}
      {imgSrc && (
        <div className="flex flex-col items-center">
          <ReactCrop
            crop={crop}
            onChange={(percentCrop) => setCrop(percentCrop)}
            circularCrop
            keepSelection
            aspect={ASPECT_RATIO}
            minWidth={MIN_DIMENSION}
          >
            <img
              ref={imgRef}
              src={imgSrc}
              alt="Upload"
              style={{ maxHeight: "70vh" }}
              
            />
          </ReactCrop>
        </div>
      )}
      <div className="flex justify-end space-x-4 mt-4">
        <button
          className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
          onClick={closeModal}
        >
          Abbrechen
        </button>
        <button
          className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
          onClick={handleSave}
        >
          Speichern
        </button>
      </div>
      {crop && <canvas ref={previewCanvasRef} className="hidden" />}
    </div>
  );
};

export default ImageCropper;
