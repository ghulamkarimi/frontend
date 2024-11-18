"use client";

import "react-image-gallery/styles/css/image-gallery.css";
import "yet-another-react-lightbox/styles.css";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../../feature/store/store";
import {
  getRentCarById,
  setIsBasicDetailsActive,
  setIsMediumDetailsActive,
  setIsPremiumDetailsActive,
  setSelectedSchutzPackage,
} from "../../../../feature/reducers/carRentSlice";

import PackageOption from "@/components/cards/PackageOption";

const Page = () => {
  const { id: carRentId } = useParams();
  const getOneCar = useSelector((state: RootState) =>
    getRentCarById(state, carRentId! as string)
  );

  console.log("getOneCar", getOneCar);

  const dispatch = useDispatch();
  const {
    isBasicDetailsActive,
    isMediumDetailsActive,
    isPremiumDetailsActive,
    selectedSchutzPacket,
  } = useSelector((state: RootState) => state.carRent);

  const [pickupDate, setPickupDate] = useState<string | null>(null);
  const [pickupTime, setPickupTime] = useState<string | null>(null);
  const [returnDate, setReturnDate] = useState<string | null>(null);
  const [returnTime, setReturnTime] = useState<string | null>(null);
  const [pickupLocation, setPickupLocation] = useState<string | null>(null);
  const [age, setAge] = useState<string | null>(null);

  const storedTotalPrice = parseFloat(
    localStorage.getItem("totalPrice") || "0"
  );

  useEffect(() => {}, [storedTotalPrice]);

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

  const handleSelectPacket = (packet: string) =>
    dispatch(setSelectedSchutzPackage(packet));
  const toggleDetails = (packet: string) => {
    if (packet === "Basic")
      dispatch(setIsBasicDetailsActive(!isBasicDetailsActive));
    if (packet === "Medium")
      dispatch(setIsMediumDetailsActive(!isMediumDetailsActive));
    if (packet === "Premium")
      dispatch(setIsPremiumDetailsActive(!isPremiumDetailsActive));
  };

  const calculateRentalDays = () => {
    if (pickupDate && returnDate) {
      const pickup = new Date(pickupDate);
      const returnD = new Date(returnDate);
      const timeDifference = returnD.getTime() - pickup.getTime();
      const rentalDays = Math.ceil(timeDifference / (1000 * 3600 * 24)); // Convert ms to days
      return rentalDays;
    }
    return 0;
  };

  const rentalDays = calculateRentalDays();

  // Calculate total prices for each package
  const calculateGesamtePriceSchutzPacket = (dailyRate: number) => {
    return (dailyRate * rentalDays).toFixed(2);
  };

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
            <p className="font-bold text-xl">
              {" "}
              {(Number(getOneCar.carPrice) * rentalDays).toFixed(2)} €
            </p>
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
                <span>
                  {selectedSchutzPacket === "Medium"
                    ? `${calculateGesamtePriceSchutzPacket(11.1)} €`
                    : selectedSchutzPacket === "Premium"
                    ? `${calculateGesamtePriceSchutzPacket(14.2)} €`
                    : "Inklusive"}
                </span>
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
            <p className=" text-xl font-extrabold">
              {(() => {
                const basePrice = (Number(getOneCar.carPrice) * rentalDays);
                let protectionPrice = 0;

                if (selectedSchutzPacket === "Medium") {
                  protectionPrice = parseFloat(
                    calculateGesamtePriceSchutzPacket(11.1)
                  );
                } else if (selectedSchutzPacket === "Premium") {
                  protectionPrice = parseFloat(
                    calculateGesamtePriceSchutzPacket(14.2)
                  );
                }

                const totalPrice = basePrice + protectionPrice;
                return `${totalPrice.toFixed(2)} €`;
              })()}
            </p>
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
            <span className=" font-bold text-xl">
            {(() => {
                const basePrice = (Number(getOneCar.carPrice) * rentalDays);
                let protectionPrice = 0;

                if (selectedSchutzPacket === "Medium") {
                  protectionPrice = parseFloat(
                    calculateGesamtePriceSchutzPacket(11.1)
                  );
                } else if (selectedSchutzPacket === "Premium") {
                  protectionPrice = parseFloat(
                    calculateGesamtePriceSchutzPacket(14.2)
                  );
                }

                const totalPrice = basePrice + protectionPrice;
                return `${totalPrice.toFixed(2)} €`;
              })()}
            </span>
          </p>
          <button className=" col-span-3 px-6 py-3 bg-yellow-500 rounded-md">
            Reservierung abschließen
          </button>
        </div>
      </div>
      <div className=" px-2 py-4">
        <div className={`mt-4 w-1/2 flex justify-center`}>
          <h1 className=" font-bold text-xl xl:text-2xl   ">Schutzpakete</h1>
        </div>

        {/* Basic Package Option */}
        <div className=" w-full flex flex-col lg:flex-row ">
          <PackageOption
            name="Basic"
            deductible="500"
            dailyRate="InKlusive "
            features={[
              "Kollisionsschäden und Diebstahlschutz",
              "Windschutzscheibenschutz",
              "Insassenunfallschutz",
              "Keine Abdeckung für persönliche Gegenstände",
            ]}
            isSelected={selectedSchutzPacket === "Basic"}
            onSelect={() => handleSelectPacket("Basic")}
            onToggleDetails={() => toggleDetails("Basic")}
            isDetailsActive={isBasicDetailsActive}
            gesamteSchutzPrice=""
          />

          {/* Medium Package Option */}
          <PackageOption
            name="Medium"
            deductible="450"
            dailyRate="11.10 €"
            features={[
              "Kollisionsschäden und Diebstahlschutz",
              "Schutz für Windschutzscheibe, Glas, Scheinwerfer, Reifen",
              "Insassenunfallschutz",
              "Schutz für persönliche Gegenstände",
            ]}
            isSelected={selectedSchutzPacket === "Medium"}
            onSelect={() => handleSelectPacket("Medium")}
            onToggleDetails={() => toggleDetails("Medium")}
            isDetailsActive={isMediumDetailsActive}
            gesamteSchutzPrice={calculateGesamtePriceSchutzPacket(11.1)}
          />

          {/* Premium Package Option */}
          <PackageOption
            name="Premium"
            deductible="0"
            dailyRate="14.20 €"
            features={[
              "Kollisionsschäden und Diebstahlschutz",
              "Vollschutz für Windschutzscheibe, Glas, Scheinwerfer, Reifen",
              "Insassenunfallschutz",
              "Schutz für persönliche Gegenstände",
            ]}
            isSelected={selectedSchutzPacket === "Premium"}
            onSelect={() => handleSelectPacket("Premium")}
            onToggleDetails={() => toggleDetails("Premium")}
            isDetailsActive={isPremiumDetailsActive}
            gesamteSchutzPrice={calculateGesamtePriceSchutzPacket(14.2)}
          />
        </div>
      </div>
    </div>
  );
};

export default Page;
