"use client";
import Link from "next/link";
import { IoEyeSharp, IoReturnDownBack } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../feature/store/store";
import { useState } from "react";
import * as Yup from 'yup';
import { useFormik } from "formik";
import { NotificationService } from "../../../service/NotificationService";
import { userRegisterApi } from "../../../feature/reducers/userSlice";
import { useRouter } from "next/navigation";



const Register = () => {
    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>();
    const [showPassword, setShowPassword] = useState(false);
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    }

    const formSchema = Yup.object({
        firstName: Yup.string().required('Required')
            .matches(/^[A-Za-z\s]+$/, "Only alphabets and spaces are allowed in name"),

        lastName: Yup.string().required('Required')
            .matches(/^[A-Za-z]+$/, "Only alphabets are allowed in last name"),

        email: Yup.string().email('Invalid email address').required('Required')
            .email('Invalid email address'),

        password: Yup.string().required('Required')
            .min(6, "Password must be at least 6 characters"),

        confirmPassword: Yup.string()
            .test("passwords-match", "Passwords must match", function (value) {
                return this.parent.password === value;
            })
    })

    const formik = useFormik({
        initialValues: {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            confirmPassword: ""
        },

        onSubmit: async (values) => {
            try {
                const response = await dispatch(userRegisterApi(values)).unwrap();
                NotificationService.success(response.message || "Registration successful");
                setTimeout(() => {
                    router.push("/login");
                }, 4000);
            } catch (error: any) {
                NotificationService.error(error.message || "Registration failed");

            }
        },
        validationSchema: formSchema
    });
    return (
        <div className="register-background"
            style={{ backgroundImage: "url('/background.jpg')" }}
        >
            <div>
                <div className="flex justify-between">
                    <h3 className="text-3xl font-bold mb-4">Register</h3>
                    <Link href="/login" className="flex items-center ">
                        <IoReturnDownBack className="text-3xl" />
                    </Link>
                </div>
                <form className="flex flex-col"
                    onSubmit={formik.handleSubmit}>
                    <input type="text"
                        placeholder="firstName"
                        className="inputRegister"
                        name="firstName"
                        value={formik.values.firstName}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}

                    />
                    {formik.errors.firstName && formik.touched.firstName && (
                        <div className="text-red-500">{formik.errors.firstName}</div>
                    )}
                    <input type="text"
                        placeholder="lastName"
                        className="inputRegister"
                        name="lastName"
                        value={formik.values.lastName}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}

                    />
                    {formik.errors.lastName && formik.touched.lastName && (
                        <div className="text-red-500">{formik.errors.lastName}</div>
                    )}
                    <input type="email"
                        placeholder="Email"
                        className="inputRegister"
                        name="email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}

                    />
                    {formik.errors.email && formik.touched.email && (
                        <div className="text-red-500">{formik.errors.email}</div>
                    )}
                    <div className="flex relative items-center justify-center">
                        <input
                            className={` inputRegister ${formik.touched.password && formik.errors.password && "border-red-500"}`}
                            placeholder="Password"
                            type={showPassword ? "text" : "password"}
                            name="password"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        {showPassword ? (
                            <IoEyeSharp
                                onClick={togglePasswordVisibility}
                                className="text-blue-500 absolute right-0 mx-3 text-2xl cursor-pointer"
                            />
                        ) : (
                            <p onClick={togglePasswordVisibility}
                                className="text-blue-500 text-xs font-bold absolute right-0 mx-3  cursor-pointer">Anzeigen</p>

                        )}
                    </div>
                    <div className="flex items-center justify-center relative">
                        <input
                            className={` inputRegister ${formik.touched.password && formik.errors.password && "border-red-500"}`}
                            placeholder="Confirm Password"
                            type={showPassword ? "text" : "password"}
                            name="confirmPassword"
                            value={formik.values.confirmPassword}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />

                        {showPassword ? (
                            <IoEyeSharp
                                onClick={() => setShowPassword(!showPassword)}
                                className="text-blue-500 absolute right-0 mx-3 text-2xl cursor-pointer"
                            />
                        ) : (
                            <p onClick={togglePasswordVisibility}
                                className="text-blue-500 text-xs font-bold absolute right-0 mx-3  cursor-pointer">Anzeigen</p>
                        )}
                    </div>
                    <button type="submit"
                        className="p-2 my-2 bg-blue-500 text-white rounded-md">Register</button>
                </form>
            </div>
        </div>
    );
}

export default Register;
