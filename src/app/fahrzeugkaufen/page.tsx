/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { displayCarBuys } from "../../../feature/reducers/carBuySlice";
import Link from "next/link";
import { FaRoad, FaUserTie } from "react-icons/fa6";
import { BsFillFuelPumpFill } from "react-icons/bs";
import { TbManualGearboxFilled } from "react-icons/tb";
import { IoMdSpeedometer } from "react-icons/io";
import { FaCalendarAlt } from "react-icons/fa";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import FormattedDate from "@/components/FormatesDate";

const carCategories = ["Transporter", "PKW", "Wohnwagen"];


const page = () => {

    
    const cars = useSelector(displayCarBuys);
    const [searchTerm, setSearchTerm] = useState("");
    const [category, setCategory] = useState("All");



    useEffect(() => {
        if (typeof window !== 'undefined') {
            const initialCategory = localStorage.getItem("initialCategory") || "All";
            setCategory(initialCategory);
        }
    }, []);
    const filteredCars = cars.filter((car) => {
        const matchesCategory = category === "All" || car.carCategory === category;
        const matchesSearchTerm = car.carTitle.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesCategory && matchesSearchTerm;
    });
    return (
        <div className="pt-4">
            <div className="bg-white rounded-2xl shadow-md max-w-2xl mx-auto p-6">
                <h2 className="text-2xl font-bold mb-4">Fahrzeugsuche</h2>
                <div className="mb-4">
                    <input
                        type="text"
                        placeholder="Nach Fahrzeugtitel suchen..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                </div>
                <div className="mb-6">
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                    >
                        <option value="All">Alle Kategorien</option>
                        {carCategories.map((cat) => (
                            <option key={cat} value={cat}>
                                {cat}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-10">
                {filteredCars.length > 0 ? (
                    filteredCars.map((car) => (
                        <Card key={car._id} className="p-4 border rounded-lg shadow hover:shadow-lg transition-shadow duration-300 bg-white">
                            <CardHeader>
                                <img
                                    src={car.carImage[0]}
                                    alt="Car Image"
                                    className="w-full h-60 object-cover rounded-t-lg"
                                />
                            </CardHeader>
                            <CardContent className="flex flex-col gap-2">
                                <CardTitle className="text-gray-600">{car.carTitle}</CardTitle>
                                <p className="text-lg font-semibold">Preis: {car.carPrice}</p>
                                <div className="grid grid-cols-3 gap-4 pt-4">
                                    <span className="cardInfoSell">
                                        <FaRoad className="cardInfoSellIcon" />
                                        {car.carKilometers}
                                    </span>
                                    <span className="cardInfoSell">
                                        <FaUserTie className="cardInfoSellIcon" />
                                        {car.owner}
                                    </span>
                                    <span className="cardInfoSell">
                                        <TbManualGearboxFilled className="cardInfoSellIcon" />
                                        {car.carGearbox}
                                    </span>
                                </div>
                                <div className="grid grid-cols-3 gap-4 pt-4">
                                    <span className="cardInfoSell">
                                        <IoMdSpeedometer className="cardInfoSellIcon" />
                                        {car.carHorsePower}
                                    </span>
                                    <span className="cardInfoSell">
                                        <FaCalendarAlt className="cardInfoSellIcon" />
                                     <FormattedDate date={car.carFirstRegistrationDay} />
                                    </span>
                                    <span className="cardInfoSell">
                                        <BsFillFuelPumpFill className="cardInfoSellIcon" />
                                        {car.fuelType}
                                    </span>
                                </div>
                            </CardContent>
                            <CardFooter className="pt-6">
                                <Link
                                    href={`/fahrzeugkaufen/${car._id}`}
                                    className="bg-orange-500 text-white py-2 px-4 rounded-md font-semibold hover:bg-orange-600 transition-colors"
                                >
                                    Details
                                </Link>
                            </CardFooter>
                        </Card>
                    ))
                ) : (
                    <p className="text-gray-600">Keine Fahrzeuge gefunden.</p>
                )}
            </div>
        </div>
    );
};
export default page;