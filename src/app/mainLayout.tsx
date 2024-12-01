"use client"; // Wichtig, da clientseitige Hooks verwendet werden

import { useRouter } from "next/navigation";
import "./globals.css";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../feature/store/store";
import { setCarId, setIsCarVerfügbar } from "../../feature/reducers/carRentSlice";
import { useState, useEffect } from "react";
import { subscribeToSocketEvents } from '../../feature/reducers/offerSlice'; // Passe den Pfad an
import { AppDispatch } from '../../feature/store/store';

interface LayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: LayoutProps) {
  const {
    isCarVerfügbar,
    totalPrice,
    isBasicDetailsActive,
    isMediumDetailsActive,
    isPremiumDetailsActive,
  } = useSelector((state: RootState) => state.carRent);
  
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const [storedCarId, setStoredCarId] = useState<string | null>(null);

  useEffect(() => {
    // Zugriff auf `localStorage` nur im Browser
    if (typeof window !== "undefined") {
      const carId = localStorage.getItem("carRentId");
      setStoredCarId(carId);
      if (carId) {
        dispatch(setCarId(carId));
      }
    }
  }, [dispatch]);

  useEffect(() => {
    // WebSocket-Ereignisse abonnieren
    subscribeToSocketEvents(dispatch);
  }, [dispatch]);

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
                  if (storedCarId) {
                    localStorage.setItem("totalPrice", totalPrice.toString());
                    setTimeout(() => {
                      router.push(`/fahrzeugvermietung/${storedCarId}`);
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

      {/* Dark background overlay for additional states */}
      {isBasicDetailsActive && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          {/* Inhalt hier */}
        </div>
      )}
      {isMediumDetailsActive && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          {/* Inhalt hier */}
        </div>
      )}
      {isPremiumDetailsActive && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          {/* Inhalt hier */}
        </div>
      )}
    </main>
  );
}
