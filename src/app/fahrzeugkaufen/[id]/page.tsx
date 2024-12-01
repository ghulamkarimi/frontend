"use client";

import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "next/navigation";
import { carBuyUpdated, displayCarBuyById, fetchCarBuys } from "../../../../feature/reducers/carBuySlice";
import { AppDispatch, RootState } from "../../../../feature/store/store";
import { IoMail } from "react-icons/io5";
import { FaCalendarAlt, FaPhoneAlt, FaRoad } from "react-icons/fa";
import { TbManualGearboxFilled } from "react-icons/tb";
import { IoMdSpeedometer } from "react-icons/io";
import { BsFillFuelPumpFill } from "react-icons/bs";
import { FaUserTie } from "react-icons/fa6";
import FormattedDate from "@/components/FormatesDate";
import Carousel from "react-multi-carousel";
import Zoom from 'react-medium-image-zoom';
import "react-multi-carousel/lib/styles.css";
import 'react-medium-image-zoom/dist/styles.css';
import { socket } from "../../../../service";

const Page = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { id: carId } = useParams();
    const [loading, setLoading] = useState(true); 

    useEffect(() => {
        if (typeof window !== 'undefined') {
            // Daten abrufen
            dispatch(fetchCarBuys()).then(() => {
                setLoading(false); 
            });

            // WebSocket verbinden
            socket.connect();
            socket.on("connect", () => {
                console.log("✅ WebSocket verbunden mit ID:", socket.id);
            });

            // Aktualisiertes Fahrzeug abfangen und in Redux speichern
            socket.on("carBuyUpdated", (updatedCar) => {
                if (updatedCar._id === carId) {
                    console.log("✏️ Fahrzeug aktualisiert mit ID in singleCar:", updatedCar);
                    dispatch(carBuyUpdated({ id: updatedCar._id, changes: updatedCar }));
                }
            });

            // WebSocket-Verbindung trennen bei Komponentendemontage
            return () => {
                socket.off("carBuyUpdated");
                socket.off("connect");
                socket.disconnect();
            };
        }
    }, [dispatch, carId]);

    if (!carId) {
        return <h1 className="text-2xl md:text-4xl text-center">Ungültige Fahrzeug-ID</h1>;
    }

    const singleCar = useSelector((state: RootState) => displayCarBuyById(state, carId as string));

    if (loading) {
        return <h1 className="text-2xl md:text-4xl text-center">Daten werden geladen...</h1>;
    }

    if (!singleCar) {
        return <h1 className="text-2xl md:text-4xl text-center">Fahrzeug mit dieser ID nicht gefunden</h1>;
    }

    const responsive = {
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 1,
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 1,
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1,
        },
    }

    return (
        <div className="flex flex-col items-center rounded-lg py-4 px-4 sm:px-8">
            {/* Überprüfe, ob die Bilder vorhanden sind, bevor das Carousel gerendert wird */}
            {singleCar?.carImages?.length > 0 ? (
                <Carousel
                    responsive={responsive}
                    className="w-full h-[600px]"
                    showDots={true}
                    keyBoardControl
                    customTransition="all .5"
                    transitionDuration={500}
                    containerClass="carousel-container"
                    removeArrowOnDeviceType={["tablet", "mobile"]}
                    dotListClass="custom-dot-list-style"
                    itemClass="carousel-item-padding-40-px"
                >
                    {singleCar?.carImages?.map((image, index) => (
                        <Zoom key={index}>
                            <img
                                className="w-full h-[600px] object-cover"
                                src={image}
                                alt={singleCar?.carTitle || "Car Image"}
                            />
                        </Zoom>
                    ))}
                </Carousel>
            ) : (
                <h2 className="text-xl text-center">Keine Bilder verfügbar</h2>
            )}

            <div className="w-full max-w-[90%] md:max-w-[700px] lg:max-w-[900px] flex flex-col sm:flex-row justify-around bg-orange-500 my-2 rounded-lg px-4 py-2 gap-4">
                <div className="flex flex-col gap-1 justify-center text-center sm:text-left text-sm md:text-base lg:text-lg">
                    <p className="font-bold">{singleCar?.carTitle}</p>
                    <p className="font-bold">Preis: {singleCar?.carPrice}</p>
                </div>
                <div className="flex flex-col gap-2 text-sm md:text-base lg:text-lg">
                    <a href="mailto:autoservice.aundo@gmail.com" className="bg-white flex items-center gap-2 py-2 px-3 rounded-lg justify-center sm:justify-start">
                        <IoMail />
                        <p>Schreiben Sie uns E-Mail</p>
                    </a>
                    <a href="tel:+4915158124394" className="bg-white flex items-center gap-6 py-2 px-3 rounded-lg justify-center sm:justify-start">
                        <FaPhoneAlt />
                        <p>Rufen Sie uns an</p>
                    </a>
                </div>
            </div>

            <div className="grid grid-cols-3 gap-4 w-full max-w-[90%] md:max-w-[700px] lg:max-w-[900px] bg-white rounded-lg py-6 px-4 place-items-center ">
                <div className="flex flex-col gap-6">
                    <span className="flex items-center gap-2 md:gap-4">
                        <FaRoad className="text-orange-500 text-xs md:text-4xl" />
                        <span className="font-bold">
                            <p className="text-gray-600 text-[8px] md:text-sm lg:text-base">Kilometerstand</p>
                            <p className="text-[8px] md:text-sm lg:text-base">{singleCar?.carKilometers}</p>
                        </span>
                    </span>
                    <span className="flex items-center gap-2 md:gap-4">
                        <TbManualGearboxFilled className="text-orange-500 text-xs md:text-4xl" />
                        <span className="font-bold">
                            <p className="text-gray-600 text-[8px] md:text-sm lg:text-base">Getriebe</p>
                            <p className="text-[8px] md:text-sm lg:text-base">{singleCar?.carGearbox}</p>
                        </span>
                    </span>
                </div>
                <div className="flex flex-col gap-6">
                    <span className="flex items-center gap-2 md:gap-4">
                        <IoMdSpeedometer className="text-orange-500 text-xs md:text-4xl" />
                        <span className="font-bold">
                            <p className="text-gray-600 text-[8px] md:text-sm lg:text-base">Leistung</p>
                            <p className="text-[8px] md:text-sm lg:text-base">{singleCar?.carHorsePower} PS</p>
                        </span>
                    </span>
                    <span className="flex items-center gap-2 md:gap-4">
                        <FaCalendarAlt className="text-orange-500 text-xs md:text-4xl" />
                        <span className="font-bold">
                            <p className="text-gray-600 text-[8px] md:text-sm lg:text-base">Erstzulassung</p>
                            <FormattedDate date={singleCar?.carFirstRegistrationDay} />
                        </span>
                    </span>
                </div>
                <div className="flex flex-col gap-6">
                    <span className="flex items-center gap-2 md:gap-4">
                        <BsFillFuelPumpFill className="text-orange-500 text-xs md:text-4xl" />
                        <span className="font-bold">
                            <p className="text-gray-600 text-[8px] md:text-sm lg:text-base">Kraftstoffart</p>
                            <p className="text-[8px] md:text-sm lg:text-base">{singleCar?.fuelType}</p>
                        </span>
                    </span>
                    <span className="flex items-center gap-2 md:gap-4">
                        <FaUserTie className="text-orange-500 text-xs md:text-4xl" />
                        <span className="font-bold">
                            <p className="text-gray-600 text-[8px] md:text-sm lg:text-base">Fahrzeughalter</p>
                            <p className="text-[8px] md:text-sm lg:text-base">{singleCar?.owner}</p>
                        </span>
                    </span>
                </div>
            </div>

            <div className="w-full max-w-[90%] md:max-w-[700px] lg:max-w-[900px] bg-white rounded-lg py-6 px-4 my-2">
                <p>Technische Daten</p>
                <div className="border my-2" />
                <div className="flex flex-col gap-3 even-bg">
                    <p>Fahrzeugzustand: {singleCar?.carAccidentFree ? "Unbeschädigt" : "Beschädigt"}</p>
                    {/* Weitere Fahrzeugdetails hier */}
                </div>
            </div>

            <div className="w-full max-w-[90%] md:max-w-[700px] lg:max-w-[900px] bg-white rounded-lg py-6 px-4 my-2">
                <p>Fahrzeugbeschreibung</p>
                <div className="border my-2" />
                <p>{singleCar?.carDescription}</p>
            </div>
        </div>
    );
};

export default Page;
