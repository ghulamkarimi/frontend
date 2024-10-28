
import Link from "next/link";


export default function Contact() {



    return (
        <div className="bg-cover bg-center bg-no-repeat h-screen flex justify-center items-center flex-col text-white text-center px-4"
            style={{ backgroundImage: "url('/hintergrund.webp')" }}
        >
            <div className="bg-gray-100 shadow-md rounded-lg max-w-md w-full p-8">
                <h1 className="text-3xl font-semibold text-center text-orange-500 mb-6">
                    Kontaktieren Sie uns
                </h1>
                <p className="text-center text-gray-600 mb-8">
                    Haben Sie Fragen oder benötigen Sie Unterstützung? Wir sind hier, um Ihnen zu helfen.
                    Zögern Sie nicht, uns zu kontaktieren – unser Team freut sich, Ihnen weiterzuhelfen.
                </p>

                <form>
                    <div>
                        <label className="block text-gray-700">Name</label>
                        <input
                            type="text"
                            name="name"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700">E-Mail-Adresse</label>
                        <input
                            type="email"
                            name="email"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700">Nachricht</label>
                        <textarea
                            name="message"
                            rows={4}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md"
                            required
                        ></textarea>
                    </div>
                    <button
                        className="w-full bg-orange-500 text-white py-2 px-4 rounded-md font-semibold hover:bg-orange-600 transition-colors"
                    >
                        Nachricht senden
                    </button>
                </form>

                <div className="text-center mt-8 text-gray-500">
                    <p>Oder rufen Sie uns direkt an:</p>
                    <p className="font-semibold text-gray-700 mt-1">+49 151 58124394</p>
                </div>

                <div className="text-center mt-6">
                    <Link href="/" className="text-orange-500 hover:underline">
                        Zurück zur Startseite
                    </Link>
                </div>
            </div>
        </div>
    );
}
