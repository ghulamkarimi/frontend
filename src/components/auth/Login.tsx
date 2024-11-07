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
import { useRouter } from "next/navigation";




const Login = () => {
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter()
    const formSchema = Yup.object({
        email: Yup.string().email('Invalid email address')
            .required('Required'),


        password: Yup.string()
            .required('Required')
            .min(6, "Password must be at least 6 characters")
    })

    const [isLoading, setIsLoading] = React.useState(false);

    const formik = useFormik({
        initialValues: {
            email: "",
            password: ""
        },
        onSubmit: async (values) => {
            try {
                const response = await dispatch(userLoginApi(values)).unwrap();
                NotificationService.success(response.message || "Login successful");
                setTimeout(()=> {
                    router.push("/")
                },4000)
                dispatch(setUserInfo(response.data.userInfo));
                localStorage.setItem("exp", response.data.userInfo.exp)
               

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
                    <h3 className="text-3xl font-bold mb-4">Login</h3>
                    <Link href="/register" className="flex items-center">
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
                    <button
                        className={`p-2 my-2 bg-blue-500 text-white rounded-md ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                        type="submit"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Loading...' : 'Login'}
                    </button>

                </form>
            </div>
        </div>
    );
}

export default Login;