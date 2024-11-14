"use client";

import { useRouter } from "next/navigation";
import "./globals.css";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../feature/store/store";
import {
  setCarId,
  setIsBasicDetailsActive,
  setIsCarVerfügbar,
  setIsMediumDetailsActive,
  setIsPremiumDetailsActive,
} from "../../feature/reducers/carRentSlice";
import { AiOutlineClose } from "react-icons/ai";

import { useEffect } from "react";
import { FaCheck } from "react-icons/fa6";

interface LayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: LayoutProps) {
  const { isCarVerfügbar, totalPrice, carId, isBasicDetailsActive,isMediumDetailsActive,isPremiumDetailsActive } =
    useSelector((state: RootState) => state.carRent);
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    // Zugriff auf `localStorage` nur im Browser
    const storedCarId = localStorage.getItem("carRentId");
    dispatch(setCarId(storedCarId));
  }, []);

  return (
    <main className="relative z-10">
      {/* Apply blur to children when isCarVerfügbar is true */}
      <div className={isCarVerfügbar ? "blur-sm" : ""}>{children}</div>

      {isCarVerfügbar && (
        <div className="fixed inset-0 flex items-center justify-center z-50 md:w-full">
          <div className="px-4 py-6 flex flex-col w-full md:w-2/3 bg-white rounded-md max-w-lg mx-auto shadow-lg">
            <h1 className="font-bold text-center text-lg md:text-xl xl:text-2xl">
              Sie haben ein Fahrzeug mit geringer Verfügbarkeit ausgewählt
            </h1>
            <p className="text-center mt-4">
              Sie haben eine Fahrzeugkategorie mit geringer Verfügbarkeit
              ausgewählt. Sobald Ihre Buchung abgeschlossen ist, wird sich die
              Station nach Prüfung der Verfügbarkeit innerhalb von 8 Stunden bei
              Ihnen melden, um die Buchung zu bestätigen. Falls die Buchung
              nicht bestätigt wird, bitten wir Sie, eine neue Buchung zu
              tätigen.
            </p>
            <div className="flex py-4 justify-center gap-4 mt-4">
              <button
                onClick={() => {
                  if (carId) {
                    localStorage.setItem("totalPrice", totalPrice.toString());
                    setTimeout(() => {
                      router.push(`/fahrzeugvermietung/${carId}`);
                      dispatch(setIsCarVerfügbar(false));
                    }, 2000);
                  }
                }}
                className="bg-yellow-400 font-bold md:text-lg px-6 py-2 rounded-md"
              >
                Weiter mit diesem Fahrzeug
              </button>
              <button
                onClick={() => dispatch(setIsCarVerfügbar(false))}
                className="border-2 border-orange-400 text-orange-400 font-bold px-6 py-2 rounded-md"
              >
                Ein anderes Fahrzeug auswählen
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Dark background overlay when isBasicDetailsActive is true */}
      {isBasicDetailsActive && (
        <div className="fixed inset-0 flex items-center justify-center  bg-black bg-opacity-50 z-50">
          <div className=" mt-3 md:w-5/6 xl:w-1/2 w-full h-5/6 xl:h-full border border-gray-300 bg-white shadow-lg  rounded-md py-5 px-3 mx-2 md:mx-0">
            <div className="flex items-start justify-center gap-2 ">
              <div className="flex flex-col justify-start">
                <p className="text-lg font-semibold">Basic</p>
                <p className="text-sm text-gray-600">
                  Selbstbeteiligung: 950,00 €
                </p>
              </div>
              <div className="border-2 border-black w-1 h-8 mx-4" />
              <div className="flex flex-col justify-start">
                <p className="text-lg font-semibold">Inklusive</p>
              </div>
            </div>
            <div className=" flex flex-wrap items-center w-full">
              <div className=" flex flex-col  gap-4 mt-4">
                <div className=" flex gap-3 items-center">
                  <FaCheck className=" text-green-400 text-sm" />
                  <p className=" text-black font-bold">
                    Kollisionsschäden und Diebstahlschutz
                  </p>
                </div>
                <div className=" md:w-1/2 max-w-full px-2 ">
                  Reduzierung Ihrer Haftung bei Diebstahl, versuchtem Diebstahl,
                  Kollision oder Beschädigung des Fahrzeugs. Sie deckt keine
                  Personenschäden des Fahrers oder der Insassen ab. Reduzieren
                  Sie Ihre Selbstbeteiligung zu 950.00 EUR
                </div>
              </div>
              <div className=" flex flex-col  gap-4 mt-4">
                <div className=" flex gap-3 items-center">
                  <AiOutlineClose className=" text-gray-200 text-sm" />
                  <p className=" text-gray-300 underline text-decoration-color-gray-400 decoration-1">
                    Insassenunfallschutz
                  </p>
                </div>
                <div className=" md:w-1/2 max-w-full px-2 text-gray-300">
                  Schützen Sie Ihre Liebsten. Der persönliche Unfallschutz
                  stellt Fahrer und Beifahrern bei Tod oder Verletzung eine
                  Entschädigung und deckt die medizinischen Kosten.
                </div>
              </div>
              <div className=" flex flex-col  gap-4 mt-4">
                <div className=" flex gap-3 items-center">
                  <AiOutlineClose className=" text-gray-200 text-sm" />
                  <p className=" text-gray-300 underline text-decoration-color-gray-400 decoration-1">
                    Schutz vor Schäden an Windschutzscheibe, Glas, Scheinwerfer
                    und Reifen
                  </p>
                </div>
                <div className=" md:w-1/2 max-w-full px-2 text-gray-300">
                  Schutz bei Schäden an Windschutzscheibe, Scheinwerfern und
                  Reifen bei normalem Gebrauch des Fahrzeugs.
                </div>
              </div>
              <div className=" flex flex-col  gap-4 mt-4">
                <div className=" flex gap-3 items-center">
                  <AiOutlineClose className=" text-gray-200 text-sm" />
                  <p className=" text-gray-300 underline text-decoration-color-gray-400 decoration-1">
                    Schutz für persönliche Gegenstände
                  </p>
                </div>
                <div className=" md:w-1/2 max-w-full px-2 text-gray-300">
                  Entschädigung für Ihre persönlichen Gegenstände im Falle von
                  Zerstörung oder Diebstahl.gs.
                </div>
              </div>
              <div className=" flex items-center w-full justify-around mt-6">
                <button onClick={()=>{
                    dispatch(setIsBasicDetailsActive(false))
                }} className=" px-8 py-2 border-2 border-orange-400 rounded-md">Züruck zu Ihre Buchung</button>
                <button  className="bg-yellow-400 font-bold md:text-lg px-6 py-2 rounded-md" >Auswählen</button>
              </div>
            </div>
          </div>
        </div>
      )}

        {/* Dark background overlay when isMedium DetailsActive is true */}
        {isMediumDetailsActive && (
        <div className="fixed inset-0 flex items-center justify-center  bg-black bg-opacity-50 z-50">
          <div className=" mt-3 md:w-5/6 xl:w-1/2 w-full h-5/6 xl:h-full border border-gray-300 bg-white shadow-lg  rounded-md py-5 px-3 mx-2 md:mx-0">
            <div className="flex items-start justify-center gap-2 ">
              <div className="flex flex-col justify-start">
                <p className="text-lg font-semibold">Basic</p>
                <p className="text-sm text-gray-600">
                  Selbstbeteiligung: 950,00 €
                </p>
              </div>
              <div className="border-2 border-black w-1 h-8 mx-4" />
              <div className="flex flex-col justify-start">
              <p>11,10 € /tag </p>
              <p>Gesamt</p>
              </div>
            </div>
            <div className=" flex flex-wrap items-center w-full">
              <div className=" flex flex-col  gap-4 mt-4">
                <div className=" flex gap-3 items-center">
                  <FaCheck className=" text-green-400 text-sm" />
                  <p className=" text-black font-bold">
                    Kollisionsschäden und Diebstahlschutz
                  </p>
                </div>
                <div className=" md:w-1/2 max-w-full px-2 ">
                  Reduzierung Ihrer Haftung bei Diebstahl, versuchtem Diebstahl,
                  Kollision oder Beschädigung des Fahrzeugs. Sie deckt keine
                  Personenschäden des Fahrers oder der Insassen ab. Reduzieren
                  Sie Ihre Selbstbeteiligung zu 950.00 EUR
                </div>
              </div>
              <div className=" flex flex-col  gap-4 mt-4">
                <div className=" flex gap-3 items-center">
                <FaCheck className=" text-green-400 text-sm" />
                  <p className=" text-black underline text-decoration-color-gray-400 decoration-1">
                    Insassenunfallschutz
                  </p>
                </div>
                <div className=" md:w-1/2 max-w-full px-2 text-black">
                  Schützen Sie Ihre Liebsten. Der persönliche Unfallschutz
                  stellt Fahrer und Beifahrern bei Tod oder Verletzung eine
                  Entschädigung und deckt die medizinischen Kosten.
                </div>
              </div>
              <div className=" flex flex-col  gap-4 mt-4">
                <div className=" flex gap-3 items-center">
                <FaCheck className=" text-green-400 text-sm" />
                  <p className=" text-black underline text-decoration-color-gray-400 decoration-1">
                    Schutz vor Schäden an Windschutzscheibe, Glas, Scheinwerfer
                    und Reifen
                  </p>
                </div>
                <div className=" md:w-1/2 max-w-full px-2 text-black">
                  Schutz bei Schäden an Windschutzscheibe, Scheinwerfern und
                  Reifen bei normalem Gebrauch des Fahrzeugs.
                </div>
              </div>
              <div className=" flex flex-col  gap-4 mt-4">
                <div className=" flex gap-3 items-center">
                  <AiOutlineClose className=" text-gray-200 text-sm" />
                  <p className=" text-gray-300 underline text-decoration-color-gray-400 decoration-1">
                    Schutz für persönliche Gegenstände
                  </p>
                </div>
                <div className=" md:w-1/2 max-w-full px-2 text-gray-300">
                  Entschädigung für Ihre persönlichen Gegenstände im Falle von
                  Zerstörung oder Diebstahl.gs.
                </div>
              </div>
              <div className=" flex items-center w-full justify-around mt-6">
                <button onClick={()=>{
                    dispatch(setIsMediumDetailsActive(false))
                }} className=" px-8 py-2 border-2 border-orange-400 rounded-md">Züruck zu Ihre Buchung</button>
                <button  className="bg-yellow-400 font-bold md:text-lg px-6 py-2 rounded-md" >Auswählen</button>
              </div>
            </div>
          </div>
        </div>
      )}

        {/* Dark background overlay when isMedium DetailsActive is true */}
        {isPremiumDetailsActive && (
        <div className="fixed inset-0 flex items-center justify-center  bg-black bg-opacity-50 z-50">
          <div className=" mt-3 md:w-5/6 xl:w-1/2 w-full h-5/6 xl:h-full border border-gray-300 bg-white shadow-lg  rounded-md py-5 px-3 mx-2 md:mx-0">
            <div className="flex items-start justify-center gap-2 ">
              <div className="flex flex-col justify-start">
                <p className="text-lg font-semibold">Basic</p>
                <p className="text-sm text-gray-600">
                  Selbstbeteiligung: 0,00 €
                </p>
              </div>
              <div className="border-2 border-black w-1 h-8 mx-4" />
              <div className="flex flex-col justify-start">
              <p>14,20 € /tag </p>
              <p>Gesamt</p>
              </div>
            </div>
            <div className=" flex flex-wrap items-center w-full">
              <div className=" flex flex-col  gap-4 mt-4">
                <div className=" flex gap-3 items-center">
                  <FaCheck className=" text-green-400 text-sm" />
                  <p className=" text-black font-bold">
                    Kollisionsschäden und Diebstahlschutz
                  </p>
                </div>
                <div className=" md:w-1/2 max-w-full px-2 ">
                  Reduzierung Ihrer Haftung bei Diebstahl, versuchtem Diebstahl,
                  Kollision oder Beschädigung des Fahrzeugs. Sie deckt keine
                  Personenschäden des Fahrers oder der Insassen ab. Reduzieren
                  Sie Ihre Selbstbeteiligung zu 950.00 EUR
                </div>
              </div>
              <div className=" flex flex-col  gap-4 mt-4">
                <div className=" flex gap-3 items-center">
                <FaCheck className=" text-green-400 text-sm" />
                  <p className=" text-black underline text-decoration-color-gray-400 decoration-1">
                    Insassenunfallschutz
                  </p>
                </div>
                <div className=" md:w-1/2 max-w-full px-2 text-black">
                  Schützen Sie Ihre Liebsten. Der persönliche Unfallschutz
                  stellt Fahrer und Beifahrern bei Tod oder Verletzung eine
                  Entschädigung und deckt die medizinischen Kosten.
                </div>
              </div>
              <div className=" flex flex-col  gap-4 mt-4">
                <div className=" flex gap-3 items-center">
                <FaCheck className=" text-green-400 text-sm" />
                  <p className=" text-black underline text-decoration-color-gray-400 decoration-1">
                    Schutz vor Schäden an Windschutzscheibe, Glas, Scheinwerfer
                    und Reifen
                  </p>
                </div>
                <div className=" md:w-1/2 max-w-full px-2 text-black">
                  Schutz bei Schäden an Windschutzscheibe, Scheinwerfern und
                  Reifen bei normalem Gebrauch des Fahrzeugs.
                </div>
              </div>
              <div className=" flex flex-col  gap-4 mt-4">
                <div className=" flex gap-3 items-center">
                <FaCheck className=" text-green-400 text-sm" />
                  <p className=" text-black underline text-decoration-color-gray-400 decoration-1">
                    Schutz für persönliche Gegenstände
                  </p>
                </div>
                <div className=" md:w-1/2 max-w-full px-2 text-black">
                  Entschädigung für Ihre persönlichen Gegenstände im Falle von
                  Zerstörung oder Diebstahl.gs.
                </div>
              </div>
              <div className=" flex items-center w-full justify-around mt-6">
                <button onClick={()=>{
                    dispatch(setIsPremiumDetailsActive(false))
                }} className=" px-8 py-2 border-2 border-orange-400 rounded-md">Züruck zu Ihre Buchung</button>
                <button  className="bg-yellow-400 font-bold md:text-lg px-6 py-2 rounded-md" >Auswählen</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
