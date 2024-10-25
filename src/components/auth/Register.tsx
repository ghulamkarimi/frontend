import Link from "next/link";
import { IoReturnDownBack } from "react-icons/io5";

const Register = () => {
    return (
        <div className="register-background"
            style={{ backgroundImage: "url('/background.jpg')" }}
        >
            <div>
                <div className="flex justify-between">
                    <h1 className="text-3xl font-bold mb-4">Register</h1>
                    <Link href="/login" className="flex items-center ">
                        <IoReturnDownBack className="text-3xl" />
                    </Link>
                </div>
                <form className="flex flex-col">
                    <input type="text" placeholder="firstName" className="inputRegister" />
                    <input type="text" placeholder="lastName" className="inputRegister" />
                    <input type="email" placeholder="Email" className="inputRegister" />
                    <input type="password" placeholder="Password" className="inputRegister" />
                    <input type="password" placeholder="Confirm Password" className="inputRegister" />
                    <button className="p-2 my-2 bg-blue-500 text-white rounded-md">Register</button>
                </form>
            </div>
        </div>
    );
}

export default Register;
