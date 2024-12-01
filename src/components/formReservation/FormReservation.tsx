import { useFormik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const FormReservation = () => {
  const [isVerified, setIsVerified] = useState(false); // Zustand für Identitätsprüfung

  const formSchema = Yup.object({
    vorname: Yup.string().required("Vorname ist erforderlich"),
    nachname: Yup.string().required("Nachname ist erforderlich"),
    geburtsdatum: Yup.string()
      .required("Geburtsdatum ist erforderlich")
      .matches(
        /^\d{2}\/\d{2}\/\d{4}$/,
        "Geburtsdatum muss im Format TT/MM/JJJJ sein"
      ),
    email: Yup.string()
      .required("Email-Adresse ist erforderlich")
      .email("Ungültige Email-Adresse"),
    telefonnummer: Yup.string()
      .required("Telefonnummer ist erforderlich")
      .matches(/^\d+$/, "Telefonnummer darf nur Zahlen enthalten"),
  });

  const formik = useFormik({
    initialValues: {
      vorname: "",
      nachname: "",
      geburtsdatum: "",
      email: "",
      telefonnummer: "",
    },
    validationSchema: formSchema,
    onSubmit: (values) => {
      if (!isVerified) {
        alert("Bitte bestätigen Sie Ihre Identität über PayPal.");
        return;
      }
      console.log("Formularwerte:", values);
      alert("Buchung erfolgreich abgeschlossen!");
    },
  });

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Reservierungsformular</h1>
      <form onSubmit={formik.handleSubmit} className="space-y-6">
        {/** Persönliche Informationen */}
        <section className="p-4 bg-gray-200 rounded-md">
          <h2 className="font-bold text-xl mb-3">1. Fahrer-Details</h2>

          {["vorname", "nachname", "geburtsdatum", "email", "telefonnummer"].map(
            (field) => (
              <div key={field} className="mb-4">
                <label
                  className="block font-medium mb-1 capitalize"
                  htmlFor={field}
                >
                  {field}*
                </label>
                <input
                  id={field}
                  name={field}
                  type="text"
                  placeholder={field === "geburtsdatum" ? "TT/MM/JJJJ" : ""}
                  className="w-full border-2 rounded-md p-3"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values[field]}
                />
                {formik.touched[field] && formik.errors[field] && (
                  <div className="text-red-500 text-sm">
                    {formik.errors[field]}
                  </div>
                )}
              </div>
            )
          )}
        </section>

        {/** PayPal-Zahlung */}
        <section className="p-4 bg-gray-200 rounded-md">
          <h2 className="font-bold text-xl mb-3">2. Identitätsprüfung</h2>
          <PayPalScriptProvider
            options={{
              "client-id": "AbEcs8NfNF1i7uraUy-uhPwhvANzzKrKXbUGQtqkFFNG5A-97e0lmHZqrnLnx1VciiyTGGiEzXlXCuwl",
              currency: "EUR",
            }}
          >
            <PayPalButtons
              style={{ layout: "vertical" }}
              createOrder={(data, actions) => {
                return actions.order.create({
                  purchase_units: [
                    {
                      amount: {
                        value: "0.01", // Betrag in EUR
                      },
                      description: "Identitätsüberprüfung",
                    },
                  ],
                });
              }}
              onApprove={(data, actions) => {
                return actions.order.capture().then((details) => {
                  alert(
                    `Zahlung erfolgreich abgeschlossen, danke ${details.payer.name.given_name}!`
                  );
                  setIsVerified(true); // Status aktualisieren
                });
              }}
              onError={(err) => {
                console.error("PayPal Fehler:", err);
                alert("Es ist ein Fehler aufgetreten.");
              }}
            />
          </PayPalScriptProvider>
          {isVerified ? (
            <div className="mt-4 text-green-600 font-medium">
              Identität erfolgreich bestätigt!
            </div>
          ) : (
            <div className="mt-4 text-red-600 font-medium">
              Bitte führen Sie die Identitätsprüfung durch.
            </div>
          )}
        </section>

        {/** Absenden */}
        <button
          type="submit"
          className={`w-full text-white font-medium py-3 rounded-md ${
            isVerified
              ? "bg-blue-600 hover:bg-blue-700"
              : "bg-gray-400 cursor-not-allowed"
          }`}
          disabled={!isVerified} // Button deaktiviert, wenn nicht verifiziert
        >
          Buchung bestätigen
        </button>
      </form>
    </div>
  );
};

export default FormReservation;
