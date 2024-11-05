"use client";
import { useSelector } from "react-redux";
import { displayOffers } from "../../../feature/reducers/offerSlice";

const OfferCards = () => {
    const displayOffer = useSelector(displayOffers);


    if (!displayOffer || displayOffer.length === 0) {
        return null;
    }

    return (
        <div className="py-6 px-2">
            <h2 className="text-5xl font-bold mb-4 text-center text-orange-500 text-shadow ">Unsere aktuellen Angebote</h2>
            <div className="flex flex-wrap place-content-center pt-4  gap-4">
                {displayOffer.map((offer) => (
                    <div key={offer._id} className="bg-white shadow-md offerCarte p-4 w-96 md:w-[400px] h-[400px]">
                        <img src={offer.imageUrl} alt={offer.title} className="w-96 h-60 object-cover rounded-md" />
                        <h2 className="text-2xl font-bold text-red-600 mt-4">{offer.title}</h2>
                        <p className="font-bold py-1">{offer.description}</p>
                        <div className="flex items-center gap-2 mt-3 text-xl">
                            <p className="font-bold">Preice:</p>
                            <p className="text-red-500 font-bold line-through">
                                {offer.oldPrice ? `${offer.oldPrice} €` : ""}
                            </p>
                            <p className="text-green-500 font-bold">
                                {offer.newPrice ? `${offer.newPrice} €` : ""}
                            </p>

                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default OfferCards;


