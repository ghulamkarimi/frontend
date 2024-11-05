"use client";
import { useSelector } from "react-redux";
import { displayOffers } from "../../../feature/reducers/offerSlice";

const OfferCards = () => {
    const displayOffer = useSelector(displayOffers);


    if (!displayOffer || displayOffer.length === 0) {
        return null;
    }

    return (
        <div className="py-6">
            <h2 className="text-3xl font-bold mb-4 text-center">Unsere aktuellen Angebote</h2>
            <div className="flex flex-wrap pt-4 gap-4">
                {displayOffer.map((offer) => (
                    <div key={offer._id} className="bg-white shadow-md rounded-md p-4">
                        <img src={offer.imageUrl} alt={offer.title} className="w-full h-40 object-cover rounded-md" />
                        <h2 className="text-xl font-bold mt-4">{offer.title}</h2>
                        <p className="text-gray-500">{offer.description}</p>
                        <p className="text-orange-500 font-bold mt-2">{offer.price}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default OfferCards;

 
