"use client"
import Link from "next/link";
import React from "react";
import { IoReturnDownBack } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../feature/store/store";
import * as Yup from 'yup';
import { useFormik } from "formik";
import { NotificationService } from "../../../service/NotificationService";
import { setUserInfo, userLoginApi } from "../../../feature/reducers/userSlice";

const Login = () => {
    const dispatch = useDispatch<AppDispatch>();

    const formSchema = Yup.object({
        email: Yup.string().email('Invalid email address')
            .required('Required'),
           

        password: Yup.string()
            .required('Required')
            .min(6, "Password must be at least 6 characters")
    })

    const formik = useFormik({
        initialValues: {
            email: "",
            password: ""
        },
        onSubmit: async (values) => {
            try {
                const response = await dispatch(userLoginApi(values)).unwrap();
                NotificationService.success(response.message || "Login successful");
                dispatch(setUserInfo(response.userInfo));
                console.log(response.userInfo)
                localStorage.setItem("userId", response.userInfo.userId);
                localStorage.setItem("exp", response.userInfo.exp)
                setTimeout(() => {
                    window.location.href = "/";
                }, 6000)
            } catch (error: any) {
                NotificationService.error(error.message);
            }
        },
        validationSchema: formSchema
    })

    return (
        <div className="register-background"
            style={{ backgroundImage: "url('/background.jpg')" }}
        >
            <div>
                <div className="flex justify-between">
                    <h1 className="text-3xl font-bold mb-4">Login</h1>
                    <Link href="/register" className="flex items-center ">
                        <IoReturnDownBack className="text-3xl" />
                    </Link>
                </div>
                <form className="flex flex-col" onSubmit={formik.handleSubmit}>
                    <input type="email"
                        name="email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        placeholder="Email"
                        className="inputRegister"
                    />
                    <input type="password"
                        name="password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        placeholder="Password"
                        className="inputRegister" />
                    <button className="p-2 my-2 bg-blue-500 text-white rounded-md"
                        type="submit"

                    >Login</button>
                </form>
            </div>
        </div>
    );
}

export default Login;