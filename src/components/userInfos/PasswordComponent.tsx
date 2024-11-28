import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../feature/store/store";
import { NotificationService } from "../../../service/NotificationService";
import { changePasswordApi } from "../../../feature/reducers/userSlice";
import { AiOutlineLock } from "react-icons/ai";

const PasswordComponent = () => {
  const dispatch = useDispatch<AppDispatch>();

  const passwordStrengthRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$/;

  const formik = useFormik({
    initialValues: {
      email: "",
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Ungültige E-Mail-Adresse")
        .required("E-Mail ist erforderlich"),
      newPassword: Yup.string()
        .matches(
          passwordStrengthRegex,
          "Das Passwort muss mindestens 8 Zeichen lang sein und mindestens einen Großbuchstaben, einen Kleinbuchstaben und eine Zahl enthalten."
        )
        .required("Neues Passwort ist erforderlich"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("newPassword")], "Passwörter stimmen nicht überein")
        .required("Passwort-Bestätigung ist erforderlich"),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        // Dispatch an Redux-Thunk
        await dispatch(changePasswordApi(values)).unwrap();
        NotificationService.success("Passwort erfolgreich geändert!");
        resetForm();
      } catch (error: any) {
        NotificationService.error(
          error || "Fehler beim Ändern des Passworts. Bitte versuchen Sie es erneut."
        );
      }
    },
  });

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
        <div className="text-center mb-6">
          <AiOutlineLock className="text-6xl text-blue-500 mx-auto mb-2" />
          <h2 className="text-3xl font-bold text-gray-800">Passwort ändern</h2>
          <p className="text-sm text-gray-600">
            Geben Sie Ihre E-Mail und das neue Passwort ein, um es zu ändern.
          </p>
        </div>
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              E-Mail
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Ihre E-Mail-Adresse"
              className={`mt-1 block w-full px-4 py-2 border rounded-md shadow-sm text-gray-900 focus:ring-blue-500 focus:border-blue-500 ${formik.touched.email && formik.errors.email
                  ? "border-red-500"
                  : "border-gray-300"
                }`}
            />
            {formik.touched.email && formik.errors.email && (
              <p className="text-red-500 text-xs mt-1">{formik.errors.email}</p>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="newPassword"
              className="block text-sm font-medium text-gray-700"
            >
              Neues Passwort
            </label>
            <input
              type="password"
              id="newPassword"
              name="newPassword"
              value={formik.values.newPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Neues Passwort"
              className={`mt-1 block w-full px-4 py-2 border rounded-md shadow-sm text-gray-900 focus:ring-blue-500 focus:border-blue-500 ${formik.touched.newPassword && formik.errors.newPassword
                  ? "border-red-500"
                  : "border-gray-300"
                }`}
            />
            {formik.touched.newPassword && formik.errors.newPassword && (
              <p className="text-red-500 text-xs mt-1">
                {formik.errors.newPassword}
              </p>
            )}
          </div>
          <div className="mb-6">
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700"
            >
              Passwort bestätigen
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Neues Passwort bestätigen"
              className={`mt-1 block w-full px-4 py-2 border rounded-md shadow-sm text-gray-900 focus:ring-blue-500 focus:border-blue-500 ${formik.touched.confirmPassword && formik.errors.confirmPassword
                  ? "border-red-500"
                  : "border-gray-300"
                }`}
            />
            {formik.touched.confirmPassword &&
              formik.errors.confirmPassword && (
                <p className="text-red-500 text-xs mt-1">
                  {formik.errors.confirmPassword}
                </p>
              )}
          </div>
          <div className="flex justify-between items-center">
            <button
              type="button"
              onClick={formik.handleReset}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-all"
            >
              Abbrechen
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-all"
            >
              Ändern
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PasswordComponent;
