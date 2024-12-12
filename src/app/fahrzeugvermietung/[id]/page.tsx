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
import { calculateRentalDays, useSelectPacket } from "@/utils/rentalUtils";
import { getAllSchutzPacket, setSchutzPacketId } from "../../../../feature/reducers/schutzPacketSlice";


const Page = () => {
  const { id: carRentId } = useParams();
  const getOneCar = useSelector((state: RootState) =>
    getRentCarById(state, carRentId! as string)
  );

  const router = useRouter();
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
  const allSchutzPaket = useSelector(getAllSchutzPacket);
  const storedTotalPrice = parseFloat(
    localStorage.getItem("totalPrice") || "0"
  );
  console.log("allSchutzPaket", allSchutzPaket);

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

  const handleSelectPacket = (packet: string, schutzPacketId: string) => {
    const schutzPacket = allSchutzPaket.find(
      (packet) => packet._id === schutzPacketId
    );

    if (!schutzPacket) return "0.00";

    dispatch(setSchutzPacketId(schutzPacketId));
    dispatch(setSelectedSchutzPackage(packet));
    localStorage.setItem("packet", packet);
    localStorage.setItem("schutzPacketId", schutzPacketId);
    const gesamtPrice = calculateGesamtePriceSchutzPacket(schutzPacketId);
    localStorage.setItem("PriceSchutz", JSON.stringify([{ id: schutzPacketId, price: gesamtPrice }]));

  };



  const rentalDays = calculateRentalDays(
    pickupDate!,
    pickupTime!,
    returnDate!,
    returnTime!
  );

  const calculateGesamtePriceSchutzPacket = (schutzPacketId: string) => {
    const schutzPacket = allSchutzPaket.find(
      (packet) => packet._id === schutzPacketId
    );

    if (!schutzPacket) return "0.00";

    let localPriceArray = [];
    const dailyRate = schutzPacket.dailyRate;
    const gesamtPrice = (dailyRate * rentalDays).toFixed(2);

    // Speichern des Schutzpakets-IDs und des Preises als Array im localStorage
    const priceArray = { id: schutzPacketId, price: gesamtPrice };
    localPriceArray.push(priceArray);
    localStorage.setItem("PriceSchutz", JSON.stringify(localPriceArray));

    console.log("dailyRate", dailyRate);
    console.log("gesamtPrice", gesamtPrice);

    return gesamtPrice;
  };
  
  

  const toggleDetails = (packet: string) => {
    if (packet === "Basic")
      dispatch(setIsBasicDetailsActive(!isBasicDetailsActive));
    dispatch(setSchutzPacketId(localStorage.getItem("SchutzPacketId")))
  

    if (packet === "Medium")
      dispatch(setIsMediumDetailsActive(!isMediumDetailsActive));
    dispatch(setSchutzPacketId(localStorage.getItem("SchutzPacketId")))


    if (packet === "Premium")
      dispatch(setIsPremiumDetailsActive(!isPremiumDetailsActive));
    dispatch(setSchutzPacketId(localStorage.getItem("SchutzPacketId")))
  
  };

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

                // Aktuelles Schutzpaket aus dem lokalen Speicher
                const selectedPacketName = localStorage.getItem("packet");
                const selectedPacket = allSchutzPaket.find(
                  (packet) => packet.name === selectedPacketName
                );

                const protectionPrice = selectedPacket
                  ? parseFloat(
                      calculateGesamtePriceSchutzPacket(selectedPacket._id)
                    )
                  : 0;

                const totalPrice = basePrice + protectionPrice;
                return `${totalPrice.toFixed(2)} €`;
              })()}
            </span>
          </p>
          <button
            onClick={() => {
              localStorage.setItem("rentalDays", String(rentalDays));
              router.push(`/reservation/${carRentId}`);
            }}
            className=" col-span-3 px-6 py-3 bg-yellow-500 rounded-md"
          >
            Reservierung abschließen
          </button>
        </div>
      </div>
      <div className=" px-2 py-4">
        <div className={`mt-4 w-1/2 flex justify-center`}>
          <h1 className=" font-bold text-xl xl:text-2xl   ">Schutzpakete</h1>
        </div>

        <div className=" w-full flex flex-col lg:flex-row ">
          {allSchutzPaket.map((schutzPacket) => (
           <PackageOption
           key={schutzPacket._id}
           name={schutzPacket?.name}
           deductible={schutzPacket?.deductible}
           dailyRate={schutzPacket?.dailyRate}
           features={schutzPacket?.features || []}
           isSelected={selectedSchutzPacket === schutzPacket?.name}
           onSelect={() => handleSelectPacket(schutzPacket?.name,schutzPacket?._id)}
           onToggleDetails={() => toggleDetails(schutzPacket?.name)}
           isDetailsActive={
             schutzPacket.name === "Basic"
               ? isBasicDetailsActive
               : schutzPacket.name === "Medium"
               ? isMediumDetailsActive
               : isPremiumDetailsActive
           }
           gesamteSchutzPrice={calculateGesamtePriceSchutzPacket(schutzPacket._id)
            //price={gesamteSchutzPrice}

            
           }
         />
         
          ))}
        </div>
      </div>
    </div>
  );
};

export default Page;
