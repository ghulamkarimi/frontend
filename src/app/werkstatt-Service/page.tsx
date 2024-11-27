"use client";
import HomeCarouselHero from "@/components/carousel/HomeCarouselHero";
import OfferCards from "@/components/offer/OfferCards";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import * as Yup from 'yup';
import { NotificationService } from "../../../service/NotificationService";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../feature/store/store";
import { createAppointmentApi } from "../../../feature/reducers/workshopSlice";

const WorkshopBookingPage = () => {
    const [minDate, setMinDate] = useState("");
    const [maxDate, setMaxDate] = useState("");
    const dispatch = useDispatch<AppDispatch>();

    const formSchema = Yup.object({
        fullName: Yup.string()
            .required('Required')
            .matches(/^[A-Za-z\s]+$/, "Only alphabets and spaces are allowed in name"),
        email: Yup.string().email('Invalid email address').required('Required'),
        phone: Yup.string()
            .required('Required')
            .matches(/^[\d+]+$/, "Only numbers and + sign are allowed in phone"),
        date: Yup.date().required('Required'),
        notes: Yup.string().required('Required'),
        service: Yup.string().required('Required'),
        licensePlate: Yup.string().required('Required')
    });

    const formik = useFormik({
        initialValues: {
            fullName: "",
            email: "",
            phone: "",
            date: "",
            service: "",
            licensePlate: "",
            notes: ""
        },
        validationSchema: formSchema,
        onSubmit: async (values, {resetForm}) => {
            try {
                await dispatch(createAppointmentApi(values)).unwrap();
                NotificationService.success('Termin erfolgreich gebucht! Sie erhalten eine Bestätigung per E-Mail.');
                resetForm();
            } catch (error: any) {
                console.error('Fehler:', error);  // Ausgabe des gesamten Fehlerobjekts
                const errorMessage = error?.message || "Ein unbekannter Fehler ist aufgetreten";
                NotificationService.error(errorMessage);
            }
        }
    });

    useEffect(() => {
        const today = new Date();
        const min = today.toISOString().split("T")[0];
        const oneMonthLater = new Date(today);
        oneMonthLater.setDate(today.getDate() + 30);
        const max = oneMonthLater.toISOString().split("T")[0];
        setMinDate(min);
        setMaxDate(max);
    }, []);

    return (
        <div className="min-h-screen pt-8">
            <div className="max-w-4xl mx-auto py-12 px-6 bg-gradient-to-r from-slate-400 via-slate-500 to-gray-400 shadow-lg rounded-lg">
                <h1 className="text-center text-4xl font-bold text-gray-800 mb-6">
                    Jetzt Werkstatttermin buchen
                </h1>
                <p className="text-center font-bold pb-2">… und bequem nach dem Service in der Werkstatt bezahlen.</p>
                <p className="text-center mb-10">
                    Vereinbaren Sie jetzt einen Termin und lassen Sie sich von unseren Experten helfen.
                </p>
                <form onSubmit={formik.handleSubmit} className="space-y-6">
                    <div>
                        <select
                            className="w-full p-3 border rounded-lg focus:outline-none focus:border-orange-500"
                            name="service"
                            value={formik.values.service}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        >
                            <option value="">Gewünschte Service</option>
                            <option value="Reifen Montage">Reifen Montage</option>
                            <option value="Radwecseln">Radwecseln</option>
                            <option value="Ölwechsel">Ölwechsel</option>
                            <option value="Sonstiges">Sonstiges</option>
                        </select>
                        {formik.errors.service && formik.touched.service && (
                            <div className="text-red-500 text-sm">{formik.errors.service}</div>
                        )}
                    </div>
                    <div>
                        <label htmlFor="fullName" className="block text-gray-700 font-semibold">
                            Vollständiger Name
                        </label>
                        <input
                            id="fullName"
                            name="fullName"
                            type="text"
                            value={formik.values.fullName}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className="w-full p-3 border rounded-lg focus:outline-none focus:border-orange-500"
                            placeholder="Max Mustermann"
                        />
                        {formik.errors.fullName && formik.touched.fullName && (
                            <div className="text-red-500 text-sm">{formik.errors.fullName}</div>
                        )}
                    </div>
                    <div>
                        <label htmlFor="licensePlate" className="block text-gray-700 font-semibold">
                            Kennzeichen
                        </label>
                        <input
                            id="licensePlate"
                            name="licensePlate"
                            type="text"
                            value={formik.values.licensePlate}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className="w-full p-3 border rounded-lg focus:outline-none focus:border-orange-500"
                            placeholder="M-XX 1234"
                        />
                        {formik.errors.licensePlate && formik.touched.licensePlate && (
                            <div className="text-red-500 text-sm">{formik.errors.licensePlate}</div>
                        )}
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-gray-700 font-semibold">
                            E-Mail-Adresse
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className="w-full p-3 border rounded-lg focus:outline-none focus:border-orange-500"
                            placeholder="beispiel@domain.com"
                        />
                        {formik.errors.email && formik.touched.email && (
                            <div className="text-red-500 text-sm">{formik.errors.email}</div>
                        )}
                    </div>
                    <div>
                        <label htmlFor="phone" className="block text-gray-700 font-semibold">
                            Telefonnummer
                        </label>
                        <input
                            id="phone"
                            name="phone"
                            type="tel"
                            value={formik.values.phone}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className="w-full p-3 border rounded-lg focus:outline-none focus:border-orange-500"
                            placeholder="+49 123 456 789"
                        />
                        {formik.errors.phone && formik.touched.phone && (
                            <div className="text-red-500 text-sm">{formik.errors.phone}</div>
                        )}
                    </div>
                    <div>
                        <label htmlFor="date" className="block text-gray-700 font-semibold">
                            Wunschtermin
                        </label>
                        <input
                            id="date"
                            name="date"
                            type="date"
                            min={minDate}
                            max={maxDate}
                            value={formik.values.date}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className="w-full p-3 border rounded-lg focus:outline-none focus:border-orange-500"
                        />
                        {formik.errors.date && formik.touched.date && (
                            <div className="text-red-500 text-sm">{formik.errors.date}</div>
                        )}
                    </div>
                    <div>
                        <label htmlFor="notes" className="block text-gray-700 font-semibold">
                            Bemerkungen
                        </label>
                        <textarea
                            id="notes"
                            name="notes"
                            value={formik.values.notes}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className="w-full p-3 border rounded-lg focus:outline-none focus:border-orange-500"
                            placeholder="Zusätzliche Informationen zum Termin..."
                        />
                        {formik.errors.notes && formik.touched.notes && (
                            <div className="text-red-500 text-sm">{formik.errors.notes}</div>
                        )}
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
            <OfferCards />
            <HomeCarouselHero />
        </div>
    );
};

export default WorkshopBookingPage;
