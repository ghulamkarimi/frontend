"use client";

import "react-image-gallery/styles/css/image-gallery.css";
import "yet-another-react-lightbox/styles.css";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../../feature/store/store";
import {
  getRentCarById,
  setTotalPrice,
} from "../../../../feature/reducers/carRentSlice";
import { FaCheck } from "react-icons/fa6";
import { AiOutlineClose } from "react-icons/ai";

const Page = () => {
  const { id: carRentId } = useParams();
  const getOneCar = useSelector((state: RootState) =>
    getRentCarById(state, carRentId! as string)
  );

  const dispatch = useDispatch();
  const { totalPrice } = useSelector((state: RootState) => state.carRent);

  const [pickupDate, setPickupDate] = useState<string | null>(null);
  const [pickupTime, setPickupTime] = useState<string | null>(null);
  const [returnDate, setReturnDate] = useState<string | null>(null);
  const [returnTime, setReturnTime] = useState<string | null>(null);
  const [pickupLocation, setPickupLocation] = useState<string | null>(null);
  const [age, setAge] = useState<string | null>(null);

  // Laden von totalPrice aus localStorage beim ersten Laden
  useEffect(() => {
    const savedTotalPrice = localStorage.getItem("totalPrice");
    if (savedTotalPrice) {
      dispatch(setTotalPrice(Number(savedTotalPrice)));
    }
  }, [dispatch]);

  useEffect(() => {
    if (totalPrice !== null) {
      localStorage.setItem("totalPrice", totalPrice.toString());
    }
  }, [totalPrice]);

  // Laden weiterer Werte aus localStorage
  useEffect(() => {
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
            <p className=" font-bold text-xl">
              {getOneCar?.carName || "Car name not available"}
            </p>
            <p className="font-bold text-xl"> {totalPrice || ""} €</p>
          </div>
        </div>
        <div className="bg-white px-2 py-4 rounded-lg w-full md:w-1/5 overflow-hidden h-[11rem]">
          <div className=" flex gap-2 items-center px-2">
            <span className=" bg-gray-400 px-2 py-1 text-white rounded-br-xl rounded-tl-xl">
              2
            </span>
            <h2 className=" uppercase">
              Schutzpakete,
              <br />
              Extras
            </h2>
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
        <div className=" px-2 xl:grid xl:grid-cols-12 flex flex-col items-center  gap-3 place-items-start overflow-hidden mt-3 border-2">
          <p className=" text-2xl font-bold xl:col-span-6 w-full text-center">
            Wählen Sie Ihr Schutzpaket & weitere Extras
          </p>
          <p className=" xl:col-span-3 flex flex-col">
            <span>Gesamt</span>
            <span className=" font-bold text-xl">{totalPrice || ""} €</span>
          </p>
          <button className=" col-span-3 px-6 py-3 bg-yellow-500 rounded-md">
            Reservierung abschließen
          </button>
        </div>
      </div>
      <div className=" px-2 py-4">
        <h1 className=" font-bold text-xl">Schutzpakete</h1>
        <div className="w-1/3 px-2 mt-2 ">
          <fieldset className="border-2 border-orange-300 shadow-lg shadow-orange-500 p-4 rounded-lg ">
            <legend className="font-bold text-xs p-1 rounded-md bg-green-400">
              Ausgewählt
            </legend>
            <div className=" font-bold">
              <h1>Basic</h1>
              <p>Selbstbeteiligung: 950,00 €</p>
            </div>
            <div className=" mt-7 font-bold">
              <p>Inklusive</p>
            </div>
            <div className="bg-gray-300 w-13 h-[2px] px-2 mt-7" />

            <div className=" mt-4 flex flex-col gap-3">
              <div className=" flex gap-3 items-center">
                <FaCheck className=" text-green-400 text-sm" />
                <p className=" text-black ">Kollisionsschäden und Diebstahlschutz</p>
              </div>
              <div className=" flex gap-3 items-center">
                <AiOutlineClose className=" text-black text-sm" />
                <p className=" text-gray-400 underline text-decoration-color-gray-400 decoration-1">Schutz vor Schäden an Windschutzscheibe, Glas, Scheinwerfer und Reifen</p>
              </div>
              <div className=" flex gap-3 items-center">
                <AiOutlineClose className=" text-black text-sm " />
                <p className=" text-gray-400 underline text-decoration-color-gray-400 decoration-1">Insassenunfallschutz</p>
              </div>
              <div className=" flex gap-3 items-center ">
                <AiOutlineClose className=" text-black text-sm" />
                <p className="text-gray-400 underline text-decoration-color-gray-400 decoration-1">Schutz für persönliche Gegenstände</p>
              </div>
            </div>
          </fieldset>
        </div>
      </div>
    </div>
  );
};

export default Page;
