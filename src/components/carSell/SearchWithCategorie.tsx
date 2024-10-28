"use client";
import React, { useState } from "react";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"



const SearchWithCategory = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [category, setCategory] = useState("All");


    const cars = [
        {
            id: 1,
            title: "BMW X5",
            category: "PKW",
            price: "40.000 €",
            kilometers: "50.000 km",
            color: "Schwarz",
            url: "https://cdn.bimmertoday.de/wp-content/uploads/2023/08/2023-BMW-X5-M-F95-LCI-Frozen-Black-Individual-Facelift-11-750x500.jpg"
        },
        {
            id: 2,
            title: "Mercedes Sprinter",
            category: "Transporter",
            price: "30.000 €",
            kilometers: "80.000 km",
            color: "Weiß",
            url: "https://www.leasingmarkt.de/data/resized/V1_197983206_300x224_1.jpg"
        },
        {
            id: 3,
            title: "Hobby Wohnwagen",
            category: "Wohnwagen",
            price: "25.000 €",
            kilometers: "20.000 km",
            color: "Grau",
            url: "https://d38b8me95wjkbc.cloudfront.net/uploads/rv/cover_image/59343/resized_camper-picture-42378-371278.jpeg"
        },
    ];

    const filteredCars = cars.filter((car) => {
        const matchesCategory = category === "All" || car.category === category;
        const matchesSearchTerm = car.title.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesCategory && matchesSearchTerm;
    });

    return (
        <div className=" ">
            <div className="bg-orange-500 rounded-2xl shadow-md max-w-2xl mx-auto p-6 ">
                <h2 className="text-2xl font-bold mb-4">Fahrzeugsuche</h2>

                <div className="mb-4">
                    <input
                        type="text"
                        placeholder="Nach Fahrzeugtitel suchen..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-900"
                    />
                </div>

                <div className="mb-6">
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                    >

                        <option value="All">Alle Kategorien</option>
                        <option value="Transporter">Transporter</option>
                        <option value="PKW">PKW</option>
                        <option value="Wohnwagen">Wohnwagen</option>

                    </select>
                </div>

            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-10">
                {filteredCars.length > 0 ? (
                    filteredCars.map((car) => (
                        <Card key={car.id} className="p-4 border rounded-lg shadow hover:shadow-lg transition-shadow duration-300 bg-orange-500">

                            <CardHeader>
                                <img
                                    src={car.url}
                                    alt={car.title}
                                    className="w-full h-54 object-cover rounded-t-lg"
                                />
                            </CardHeader>
                            <CardContent className="flex flex-col gap-2">
                                <CardTitle className="text-gray-600">{car.title}</CardTitle>
                                <CardTitle className="text-lg font-semibold">Preis: {car.price}</CardTitle>
                            </CardContent>

                        </Card>
                    ))
                ) : (
                    <p className="text-gray-600">Keine Fahrzeuge gefunden.</p>
                )}
            </div>
        </div>
    );
};

export default SearchWithCategory;
