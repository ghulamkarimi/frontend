"use client";

import RentalLocationCard from "@/components/cards/RentalLocationCard";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../feature/store/store";
import {
  calculatePriceSchutzPacket,
  calculateRentalDays,
} from "@/utils/rentalUtils";
import { useParams } from "next/navigation";
import {
  getRentCarById,
  setIsBasicDetailsActive,
  setRentalDetails,
} from "../../../../feature/reducers/carRentSlice";
import { useEffect } from "react";
import { FaUserTie } from "react-icons/fa6";
import { GiCarDoor } from "react-icons/gi";
import { MdOutlineSevereCold } from "react-icons/md";
import { SiTransmission } from "react-icons/si";

const page = () => {
  const { id: carRentId } = useParams();
  const dispatch = useDispatch();
  const {
    age,
    pickupDate,
    pickupTime,
    returnDate,
    returnTime,
    selectedSchutzPacket,
  } = useSelector((state: RootState) => state.carRent);
  const getOneCar = useSelector((state: RootState) =>
    getRentCarById(state, carRentId! as string)
  );
  const formattedPickupDate = pickupDate
    ? new Date(pickupDate).toLocaleDateString()
    : "Datum nicht verfügbar";
  const formattedReturnDate = returnDate
    ? new Date(returnDate).toLocaleDateString()
    : "Datum nicht verfügbar";
  const formattedPickupTime = pickupTime || "Zeit nicht verfügbar";
  const formattedReturnTime = returnTime || "Zeit nicht verfügbar";
  const rentalDays = calculateRentalDays(pickupDate!, returnDate!);

  const calculateGesamtePriceSchutzPacket = (
  
    dailyRate: number
  ) => {
    return (dailyRate * rentalDays).toFixed(2);
  };

  const storedTotalPrice = localStorage.getItem("gesamtPreice");
  console.log("storedTotalPrice", storedTotalPrice);
  const totalPriceNumber = storedTotalPrice ? parseFloat(storedTotalPrice) : 0;

  useEffect(() => {
    const rentalDetails = {
      pickupDate: localStorage.getItem("pickupDate"),
      returnDate: localStorage.getItem("returnDate"),
      pickupTime: localStorage.getItem("pickupTime"),
      returnTime: localStorage.getItem("returnTime"),
      pickupLocation: localStorage.getItem("pickupLocation"),
      age: localStorage.getItem("age"),
    };

    dispatch(setRentalDetails(rentalDetails));
  }, [dispatch, totalPriceNumber]);

  const rentalDaysReservation = calculateRentalDays(pickupDate!, returnDate!);






  return (
    <div className=" max-w-full">
      <div>
        <RentalLocationCard
          rentalDays={rentalDays}
          carRentId={carRentId as string}
          calculateGesamtePriceSchutzPacket={calculateGesamtePriceSchutzPacket}
          formattedReturnDate={formattedReturnDate}
          formattedPickupDate={formattedPickupDate}
          formattedReturnTime={formattedReturnTime}
          formattedPickupTime={formattedPickupTime}
        />
        <div className=" sticky top-0 z-50 max-w-full flex  justify-center">
          <div className=" lg:w-1/2 w-full flex items-center justify-between mt-3 m-2 px-2 py-3">
            <p className=" text-2xl font-bold">Bestätigen Sie Ihre Buchung</p>
            <p className=" flex flex-col ">
              <span>Gesamt</span>
              <span className="  font-bold">
                {totalPriceNumber.toFixed(2)} €
              </span>
            </p>
          </div>
        </div>
      </div>
      <div className=" w-full flex lg:flex-row flex-col-reverse ">
        <div className=" px-2 mb-3 lg:w-3/6 xl:w-4/6">
          <div className=" py-4 px-2 bg-gray-400 rounded-md flex flex-col gap-3">
            <h1 className=" font-bold text-xl">1. Fahrer-Details</h1>
            <div className=" mt-3  ">
              <div className=" mt-2 flex flex-col gap-2 items-start">
                <label className="block font-medium">Vorname*</label>
                <input
                  id="vorname"
                  className="outline-none border-2 rounded-md bg-white px-2 py-4 w-full"
                  type="text"
                />
              </div>
              <div className="mt-2 flex flex-col gap-2 items-start">
                <label className="block font-medium">Nachname*</label>
                <input
                  id="Nachname"
                  className="outline-none border-2 rounded-md bg-white px-2 py-4 w-full"
                  type="text"
                />
              </div>
              <div className="mt-2 flex flex-col gap-2 items-start">
                <label className="block font-medium">Geburtsdatum*</label>
                <input
                  id="Geburtsdatum"
                  className="outline-none border-2 rounded-md bg-white px-2 py-4 w-full"
                  type="text"
                />
              </div>
              <div className="mt-2 flex flex-col gap-2 items-start">
                <label className="block font-medium">E-Mail*</label>
                <input
                  id=" E-Mail"
                  className="outline-none border-2 rounded-md bg-white px-2 py-4 w-full"
                  type="text"
                />
              </div>
              <div className=" mt-3 flex  gap-2 items-center">
                <input
                  id=" Angebote"
                  className="outline-none border-2 rounded-md bg-white  w-7 h-7"
                  type="checkbox"
                />
                <label className="flex font-medium leading-relaxed">
                  Ich bin damit einverstanden, aktuelle Nachrichten und Angebote
                  von der A&O zu erhalten.
                </label>
              </div>
              <div className=" mt-3 flex  gap-2 items-center ">
                <input
                  id="Neuigkeiten"
                  className="outline-none border-2 rounded-md bg-white  w-7 h-7"
                  type="checkbox"
                />
                <label className="flex font-medium px-2 leading-relaxed">
                  Ich möchte Neuigkeiten und Sonderangebote von der A&O
                  erhalten. finden Sie in unserer Datenschutzbedingungen .
                </label>
              </div>
              <div className="mt-4 flex flex-col gap-2">
                <label
                  htmlFor="telefonnummer"
                  className="font-medium px-2 leading-relaxed"
                >
                  Telefonnummer*
                </label>
                <div className="mt-2 flex items-center border-2 rounded-md bg-white w-full">
                  <span className="flex items-center justify-center px-2">
                    🇩🇪
                  </span>

                  <span className="px-2 text-gray-600">+49</span>

                  <input
                    id="telefonnummer"
                    className="outline-none bg-transparent flex-1 px-2 py-4 text-xl"
                    type="text"
                    placeholder="123 456 789"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className=" px-2 mb-3 mt-3 rounded-md bg-gray-400">
            <div className=" mt-3 py-4 px-2   flex flex-col gap-3">
              <div className=" flex items-center justify-between">
                <h2 className="text-lg font-semibold">Kreditkarte</h2>
                <div className=" flex items-center gap-2">
                  <img src="/paymentBilder/credit-card-amex.svg" alt="" />
                  <img src="/paymentBilder/credit-card-discover.svg" alt="" />
                  <img src="/paymentBilder/credit-card-mastercard.svg" alt="" />
                  <img src="/paymentBilder/credit-card-visa.svg" alt="" />
                </div>
              </div>
              <p className="text-sm text-gray-500 mb-4">
                Die Kreditkarte muss auf den Namen des Hauptfahrers ausgestellt
                sein und muss bei der Abholung vorgelegt werden.
              </p>

              <div>
                <label
                  htmlFor="kartennummer"
                  className="block font-medium mb-1"
                >
                  Kartennummer
                </label>
                <input
                  id="kartennummer"
                  type="text"
                  className="w-full border-2 rounded-md p-2 outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Kartennummer"
                />
              </div>
              {/* Ablaufdatum */}
              <div className="flex gap-4 mt-4">
                <div className="flex-1">
                  <label
                    htmlFor="ablaufdatum"
                    className="block font-medium mb-1"
                  >
                    Ablaufdatum
                  </label>
                  <input
                    id="ablaufdatum"
                    type="text"
                    className="w-full border-2 rounded-md p-2 outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="MM/JJ"
                  />
                </div>
                <div className="flex-1">
                  <label
                    htmlFor="sicherheitscode"
                    className="block font-medium mb-1"
                  >
                    Sicherheitscode
                  </label>
                  <input
                    id="sicherheitscode"
                    type="text"
                    className="w-full border-2 rounded-md p-2 outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="CVV"
                  />
                </div>
              </div>
              <p className="text-sm text-gray-500 mt-4">
                Zu Ihrer Sicherheit kann eine Überprüfung Ihrer Identität
                verlangt werden. Kontaktieren Sie Ihre Bank für weitere
                Informationen.
              </p>
            </div>

            {/* Bestätigen Button */}
            <button
              type="submit"
              className="w-full bg-orange-600 text-white font-medium py-3 rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 mb-3"
            >
              Bestätigen Sie Ihre Buchung
            </button>
          </div>
        </div>
        <div className=" mb-4 px-2 lg:w-3/6 xl:w-2/6">
          <div>
            <div>
              <h1 className=" text-sm font-bold mb-3">{getOneCar?.carName}</h1>
              <img
                className=" px-2 rounded-md"
                src={getOneCar?.carImage}
                alt={getOneCar.carImage}
              />
            </div>
            <div className="w-full flex flex-wrap gap-6 mt-3">
              <span className="cardInfoSell">
                <FaUserTie className="cardInfoSellIcon" />
                {getOneCar?.carPeople}
              </span>
              <span className="cardInfoSell">
                <SiTransmission className="cardInfoSellIcon" />
                {getOneCar?.carGear}
              </span>
              <span className="cardInfoSell">
                <GiCarDoor className="cardInfoSellIcon" />
                {getOneCar?.carDoors}
              </span>

              <span className="flex items-center gap-2 cardInfoSell">
                <MdOutlineSevereCold className="cardInfoSellIcon" />
                Klimaanlage
              </span>
            </div>
            <div className=" mt-2 flex items-center justify-between">
              <span>
                {localStorage.getItem("packet")} für ({rentalDaysReservation}{" "}
                Tage)
              </span>
              <span className=" font-bold">
                {totalPriceNumber.toFixed(2)} €
              </span>
            </div>
            <div className=" mt-3">
              <div className="  py-2  flex flex-col  gap-3">
                <div className=" bg-slate-400 rounded-md px-3 py-2">
                  <p>Abholung</p>
                  <p className=" font-bold text-sm">{formattedPickupDate}</p>
                </div>
                <div className=" bg-slate-400 rounded-md px-3 py-2">
                  <p>Rückgabe</p>
                  <p className=" font-bold text-sm">{formattedReturnDate}</p>
                </div>
              </div>
            </div>
            <div>
              <div className=" flex items-center justify-between">
                <p>Schutzpakete & Extras</p>
                <p>
                  {calculatePriceSchutzPacket(
                    localStorage.getItem("packet")!,
                    rentalDaysReservation
                  )}{" "}
                  €
                </p>
              </div>
              <div className=" border-2 h-1 w-full px-2" />
              <div className=" flex items-center justify-between p-2 w-full">
                <p className=" flex items-center gap-3">
                  <span>{localStorage.getItem("packet")}</span>
                  <span
                    className=" bg-slate-400 text-white w-6 h-6 rounded-full text-center cursor-pointer"
                  >
                    i
                  </span>
                </p>
                <p>{rentalDaysReservation} Tage</p>
              </div>
            </div>
            <div className=" w-full border-2 border-black h-[0.1px] mt-2" />
            <div className=" mt-3 flex items-center justify-around">
              <p>Gesamt</p>
              <p className=" font-bold">{totalPriceNumber.toFixed(2)} €</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
