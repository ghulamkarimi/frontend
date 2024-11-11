"use client";

import "react-image-gallery/styles/css/image-gallery.css";
import "yet-another-react-lightbox/styles.css";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import "react-image-gallery/styles/css/image-gallery.css";
import { useSelector } from "react-redux";
import { RootState } from "../../../../feature/store/store";
import { getRentCarById, setTotalPrice } from "../../../../feature/reducers/carRentSlice";
import { useDispatch } from "react-redux";

const Page = () => {
  const { id: carRentId } = useParams();
  const getOneCar = useSelector((state: RootState) =>
    getRentCarById(state, carRentId! as string)
  );

  const dispatch = useDispatch()
  const {totalPrice} = useSelector((state:RootState)=>state.carRent)

  console.log("totalPrice", totalPrice);
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
      <div className=" px-2 w-full flex flex-col md:flex-row items-center md:justify-center gap-2">
        <div className=" bg-white px-2 py-4 rounded-lg w-full md:w-1/3 md:h-[11rem]">
          <div className=" flex gap-2 items-center px-2">
            <span className=" bg-gray-400 px-2 py-1 text-white rounded-br-xl rounded-tl-xl">
              1
            </span>
            <h2 className=" uppercase">MietOrt</h2>
          </div>
          <div className=" flex items-center justify-between mt-2 px-2">
            <p className=" font-bold text-xl">Abholung</p>
            <p className=" font-bold text-xl">Rückgabe</p>
          </div>
          <div className=" mt-1 px-2 flex items-center justify-between font-bold text-sm">
            <p>{pickupLocation}</p>
            <p>{formattedReturnDate}</p>
          </div>
          <div className=" mt-1 px-2 w-full flex items-center justify-between font-bold text-sm text-red-500">
            <p className=" font-bold text-sm">
              {formattedPickupDate} {formattedPickupTime}
            </p>
            <p className=" md:text-center">
              {formattedReturnDate} {formattedReturnTime}
            </p>
          </div>
          <div className=" px-2 font-bold text-sm">Age:{age}</div>
        </div>
        <div className="bg-white px-2 py-4 rounded-lg w-full md:w-1/5 h-[11rem]">
          <div className=" flex gap-2 items-center px-2">
            <span className=" bg-gray-400 px-2 py-1 text-white rounded-br-xl rounded-tl-xl">
              2
            </span>
            <h2 className=" uppercase">Fahrzeug</h2>
          </div>
          <div className=" px-2 mt-3 flex flex-col gap-4">
            <p className=" font-bold text-xl">{getOneCar?.carName || "Car name not available"}</p>
            <p className="font-bold text-xl">
              {" "}
              {totalPrice || ""} €
            </p>
          </div>
        </div>
        <div className="bg-white px-2 py-4 rounded-lg w-full md:w-1/5 overflow-hidden h-[11rem]">
          <div className=" flex gap-2 items-center px-2">
            <span className=" bg-gray-400 px-2 py-1 text-white rounded-br-xl rounded-tl-xl">
              2
            </span>
            <h2 className=" uppercase">Schutzpakete,<br/>Extras</h2>
          </div>
          <div className=" grid grid-cols-2 items-center gap-2 mt-2 ">
            <div className=" col-span-1">
              <p className=" font-bold text-xl">Basic</p>
              <span>Inklusive</span>
            </div>
            <div className=" col-span-1 flex items-center gap-2">
            <div className=" border-2 h-9 border-orange-400" />
            <div>
              <p className="font-bold text-sm"> Extra</p>
              <span>0.00 €</span>
            </div>
            </div>
          </div>
        </div>
        <div className="bg-white px-2 py-4 rounded-lg w-full md:w-1/5 h-[11rem]">
          <div className=" flex gap-2 items-center px-2">
            <span className=" bg-gray-400 px-2 py-1 text-white rounded-br-xl rounded-tl-xl">
              2
            </span>
            <h2 className=" uppercase">Übersicht</h2>
          </div>
          <div className=" flex flex-col gap-4 mt-2 font-bold text-xl">
            <p>Gesamtpreis</p>
            <p className=" text-xl font-extrabold">{totalPrice || ""} €</p>
          </div>
        </div>
      </div>
      <div className=" w-full ">
        <div className=" px-2 grid grid-cols-12 gap-3 place-items-start overflow-hidden mt-3">
            <p className=" text-2xl font-bold col-span-6 w-full text-center">Wählen Sie Ihr Schutzpaket & weitere Extras</p>
            <p className=" col-span-3 flex flex-col">
                <span>Gesamt</span>                
                <span className=" font-bold text-xl">{totalPrice || ""} €</span>
                </p>
                <button className=" col-span-3 px-6 py-3 bg-yellow-500 rounded-md"> Reservirung abschließen</button>
        </div>
      </div>
    </div>
  );
};

export default Page;
