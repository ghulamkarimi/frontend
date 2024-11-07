import { FaCarSide, FaCheckCircle, FaUserTie } from "react-icons/fa";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { GiCarDoor } from "react-icons/gi";
import { SiTransmission } from "react-icons/si";
import { TbManualGearboxFilled } from "react-icons/tb";
import { MdOutlineSevereCold } from "react-icons/md";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { useRouter } from "next/navigation";
import { ICarRent } from "../../../interface";
import { useSelector } from "react-redux";
import { getAllRentCars } from "../../../feature/reducers/carRentSlice";
import { useState } from "react";
import { CiCircleInfo } from "react-icons/ci";
import { WiFog } from "react-icons/wi";

interface ICarCardProps {
  availableCars: ICarRent[];
  isCarVerfügbar: boolean;
  setIsCarVerfügbar:(isCarVerfügbar:boolean)=>void
}

const CarCard = ({ availableCars,isCarVerfügbar,setIsCarVerfügbar }: ICarCardProps) => {
  const [loading, setLoading] = useState(false);
  const [detailsVisibility, setDetailsVisibility] = useState<{
    [key: string]: boolean;
  }>({});
 
  const rentCars = useSelector(getAllRentCars);
  const router = useRouter();

  const toggleDetails = (carId: string) => {
    setDetailsVisibility((prevState) => ({
      ...prevState,
      [carId]: !prevState[carId],
    }));
  };

  const handleSelectCar = (carId: string) => {
    setLoading(true);
    localStorage.setItem("carRentId", carId || "");
    setTimeout(() => {
     //
     setIsCarVerfügbar(true)
      setLoading(false);
    }, 3000);
  };
const carId = localStorage.getItem("carRentId" )
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className=" flex items-center gap-5 border-t-transparent rounded-full antialiased">
          <div className=" flex items-center gap-1 text-3xl text-orange-400">
            <WiFog className="animate-pulse" />
            <WiFog className="animate-pulse" />
            <WiFog className="animate-pulse" />
          </div>
          <div>
            <FaCarSide className="text-orange-400 text-5xl sm:text-[8rem] animate-bounce" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className={`mt-6  `}>
        <div className={`flex flex-col `}>
          {(availableCars.length > 0 ? availableCars : rentCars).map((car) => (
            <Card key={car._id} className="flex flex-col gap-1">
              <div className="p-2 border rounded-lg shadow hover:shadow-lg transition-shadow duration-300 bg-white cursor-pointer flex md:justify-between flex-col md:flex-row items-center mt-3">
                <CardHeader>
                  <img
                    src={car.carImage}
                    alt="Car Image"
                    className=" w-80 h-56 object-cover rounded-t-lg"
                  />
                </CardHeader>

                <CardContent className="flex flex-col gap-2 relative">
                  <CardTitle className="text-gray-600">{car.carName}</CardTitle>

                  <div className="flex flex-col gap-3">
                    <div className="flex gap-4 pt-4">
                      <span className="cardInfoSell">
                        <FaUserTie className="cardInfoSellIcon" />
                        {car.carPeople}
                      </span>
                      <span className="cardInfoSell">
                        <SiTransmission className="cardInfoSellIcon" />
                        {car.carGear}
                      </span>
                      <span className="cardInfoSell">
                        <GiCarDoor className="cardInfoSellIcon" />
                        {car.carDoors}
                      </span>
                      <span className="flex items-center gap-2 cardInfoSell">
                        <MdOutlineSevereCold className="cardInfoSellIcon" />
                        Klimaanlage
                      </span>
                    </div>
                    <div className="flex flex-col gap-3">
                      <p className="flex gap-3 items-center">
                        <FaCheckCircle className="text-green-500 w-3 h-3" />
                        <span className="cardInfoSell">4000 km inklusive</span>
                      </p>
                      <p className="flex gap-3 items-center">
                        <FaCheckCircle className="text-green-500 w-3 h-3" />
                        <span className="cardInfoSell">
                          Basic-Schutzpaket inklusive
                        </span>
                      </p>
                    </div>

                    <div onClick={() => toggleDetails(car._id!)}>
                      {detailsVisibility[car._id!] ? (
                        <div className="text-orange-500 flex items-center gap-5">
                          <p>Weniger Details</p>
                          <IoIosArrowDown className="text-sm" />
                        </div>
                      ) : (
                        <div className="text-orange-500 flex items-center gap-5">
                          <p>Weitere Details</p>
                          <IoIosArrowUp className="text-sm" />
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>

                <CardFooter className="pt-6">
                  <div className="text-white flex flex-col gap-4">
                    <p>
                      <span className="cardInfoSell">
                        <TbManualGearboxFilled className="cardInfoSellIcon" />
                        {car.carPrice} $ / Tag
                      </span>
                    </p>
                    <button
                      onClick={() => {
                        handleSelectCar(car._id!);
                      }}
                      className="bg-orange-500 px-4 rounded-md font-semibold hover:bg-orange-600 transition-colors py-2"
                    >
                      Auswählen
                    </button>
                  </div>
                </CardFooter>
              </div>

              <div
                className={` p-4  transition-all duration-500 ease-in-out overflow-hidden ${
                  detailsVisibility[car._id!] ? "flex" : "hidden"
                }`}
              >
                <div className="bg-slate-300 px-2 py-4 w-full flex flex-col gap-3 rounded-t-lg">
                  <h2 className="md:font-bold text-xs md:text-sm">
                    Vollständige Fahrzeugdaten (beziehen sich auf das oben
                    gezeigte Fahrzeug)
                  </h2>
                  <div className="w-full flex flex-wrap gap-6">
                    <span className="cardInfoSell">
                      <FaUserTie className="cardInfoSellIcon" />
                      {car.carPeople}
                    </span>
                    <span className="cardInfoSell">
                      <SiTransmission className="cardInfoSellIcon" />
                      {car.carGear}
                    </span>
                    <span className="cardInfoSell">
                      <GiCarDoor className="cardInfoSellIcon" />
                      {car.carDoors}
                    </span>
                    <span className="flex items-center gap-2 cardInfoSell">
                      <MdOutlineSevereCold className="cardInfoSellIcon" />
                      Klimaanlage
                    </span>
                  </div>
                </div>
              </div>
              <div
                className={` p-4 rounded-lg transition-all duration-500 ease-in-out overflow-hidden ${
                  detailsVisibility[car._id!] ? "flex" : "hidden"
                }`}
              >
                <div className=" grid grid-cols-1 sm:grid-cols-2 w-full gap-4">
                  <div className="bg-slate-300 border-2 px-2 py-4 flex flex-col gap-2 sm:col-span-1">
                    <div className=" px-4">
                      <span className=" text-red-500 uppercase font-semibold text-xs">
                        Inclusive
                      </span>
                      <h2 className=" font-bold">Kilometer</h2>
                    </div>
                    <div className=" flex flex-col gap-2">
                      <div className=" flex items-center gap-2">
                        <FaCheckCircle className="text-green-500 w-3 h-3" />
                        <p>300 km inklusive</p>
                      </div>
                      <p>Zusätzliche Kilometer: EUR 0.35/km</p>
                    </div>
                  </div>
                  <div className="bg-slate-300 border-2 sm:col-span-1 px-2 py-4 rounded-b-lg">
                    <div className=" px-4">
                      <span className=" text-red-500 uppercase font-semibold text-xs">
                        Inclusive
                      </span>
                      <h2 className=" font-bold">Basic-Schutzpaket</h2>
                    </div>
                    <div className=" text-xs font-bold px-4 mt-3">
                      Selbstbeteiligung:950,00 €
                    </div>
                    <div>
                      <div className=" flex items-center gap-2 mt-5 px-4">
                        <FaCheckCircle className="text-green-500 w-3 h-3" />
                        <p>Vollkaskoschutz</p>
                      </div>
                      <div className=" flex items-center gap-2 px-4">
                        <FaCheckCircle className="text-green-500 w-3 h-3" />
                        <p>Diebstahlschutz</p>
                      </div>
                    </div>
                    <div className=" flex items-start px-4 mt-6 gap-2">
                      <CiCircleInfo className=" w-6 h-6" />
                      <p>
                        Sie können Ihr Schutzpaket erweitern, nachdem Sie das
                        Fahrzeug ausgewählt haben
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
       
      </div>
    
    </div>
  );
};

export default CarCard;
