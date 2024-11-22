import { useFormik } from "formik";
import * as Yup from "yup";

const FormReservation = () => {
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
    kartennummer: Yup.string()
      .required("Kartennummer ist erforderlich")
      .matches(/^\d{16}$/, "Kartennummer muss 16 Ziffern enthalten"),
    ablaufdatum: Yup.string()
      .required("Ablaufdatum ist erforderlich")
      .matches(/^\d{2}\/\d{2}$/, "Ablaufdatum muss im Format MM/JJ sein"),
    sicherheitscode: Yup.string()
      .required("Sicherheitscode ist erforderlich")
      .matches(/^\d{3}$/, "Sicherheitscode muss 3 Ziffern enthalten"),
  });

  const formik = useFormik({
    initialValues: {
      vorname: "",
      nachname: "",
      geburtsdatum: "",
      email: "",
      telefonnummer: "",
      kartennummer: "",
      ablaufdatum: "",
      sicherheitscode: "",
      angebote: false,
      neuigkeiten: false,
    },
    validationSchema: formSchema,
    onSubmit: (values) => {
      console.log("Formularwerte:", values);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="px-2 mb-3">
      <div className="py-4 px-2 bg-gray-400 rounded-md flex flex-col gap-3">
        <h1 className="font-bold text-xl">1. Fahrer-Details</h1>

        {/** Vorname */}
        <div className="mt-2 flex flex-col gap-2 items-start">
          <label className="block font-medium" htmlFor="vorname">
            Vorname*
          </label>
          <input
            id="vorname"
            name="vorname"
            type="text"
            className="outline-none border-2 rounded-md bg-white px-2 py-4 w-full"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.vorname}
          />
          {formik.touched.vorname && formik.errors.vorname && (
            <div className="text-red-500 text-sm">{formik.errors.vorname}</div>
          )}
        </div>

        {/** Nachname */}
        <div className="mt-2 flex flex-col gap-2 items-start">
          <label className="block font-medium" htmlFor="nachname">
            Nachname*
          </label>
          <input
            id="nachname"
            name="nachname"
            type="text"
            className="outline-none border-2 rounded-md bg-white px-2 py-4 w-full"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.nachname}
          />
          {formik.touched.nachname && formik.errors.nachname && (
            <div className="text-red-500 text-sm">{formik.errors.nachname}</div>
          )}
        </div>

        {/** Geburtsdatum */}
        <div className="mt-2 flex flex-col gap-2 items-start">
          <label className="block font-medium" htmlFor="geburtsdatum">
            Geburtsdatum*
          </label>
          <input
            id="geburtsdatum"
            name="geburtsdatum"
            type="text"
            placeholder="TT/MM/JJJJ"
            className="outline-none border-2 rounded-md bg-white px-2 py-4 w-full"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.geburtsdatum}
          />
          {formik.touched.geburtsdatum && formik.errors.geburtsdatum && (
            <div className="text-red-500 text-sm">
              {formik.errors.geburtsdatum}
            </div>
          )}
        </div>

        {/** E-Mail */}
        <div className="mt-2 flex flex-col gap-2 items-start">
          <label className="block font-medium" htmlFor="email">
            E-Mail*
          </label>
          <input
            id="email"
            name="email"
            type="email"
            className="outline-none border-2 rounded-md bg-white px-2 py-4 w-full"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
          {formik.touched.email && formik.errors.email && (
            <div className="text-red-500 text-sm">{formik.errors.email}</div>
          )}
        </div>

        {/** Telefonnummer */}
        <div className="mt-4 flex flex-col gap-2">
          <label htmlFor="telefonnummer" className="font-medium">
            Telefonnummer*
          </label>
          <div className="mt-2 flex items-center border-2 rounded-md bg-white w-full">
            <span className="flex items-center justify-center px-2">🇩🇪</span>
            <span className="px-2 text-gray-600">+49</span>
            <input
              id="telefonnummer"
              name="telefonnummer"
              className="outline-none bg-transparent flex-1 px-2 py-4 text-xl"
              type="text"
              placeholder="123 456 789"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.telefonnummer}
            />
          </div>
          {formik.touched.telefonnummer && formik.errors.telefonnummer && (
            <div className="text-red-500 text-sm">
              {formik.errors.telefonnummer}
            </div>
          )}
        </div>
      </div>

      {/** Kreditkarte */}
      <div className="px-2 mb-3 mt-3 rounded-md bg-gray-400">
        <div className="mt-3 py-4 px-2 flex flex-col gap-3">
          <h2 className="text-lg font-semibold">Kreditkarte</h2>

          {/** Kartennummer */}
          <div>
            <label htmlFor="kartennummer" className="block font-medium mb-1">
              Kartennummer
            </label>
            <input
              id="kartennummer"
              name="kartennummer"
              type="text"
              className="w-full border-2 rounded-md p-2 outline-none focus:ring-2 focus:ring-blue-500"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.kartennummer}
            />
            {formik.touched.kartennummer && formik.errors.kartennummer && (
              <div className="text-red-500 text-sm">
                {formik.errors.kartennummer}
              </div>
            )}
          </div>

          {/** Ablaufdatum & Sicherheitscode */}
          <div className="flex gap-4 mt-4">
            <div className="flex-1">
              <label htmlFor="ablaufdatum" className="block font-medium mb-1">
                Ablaufdatum
              </label>
              <input
                id="ablaufdatum"
                name="ablaufdatum"
                type="text"
                placeholder="MM/JJ"
                className="w-full border-2 rounded-md p-2 outline-none focus:ring-2 focus:ring-blue-500"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.ablaufdatum}
              />
              {formik.touched.ablaufdatum && formik.errors.ablaufdatum && (
                <div className="text-red-500 text-sm">
                  {formik.errors.ablaufdatum}
                </div>
              )}
            </div>
            <div className="flex-1">
              <label
                htmlFor="sicherheitscode"
                className="block font-medium mb-1"
              >
                Sicherheitscode
              </label>
              <input
                id="sicherheitscode"
                name="sicherheitscode"
                type="text"
                placeholder="CVV"
                className="w-full border-2 rounded-md p-2 outline-none focus:ring-2 focus:ring-blue-500"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.sicherheitscode}
              />
              {formik.touched.sicherheitscode &&
                formik.errors.sicherheitscode && (
                  <div className="text-red-500 text-sm">
                    {formik.errors.sicherheitscode}
                  </div>
                )}
            </div>
          </div>
        </div>
        <button
          type="submit"
          className="w-full bg-orange-600 text-white font-medium py-3 rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 mb-3"
        >
          Bestätigen Sie Ihre Buchung
        </button>
      </div>
    </form>
  );
};

export default FormReservation;
