import Link from "next/link";
import { IoReturnDownBack } from "react-icons/io5";

const Login = () => {
    return (
        <div className="register-background">
            <div>
                <div className="flex justify-between">
                    <h1 className="text-3xl font-bold mb-4">Login</h1>
                    <Link href="/register" className="flex items-center ">
                        <IoReturnDownBack className="text-3xl"/>
                    </Link>
                </div>
                <form className="flex flex-col">
                    <input type="email" placeholder="Email" className="inputRegister" />
                    <input type="password" placeholder="Password" className="inputRegister" />
                    <button className="p-2 my-2 bg-blue-500 text-white rounded-md">Login</button>
                </form>
            </div>
        </div>
    );
}

export default Login;