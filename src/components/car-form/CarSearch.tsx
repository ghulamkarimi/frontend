"use client";

import { useState } from "react";
import { FaCalendarAlt, FaMapMarkerAlt } from "react-icons/fa";
import CalenderC from "./Calenderc";
import TimeC from "./TimeC";
import { useSelector } from "react-redux";
import { getAllRentCars } from "../../../feature/reducers/carRentSlice";

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
        alert(
          "Bitte wählen Sie sowohl Abhol- als auch Rückgabedatum und -uhrzeit aus."
        );
        return;
    }

    const pickupDateTime = new Date(pickupDate);
    pickupDateTime.setHours(
      Number(pickupTime.split(":")[0]),
      Number(pickupTime.split(":")[1])
    );
    console.log("pickupDateTime",pickupDateTime)

    const returnDateTime = new Date(returnDate);
    returnDateTime.setHours(
      Number(returnTime.split(":")[0]),
      Number(returnTime.split(":")[1])
    );

    console.log("returnDateTime",returnDateTime)

    const filteredCars = rentCars.filter((car) => {
        return (
          !car.isBooked &&
          (!car.bookedSlots ||
            !car.bookedSlots.some((slot) => {
              const slotStart = new Date(slot.start);
              const slotEnd = new Date(slot.end);
              // Check if the selected times overlap with booked slots
              return pickupDateTime < slotEnd && returnDateTime > slotStart;
            }))
        );
      });
      

    setAvailableCars(filteredCars);
};






        

  return (
    <div>
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
      <div className="xl:w-1/3 w-full">
        <div className="flex justify-between w-full items-center mt-3">
          <p className="lg:font-bold lg:text-sm text-xs">
            Abhol- & Rückgabeort
          </p>
          <div>
            <label className="flex items-center gap-2">
              <input type="checkbox" />
              <span className="lg:font-bold lg:text-sm text-xs">
                Gleicher Ort abgeben
              </span>
            </label>
          </div>
        </div>
        <div className="mt-2 border-2 rounded-md">
          <label className="flex items-center gap-2 px-4">
            <FaMapMarkerAlt className="w-6 h-6 text-green-400 absolute z-30" />
            <input
              className="relative border-none outline-none px-9 text-sm lg:font-bold py-2 w-full"
              type="text"
              placeholder="Abhol- & Rückgabeort"
            />
          </label>
        </div>
      </div>
      <div className="xl:w-1/3 w-full">
        <div className="w-full mt-3">
          <p className="lg:font-bold lg:text-sm text-xs">
            Abholdatum-& Uhrzeit
          </p>
          <div className="flex items-center w-full border-2 rounded-md mt-2">
            <div className="px-6">
              <div className="flex items-center gap-4">
                <FaCalendarAlt className="text-xl text-green-400" />
                <p
                  onClick={() => setIsShowCalender(!showCalender)}
                  className="lg:font-bold text-xs text-slate-400"
                >
                  {pickupDate
                    ? pickupDate.toLocaleDateString()
                    : "Abhole Datum"}
                </p>
                <div className="w-[1.5px] h-10 bg-slate-400 mx-4"></div>
                <p
                  onClick={() => setIsShowTime(!showTime)}
                  className="lg:font-bold text-xs text-slate-400"
                >
                  {pickupTime ? pickupTime : "Zeit"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="xl:w-1/3 w-full">
        <div className="w-full mt-3">
          <p className="lg:font-bold lg:text-sm text-xs">
            Rückgabedatum- & Uhrzeit
          </p>
          <div className="flex items-center border-2 rounded-md mt-2">
            <div className="px-6">
              <div className="flex items-center gap-4">
                <FaCalendarAlt className="text-xl text-green-400" />
                <p
                  onClick={() =>
                    setIsShowCalenderReturn(!showCalenderReturn)
                  }
                  className="lg:font-bold text-xs text-slate-400"
                >
                  {returnDate
                    ? returnDate.toLocaleDateString()
                    : "Rückgabedatum"}
                </p>
                <div className="w-[1.5px] h-10 bg-slate-400 mx-4"></div>
                <p
                  onClick={() => setIsShowTimeReturn(!showTimeReturn)}
                  className="lg:font-bold text-xs text-slate-400"
                >
                  {returnTime ? returnTime : "Zeit"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="flex items-center justify-between mt-3">
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
          className="px-6 py-1 bg-green-400 rounded-md hover:bg-green-300"
        >
          Search
        </button>
      </div>
    </div>
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
  </div>
  );
};

export default CarSearch;
