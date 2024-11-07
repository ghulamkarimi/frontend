'use client'

import CarSearch from "@/components/car-form/CarSearch";
import { useRouter } from "next/navigation";
import { useState } from "react";

const page = () => {

    const carId = localStorage.getItem("carRentId");
    const router = useRouter();
    const [isCarVerfügbar, setIsCarVerfügbar] = useState<boolean>(false);

    return (
        <div className={`mx-w-full flex justify-center relative mt-2`}>
            
         
            <div className={`xl:w-2/3 w-full relative ${isCarVerfügbar ? "blur-sm z-0" : "z-10"}`}>
                <CarSearch isCarVerfügbar={isCarVerfügbar} setIsCarVerfügbar={setIsCarVerfügbar}/>
            </div>

          
            <div className={`z-50 absolute top-0 xl:top[30%] max-w-full h-full xl:h-[30rem] ${isCarVerfügbar ? "flex  justify-center" : "hidden"}`}>
                <div className="px-2 py-6 flex flex-col w-full md:w-2/3 items-center  gap-4 mt-4  bg-white rounded-md">
                    <h1 className="font-bold text-sm md:text-sm xl:text-2xl text-center">
                        Sie haben ein Fahrzeug mit geringer Verfügbarkeit ausgewählt
                    </h1>
                    <p className="text-center">
                        Sie haben eine Fahrzeugkategorie mit geringer Verfügbarkeit
                        ausgewählt. Sobald Ihre Buchung abgeschlossen ist, wird sich die
                        Station nach Prüfung der Verfügbarkeit innerhalb von 8 Stunden bei
                        Ihnen melden, um die Buchung zu bestätigen. Falls die Buchung nicht
                        bestätigt wird, bitten wir Sie, eine neue Buchung zu tätigen.
                    </p>
                    <div className="cursor-pointer flex py-4 items-center justify-center gap-4">
                        <button
                            onClick={() => {
                                router.push(`/fahrzeugvermietung/${carId}`);
                            }}
                            className="bg-yellow-400 font-bold md:text-xl px-6 py-2 text-sm rounded-md">
                            Weiter mit diesem Fahrzeug
                        </button>
                        <button
                            onClick={() => setIsCarVerfügbar(false)}
                            className="cursor-pointer rounded-md font-bold px-6 py-2 border-2 border-orange-400 text-orange-400">
                            Ein anderes Fahrzeug auswählen
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default page;
