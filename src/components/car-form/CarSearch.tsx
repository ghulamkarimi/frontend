"use client";

import { useState } from "react";
import { FaCalendarAlt, FaMapMarkerAlt } from "react-icons/fa";
import CalenderC from "./Calenderc";
import TimeC from "./TimeC";
import { useSelector } from "react-redux";
import { getAllRentCars } from "../../../feature/reducers/carRentSlice";
import Tilt from 'react-parallax-tilt';


const CarSearch = () => {
    const rentCars = useSelector(getAllRentCars)
    console.log("rentCars:", rentCars);
    const [availableCars, setAvailableCars] = useState(rentCars);
  const [showCalender, setIsShowCalender] = useState<boolean>(false);
  const [showTime, setIsShowTime] = useState<boolean>(false);
  const [pickupDate, setPickupDate] = useState<Date | null>(null);
  const [pickupTime, setPickupTime] = useState<string | null>(null);
  const [showCalenderReturn, setIsShowCalenderReturn] =
    useState<boolean>(false);
  const [showTimeReturn, setIsShowTimeReturn] = useState<boolean>(false);
  const [returnDate, setReturnDate] = useState<Date | null>(null);
  const [returnTime, setReturnTime] = useState<string | null>(null);


  const [loading, setLoading] = useState(false);


  const locationSuggestions = ["Hagen", "Hamburg", "München"];
  const [pickupLocation, setPickupLocation] = useState("");
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);

  const [age, setAge] = useState<number | null>(null);
  const handleAgeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setAge(Number(event.target.value));
  };

  const handleDateSelect = (date: Date | null) => {
    setPickupDate(date);
    setIsShowCalender(false);
  };

  const handleTimeSelect = (time: string | null) => {
    setPickupTime(time);
    setIsShowTime(false);
  };

  const handleDateSelectReturn = (date: Date | null) => {
    setReturnDate(date);
    setIsShowCalenderReturn(false);
  };

  const handleTimeSelectReturn = (time: string | null) => {
    setReturnTime(time);
    setIsShowTimeReturn(false);
  };


  const checkAvailability = () => {
    if (!pickupDate || !pickupTime || !returnDate || !returnTime) {
        alert("Bitte wählen Sie sowohl Abhol- als auch Rückgabedatum und -uhrzeit aus.");
        return;
    }

    setLoading(true); // Start loading

    // Simulate a loading time of 4 seconds
    setTimeout(() => {
        const pickupDateTime = new Date(pickupDate);
        pickupDateTime.setHours(Number(pickupTime.split(":")[0]), Number(pickupTime.split(":")[1]));
        
        const returnDateTime = new Date(returnDate);
        returnDateTime.setHours(Number(returnTime.split(":")[0]), Number(returnTime.split(":")[1]));

        const filteredCars = rentCars.filter((car) => {
            return (
                !car.isBooked &&
                (!car.bookedSlots ||
                    !car.bookedSlots.some((slot) => {
                        const slotStart = new Date(slot.start);
                        const slotEnd = new Date(slot.end);
                        return pickupDateTime < slotEnd && returnDateTime > slotStart;
                    }))
            );
        });

        setAvailableCars(filteredCars);
        setLoading(false); // End loading
    }, 4000); // 4000 milliseconds = 4 seconds
};





const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const userInput = e.target.value;
  setPickupLocation(userInput);
  const suggestions = locationSuggestions.filter(location =>
    location.toLowerCase().includes(userInput.toLowerCase())
  );
  setFilteredSuggestions(suggestions);
};


const selectSuggestion = (suggestion: string) => {
  setPickupLocation(suggestion);
  setFilteredSuggestions([]);
};

  return (
    <div className="  p-4 border-2 border-orange-300 rounded-md mb-4 mt-4 shadow-lg shadow-orange-300">
    <div className="flex flex-col gap-2">
      <h2 className="font-bold md:text-xl sm:text-sm text-xs">
        Welche Art von PKW?
      </h2>
      <div className="flex items-center p-2 gap-3 border border-1 border-black w-fit">
        <img
          className="w-14"
          src="/fahrzeugvermietungPic/pkw1.avif"
          alt="pkw1"
        />
        <p>PKW</p>
      </div>
    </div>
    <div className="flex flex-col xl:flex-row items-center gap-6 mt-3">
      <div className="xl:w-1/3 w-full  ">
        <div className="flex 2xl:justify-between justify-between
         w-full items-center mt-3">
          <p className="lg:font-bold 2xl:text-sm text-xs">
            Abhol-& Rückgabeort
          </p>
          <div>
            <label className="flex items-center gap-2">
              <input type="checkbox" />
              <span className="lg:font-bold 2xl:text-sm text-xs px-2">
              Rückgabeort
              </span>
            </label>
          </div>
        </div>
        <div className="mt-2 border-2 rounded-md ">
          <label className="flex items-center gap-2 rounded-lg">
            <FaMapMarkerAlt className="w-6 h-6 text-orange-300 absolute z-30" />
            <input
              className="relative border-none outline-none px-9 text-sm lg:font-bold py-2 w-full"
              type="text"
              placeholder="Abhol- & Rückgabeort"
              value={pickupLocation}
              onChange={handleLocationChange}
            />
          </label>
          {filteredSuggestions.length > 0 && (
          <ul className=" bg-white border mt-1 w-full  shadow-lg rounded-md">
            {filteredSuggestions.map((suggestion, index) => (
              <div className=" flex items-center gap-3 w-full p-2">
                       
                      <FaMapMarkerAlt className="w-6 h-6 text-orange-300 " />
                
              <li
                key={index}
                className="p-2 cursor-pointer border-b-2 border-orange-300 w-full hover:bg-orange-300"
                onClick={() => selectSuggestion(suggestion)}
              >
                {suggestion}
              </li>
              </div>
            ))}
          </ul>
        )}
        </div>
      </div>
      <div className="xl:w-1/3 w-full ">
        <div className="w-full mt-3">
          <p className="lg:font-bold 2xl:text-sm text-xs 2xl:text-center">
            Abholdatum-& Uhrzeit
          </p>
          <div className="flex items-center w-full border-2 rounded-md mt-2">
            <div className="px-6">
              <div className="flex items-center gap-4">
                <div className=" flex items-center gap-2">
                <FaCalendarAlt className="text-xl text-orange-300" />
                <p
                  onClick={() => setIsShowCalender(!showCalender)}
                  className="lg:font-bold text-xs text-slate-400 cursor-pointer"
                >
                  {pickupDate
                    ? pickupDate.toLocaleDateString()
                    : "Abhole Datum"}
                </p>
                </div>
                <div className="  w-[1.5px] h-10 bg-slate-400 "></div>
                <p
                  onClick={() => setIsShowTime(!showTime)}
                  className="lg:font-bold text-xs text-slate-400 cursor-pointer"
                >
                  {pickupTime ? pickupTime : "Zeit"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="xl:w-1/3 w-full ">
        <div className="w-full mt-3">
          <p className="lg:font-bold 2xl:text-sm text-xs 2xl:text-center">
            Rückgabedatum- & Uhrzeit
          </p>
          <div className="flex items-center border-2 rounded-md mt-2">
            <div className="px-6">
              <div className="flex items-center gap-4">
                <FaCalendarAlt className="text-xl text-orange-300" />
                <p
                  onClick={() =>
                    setIsShowCalenderReturn(!showCalenderReturn)
                  }
                  className="lg:font-bold text-xs text-slate-400 cursor-pointer"
                >
                  {returnDate
                    ? returnDate.toLocaleDateString()
                    : "Rückgabedatum"}
                </p>
                <div className="w-[1.5px] h-10 bg-slate-400 mx-4"></div>
                <p
                  onClick={() => setIsShowTimeReturn(!showTimeReturn)}
                  className="lg:font-bold text-xs text-slate-400 cursor-pointer"
                >
                  {returnTime ? returnTime : "Zeit"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="flex items-center justify-around mt-3">
      <div className="flex items-center gap-2">
        <p>Ich bin </p>
        <label className="relative">
          <select
            value={age ?? ""}
            onChange={handleAgeChange}
            className="border border-gray-300 rounded-md"
          >
            <option value="" disabled>
              Alter auswählen
            </option>
            {Array.from({ length: 76 }, (_, i) => i + 25).map(
              (ageOption) => (
                <option key={ageOption} value={ageOption}>
                  {ageOption}
                </option>
              )
            )}
          </select>
        </label>
        {age && <p> Jahre alt</p>}
      </div>
      <div>
        <button
          onClick={checkAvailability}
          className="px-6 py-1 bg-orange-300 rounded-md hover:bg-green-300"
        >
          Search
        </button>
      </div>
    </div>


  {/* Loading and Available Cars Display */}
  {loading ? (
    <div className="flex items-center justify-center mt-4">
        <Tilt className="tilt-effect">
            <div className="loader">
                <div className="loading-dots">
                    <span className="dot"></span>
                    <span className="dot"></span>
                    <span className="dot"></span>
                </div>
            </div>
        </Tilt>
    </div>
) : (
    <div>
        <h2 className="font-bold text-xl mt-4">Verfügbare Autos</h2>
  
    </div>
)}




    {/* Kalender- und Zeit-Komponenten */}
    <div className={`mt-3 ${showCalender ? "flex" : "hidden"}`}>
      <CalenderC onDateSelect={handleDateSelect} />
    </div>
    <div className={`mt-3 ${showTime ? "flex" : "hidden"}`}>
      <TimeC onTimeSelect={handleTimeSelect} />
    </div>
    <div className={`mt-3 ${showCalenderReturn ? "flex" : "hidden"}`}>
      <CalenderC onDateSelect={handleDateSelectReturn} />
    </div>
    <div className={`mt-3 ${showTimeReturn ? "flex" : "hidden"}`}>
      <TimeC onTimeSelect={handleTimeSelectReturn} />
    </div>
     {/* Show filtered cars if any, otherwise all cars */}
    
     <div className="mt-6">
 
  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
    {(availableCars.length > 0 ? availableCars : rentCars).map((car) => (
      <Tilt tiltMaxAngleX={20} tiltMaxAngleY={20} scale={1.1} key={car._id}>
        <div className="p-4 border-2 border-orange-500 rounded shadow-orange-300 cursor-pointer">
          <img src={car.carImage} alt={car.carName} className="w-full h-full object-cover mb-2 rounded-3xl" />
          <h4 className="font-bold">{car.carName}</h4>
          <p>{car.carPrice} € / Tag</p>
          <p>Getriebe: {car.carGear}</p>
          <p>Personen: {car.carPeople}</p>
        </div>
      </Tilt>
    ))}
  </div>
</div>
      </div>
      
 
  );
};

export default CarSearch;
