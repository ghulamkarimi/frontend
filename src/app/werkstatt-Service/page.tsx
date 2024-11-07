import HomeCarouselHero from "@/components/carousel/HomeCarouselHero";




const WorkshopBookingPage = () => {
    return (
        <div className=" min-h-screen pt-8">
           
            <div className="max-w-4xl mx-auto py-12 px-6 bg-gradient-to-r from-slate-400 via-slate-500 to-gray-400 shadow-lg rounded-lg">
            <h1 className="text-center text-4xl font-bold text-gray-800 mb-6">
                    Jetzt Werkstatttermin buchen
                </h1>
                <p className="text-center font-bold pb-2">… und bequem nach dem Service in der Werkstatt bezahlen.</p>
                <p className="text-center mb-10">
                    Vereinbaren Sie jetzt einen Termin und lassen Sie sich von unseren Experten helfen.
                </p>
                <form className="space-y-6">
                    <div>
                        <select className="w-full p-3 border rounded-lg focus:outline-none focus:border-orange-500" name="Service" id="">

                            <option className="py-2" value="" disabled selected>Gewünschter Service</option>
                            <option className="py-2"  value="1"> Reifenmontage</option>
                            <option className="py-2"  value="2">Radwechsel</option>
                            <option className="py-2"  value="3">Ölwechsel</option>
                            <option className="py-2"  value="4">Sonstiges</option>
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
