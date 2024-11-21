"use client";

import "react-image-gallery/styles/css/image-gallery.css";
import "yet-another-react-lightbox/styles.css";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../../feature/store/store";
import {
  getRentCarById,
  setIsBasicDetailsActive,
  setIsMediumDetailsActive,
  setIsPremiumDetailsActive,
  setRentalDetails,
  setSelectedSchutzPackage,
} from "../../../../feature/reducers/carRentSlice";

import PackageOption from "@/components/cards/PackageOption";
import RentalLocationCard from "@/components/cards/RentalLocationCard";
import { calculatePriceSchutzPacket, calculateRentalDays, useSelectPacket } from "@/utils/rentalUtils";


const Page = () => {
  const { id: carRentId } = useParams();
  const getOneCar = useSelector((state: RootState) =>
    getRentCarById(state, carRentId! as string)
  );


const router = useRouter()
  const dispatch = useDispatch();
  const {
    isBasicDetailsActive,
    isMediumDetailsActive,
    isPremiumDetailsActive,
    selectedSchutzPacket,
    pickupDate,
    pickupTime,
    returnDate,
    returnTime,
  } = useSelector((state: RootState) => state.carRent);

  const storedTotalPrice = parseFloat(
    localStorage.getItem("totalPrice") || "0"
  );

  useEffect(() => {}, [storedTotalPrice]);

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
  }, [dispatch]);

  const formattedPickupDate = pickupDate
    ? new Date(pickupDate).toLocaleDateString()
    : "Datum nicht verfügbar";
  const formattedReturnDate = returnDate
    ? new Date(returnDate).toLocaleDateString()
    : "Datum nicht verfügbar";
  const formattedPickupTime = pickupTime || "Zeit nicht verfügbar";
  const formattedReturnTime = returnTime || "Zeit nicht verfügbar";

  const handleSelectPacket = useSelectPacket();

 
 
  const toggleDetails = (packet: string) => {
    if (packet === "Basic")
      dispatch(setIsBasicDetailsActive(!isBasicDetailsActive));
    console.log("packet",packet)
    if (packet === "Medium")
      dispatch(setIsMediumDetailsActive(!isMediumDetailsActive));
    console.log("packet",packet)
    if (packet === "Premium")
      dispatch(setIsPremiumDetailsActive(!isPremiumDetailsActive));
    console.log("packet",packet)
  };



  const rentalDays = calculateRentalDays(pickupDate!, returnDate!);

  // Calculate total prices for each package
  const calculateGesamtePriceSchutzPacket = (dailyRate: number) => {
    return (dailyRate * rentalDays).toFixed(2);
  };
  // const calculateGesamtePriceSchutzPackets = calculatePriceSchutzPacket(localStorage.getItem("packet")!,rentalDays)

  return (
    <div className=" m-2">
      <RentalLocationCard
        rentalDays={rentalDays}
        carRentId={carRentId as string}
        calculateGesamtePriceSchutzPacket={calculateGesamtePriceSchutzPacket}
        formattedReturnDate={formattedReturnDate}
        formattedPickupDate={formattedPickupDate}
        formattedReturnTime={formattedReturnTime}
        formattedPickupTime={formattedPickupTime}
      />

      <div className=" w-full ">
        <div className=" px-2 xl:grid xl:grid-cols-12 flex flex-col items-center  gap-3 place-items-start overflow-hidden mt-3 border-2">
          <p className=" text-2xl font-bold xl:col-span-6 w-full text-center">
            Wählen Sie Ihr Schutzpaket & weitere Extras
          </p>
          <p className=" xl:col-span-3 flex flex-col">
            <span>Gesamt</span>
            <span className=" font-bold text-xl">
              {(() => {
                const basePrice = Number(getOneCar?.carPrice) * rentalDays;
                let protectionPrice = 0;

                if (localStorage.getItem("packet") === "Medium") {
                  protectionPrice = parseFloat(
                    calculateGesamtePriceSchutzPacket(11.1)
                  );
                } else if (localStorage.getItem("packet") === "Premium") {
                  protectionPrice = parseFloat(
                    calculateGesamtePriceSchutzPacket(14.2)
                  );
                }

                const totalPrice = basePrice + protectionPrice;
                return `${totalPrice.toFixed(2)} €`;
              })()}
            </span>
          </p>
          <button
          onClick={()=>{
            router.push(`/reservation/${carRentId}`)
          }}
          className=" col-span-3 px-6 py-3 bg-yellow-500 rounded-md">
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
            gesamteSchutzPrice={calculateGesamtePriceSchutzPacket(1)}
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
