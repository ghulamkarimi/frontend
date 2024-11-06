import HomeCarouselHero from "@/components/carousel/HomeCarouselHero";




const WorkshopBookingPage = () => {
    return (
        <div className=" min-h-screen">
            {/* Hero Section */}


            {/* Booking Section */}
            <div className="max-w-4xl mx-auto py-12 px-6 bg-white shadow-lg rounded-lg mt-8">
                <h1 className="text-center text-4xl font-bold text-gray-800 mb-6">
                    Jetzt Werkstatttermin buchen
                </h1>
                <p className="text-center font-bold pb-2">… und bequem nach dem Service in der Werkstatt bezahlen.</p>
                <p className="text-center text-gray-600 mb-10">
                    Vereinbaren Sie jetzt einen Termin und lassen Sie sich von unseren Experten helfen.
                </p>

                {/* Booking Form */}
                <form className="space-y-6">
                    {/* Name Field */}

                    <div>
                        <select className="w-full p-3 border rounded-lg focus:outline-none focus:border-orange-500" name="Service" id="">

                            <option value="1">gewünchte sevice</option>
                            <option value="2"> Reifenmontage</option>
                            <option value="3">Radwechsel</option>
                            <option value="4">Ölwechsel</option>
                            <option value="5">Sonstiges</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="name" className="block text-gray-700 font-semibold">
                            Vollständiger Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            className="w-full p-3 border rounded-lg focus:outline-none focus:border-orange-500"
                            placeholder="Max Mustermann"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="name">Kennzeichen</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            className="w-full p-3 border rounded-lg focus:outline-none focus:border-orange-500"
                            placeholder="M-XX 1234"
                            required

                        />
                    </div>

                    {/* Email Field */}
                    <div>
                        <label htmlFor="email" className="block text-gray-700 font-semibold">
                            E-Mail-Adresse
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            className="w-full p-3 border rounded-lg focus:outline-none focus:border-orange-500"
                            placeholder="beispiel@domain.com"
                            required
                        />
                    </div>

                    {/* Phone Field */}
                    <div>
                        <label htmlFor="phone" className="block text-gray-700 font-semibold">
                            Telefonnummer
                        </label>
                        <input
                            type="tel"
                            id="phone"
                            name="phone"
                            className="w-full p-3 border rounded-lg focus:outline-none focus:border-orange-500"
                            placeholder="+49 123 456 789"
                            required
                        />
                    </div>

                    {/* Date Field */}
                    <div>
                        <label htmlFor="date" className="block text-gray-700 font-semibold ">
                            Wunschtermin
                        </label>
                        <input

                            type="date"
                            id="date"
                            name="date"
                            className="w-full p-3 border rounded-lg focus:outline-none focus:border-orange-500"
                            required
                        />
                    </div>

                    {/* Message Field */}
                    <div>
                        <label htmlFor="message" className="block text-gray-700 font-semibold">
                            Bemerkungen
                        </label>
                        <textarea
                            id="message"
                            name="message"

                            className="w-full p-3 border rounded-lg focus:outline-none focus:border-orange-500"
                            placeholder="Zusätzliche Informationen zum Termin..."
                        ></textarea>
                    </div>

                    {/* Submit Button */}
                    <div className="text-center">
                        <button
                            type="submit"
                            className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-8 rounded-lg shadow-lg transition duration-300"
                        >
                            Termin buchen
                        </button>
                    </div>
                </form>
            </div>
            <HomeCarouselHero />
        </div>
    );
};

export default WorkshopBookingPage;
