import { useFormik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../feature/store/store";
import { getRentCarById } from "../../../feature/reducers/carRentSlice";

const FormReservation = () => {
  const { id: carRentId } = useParams();
  const dispatch = useDispatch<AppDispatch>();


  const rentalDays = localStorage.getItem("rentalDays")
  const getOneCar = useSelector((state: RootState) =>
    getRentCarById(state, carRentId! as string)
  );
  const [isVerified, setIsVerified] = useState(false);
  const [loading, setLoading] = useState(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);
  const [email, setEmail] = useState("khalil.haouas@gmail.com"); // Zustand für die E-Mail

  const formSchema = Yup.object({
    vorname: Yup.string().required("Vorname ist erforderlich"),
    nachname: Yup.string().required("Nachname ist erforderlich"),
    geburtsdatum: Yup.string()
      .required("Geburtsdatum ist erforderlich")
      .matches(/^\d{2}\/\d{2}\/\d{4}$/, "Geburtsdatum muss im Format TT/MM/JJJJ sein"),
    email: Yup.string().required("Email-Adresse ist erforderlich").email("Ungültige Email-Adresse"),
    telefonnummer: Yup.string()
      .required("Telefonnummer ist erforderlich")
      .matches(/^\d+$/, "Telefonnummer darf nur Zahlen enthalten"),
  });

  const formik = useFormik({
    initialValues: {
      vorname: "",
      nachname: "",
      geburtsdatum: "",
      email: email, // E-Mail aus dem Zustand setzen
      telefonnummer: "",
    },
    validationSchema: formSchema,
    onSubmit: (values) => {
      if (!isVerified) {
        alert("Bitte bestätigen Sie Ihre Identität über PayPal.");
        return;
      }
      alert(`Buchung erfolgreich abgeschlossen! Ihre Email: ${values.email}`);
    },
  });

  const createOrderHandler = async () => {
    setLoading(true);
    try {
      const gesamtPreis = localStorage.getItem("gesamtPreice") || "0.00";
      const carRentId = localStorage.getItem("carRentId");
      const userId = localStorage.getItem("userId");

      console.log("Form values:", formik.values); 
      console.log("gesamtPreis", gesamtPreis);
      console.log("carRentId", carRentId);
      console.log("userId", userId);
      console.log("customerEmail", email); // Die E-Mail aus dem Zustand verwenden

      if (!gesamtPreis || !carRentId || !userId) {
        throw new Error("Fehlende Daten für die Bestellung");
      }

      const response = await fetch("http://localhost:7001/payment/createOrder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: gesamtPreis,
          customerEmail: email, // Die E-Mail aus dem Zustand verwenden
          carId: carRentId,
          userId: userId,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Fehler bei der Erstellung der Bestellung.");
      }

      const orderData = await response.json();
      return orderData.orderId;
    } catch (error) {
      setPaymentError(error.message || "Fehler bei der Bestellung.");
      console.error("Fehler bei der Bestellung:", error);
    } finally {
      setLoading(false);
    }
  };

  const onApproveHandler = async (data) => {
    setLoading(true);
    try {
      const { orderID, payerID } = data;
      const response = await fetch(
        `http://localhost:7001/payment/capture?token=${orderID}&PayerID=${payerID}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );

      const result = await response.json();
      if (response.ok && result.message === "Zahlung erfolgreich abgeschlossen!") {
        setIsVerified(true);
        alert(`Zahlung erfolgreich abgeschlossen! Bestell-ID: ${orderID}`);
      } else {
        throw new Error(result.message || "Zahlung konnte nicht abgeschlossen werden.");
      }
    } catch (error) {
      setPaymentError(error.message || "Fehler bei der Zahlungsabwicklung.");
      console.error("Fehler bei der Zahlungsabwicklung:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Reservierungsformular</h1>
      <form onSubmit={formik.handleSubmit} className="space-y-6">
        <section className="p-4 bg-gray-200 rounded-md">
          <h2 className="font-bold text-xl mb-3">1. Fahrer-Details</h2>
          {["vorname", "nachname", "geburtsdatum", "email", "telefonnummer"].map((field) => (
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
                <div className="text-red-500 text-sm">{formik.errors[field]}</div>
              )}
            </div>
          ))}
        </section>

        <section className="p-4 bg-gray-200 rounded-md">
          <h2 className="font-bold text-xl mb-3">2. Identitätsprüfung</h2>
          <PayPalScriptProvider options={{ "client-id": "AbEcs8NfNF1i7uraUy-uhPwhvANzzKrKXbUGQtqkFFNG5A-97e0lmHZqrnLnx1VciiyTGGiEzXlXCuwl", currency: "EUR" }}>
            <PayPalButtons
              style={{ layout: "vertical" }}
              createOrder={createOrderHandler} 
              onApprove={onApproveHandler}
              onError={(err) => {
                setPaymentError("Fehler bei der PayPal-Zahlung: " + err.message);
                console.error("PayPal Fehler:", err);
              }}
            />
          </PayPalScriptProvider>
          {isVerified ? (
            <div className="mt-4 text-green-600 font-medium">
              Zahlung erfolgreich bestätigt!
            </div>
          ) : (
            <div className="mt-4 text-red-600 font-medium">
              Bitte führen Sie die Zahlung durch.
            </div>
          )}
          {paymentError && <div className="mt-4 text-red-500 font-medium">{paymentError}</div>}
        </section>

        <button
          type="submit"
          className={`w-full text-white font-medium py-3 rounded-md ${
            isVerified ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-400 cursor-not-allowed"
          }`}
          disabled={!isVerified || loading}
        >
          {loading ? "Buchung wird verarbeitet..." : "Weiter mit der Buchung "}
        </button>
      </form>
    </div>
  );
};

export default FormReservation;
