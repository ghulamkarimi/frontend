"use client";

import "react-image-gallery/styles/css/image-gallery.css";
import "yet-another-react-lightbox/styles.css";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import "react-image-gallery/styles/css/image-gallery.css";
import { useSelector } from "react-redux";
import { RootState } from "../../../../feature/store/store";
import { getRentCarById } from "../../../../feature/reducers/carRentSlice";

const Page = () => {
  const { id: carRentId } = useParams();
  const getOneCar = useSelector((state: RootState) =>
    getRentCarById(state, carRentId! as string)
  );
  const [pickupDate, setPickupDate] = useState<string | null>(null);
  const [pickupTime, setPickupTime] = useState<string | null>(null);
  const [returnDate, setReturnDate] = useState<string | null>(null);
  const [returnTime, setReturnTime] = useState<string | null>(null);
  const [pickupLocation, setPickupLocation] = useState<string | null>(null);
  const [age, setAge] = useState<string | null>(null);

  useEffect(() => {
    // Werte aus localStorage abrufen und im State speichern
    setPickupDate(localStorage.getItem("pickupDate"));
    setPickupTime(localStorage.getItem("pickupTime"));
    setReturnDate(localStorage.getItem("returnDate"));
    setReturnTime(localStorage.getItem("returnTime"));
    setPickupLocation(localStorage.getItem("pickupLocation"));
    setAge(localStorage.getItem("age"));
  }, []);



  const formattedPickupDate = pickupDate
    ? new Date(pickupDate).toLocaleDateString()
    : "Datum nicht verfügbar";
  const formattedReturnDate = returnDate
    ? new Date(returnDate).toLocaleDateString()
    : "Datum nicht verfügbar";
  const formattedPickupTime = pickupTime || "Zeit nicht verfügbar";
  const formattedReturnTime = returnTime || "Zeit nicht verfügbar";

  return (
    <div className=" m-2">
      <div className=" px-2 w-full flex flex-col md:flex-row items-center gap-2">
        <div className=" bg-white px-2 py-4 rounded-lg w-full md:w-1/3 h-[10rem]">
          <div className=" flex gap-2 items-center px-2">
            <span className=" bg-gray-400 px-2 py-1 text-white rounded-br-xl rounded-tl-xl">
              1
            </span>
            <h2 className=" uppercase">MietOrt</h2>
          </div>
          <div className=" flex items-center justify-between mt-2 px-2">
            <p>Abholung</p>
            <p>Rückgabe</p>
          </div>
          <div className=" mt-1 px-2 flex items-center justify-between">
            <p>{pickupLocation}</p>
            <p>{formattedReturnDate}</p>
          </div>
          <div className=" mt-1 px-2 w-full flex items-center justify-between">
            <p >
              {formattedPickupDate} {formattedPickupTime}
            </p>
            <p className=" md:text-center">
              {formattedReturnDate} {formattedReturnTime}
            </p>
          </div>
          <div className=" px-2">Age:{age}</div>
        </div>
        <div className="bg-white px-2 py-4 rounded-lg w-full md:w-1/4 h-[10rem]">
          <div className=" flex gap-2 items-center px-2">
            <span className=" bg-gray-400 px-2 py-1 text-white rounded-br-xl rounded-tl-xl">
              2
            </span>
            <h2 className=" uppercase">Fahrzeug</h2>
          </div>
          <div className=" px-2 mt-3">
            <p>{getOneCar.carName}</p>
            <p>Gesamt price</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;