"use client";
import { useSelector } from "react-redux";
import { displayOffers } from "../../../feature/reducers/offerSlice";

const OfferCards = () => {
    const displayOffer = useSelector(displayOffers);

    if (!displayOffer || displayOffer.length === 0) {
        return null;
    }

    return (
        <div className="py-8 px-4 my-4">
            <h2 className="text-5xl font-extrabold mb-8 text-center text-orange-600 text-shadow-md drop-shadow-lg bg-gradient-to-r from-orange-400 to-red-600 bg-clip-text text-transparent">
                Unsere aktuellen Angebote
            </h2>
            <div className="flex flex-wrap place-content-center gap-6">
                {displayOffer.map((offer) => (
                    <div key={offer._id} className="offerCarte bg-white shadow-lg hover:shadow-2xl transition-shadow duration-300 rounded-lg p-5 w-full sm:w-[400px] max-w-sm transform hover:scale-105">
                        <img src={offer.imageUrl} alt={offer.title} className="w-full h-56 object-cover rounded-lg mb-4" />
                        <h2 className="text-3xl font-bold text-orange-500 mt-4 flex gap-2 items-center">
                            {offer.title}
                            <span className="bg-red-100 text-red-500 px-2 py-1 rounded-full text-sm font-semibold text-center animate-bounce">{offer.discountPercentage}% OFF</span>
                        </h2>
                        <p className="text-gray-700 mt-2">{offer.description}</p>
                        <div className="flex items-center gap-3 mt-5 text-lg">
                            <p className="font-semibold text-gray-500">Preis:</p>
                            <p className="text-gray-400 font-semibold line-through">
                                {offer.oldPrice ? `${offer.oldPrice} €` : ""}
                            </p>
                            <p className="text-green-600 font-bold text-xl">
                                {offer.newPrice ? `${offer.newPrice} €` : ""}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default OfferCards;
