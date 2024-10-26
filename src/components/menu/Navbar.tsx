"use client";

import { FaRegCircleUser } from "react-icons/fa6";
import Link from "next/link";
import MenuItems from './MenuItems';
import { IoMdMenu } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../feature/store/store";
import { setIsMenuOpen } from "../../../feature/reducers/appSlice";
import { MdClose } from "react-icons/md";

const Navbar = () => {
    const item = MenuItems;
    const dispatch = useDispatch();
    const { isMenuOpen } = useSelector((state: RootState) => state.app);

    return (
        <>

            {isMenuOpen && (
                <div className="fixed inset-0 z-40 backdrop-blur-sm bg-black/40" onClick={() => dispatch(setIsMenuOpen(false))}></div>
            )}

            <nav className="relative z-50">
                <div className="px-20 bg-orange-500 py-2 flex justify-between items-center">
                    <div>
                        <img
                            className="h-10 w-10 lg:h-16 lg:w-16 rounded-full object-cover"
                            src="/logo.png" alt="logo" />
                    </div>

                    <div className="flex justify-center items-center gap-8">
                        <FaRegCircleUser className="text-2xl text-white" />
                        <div onClick={() => dispatch(setIsMenuOpen(!isMenuOpen))}>
                            <IoMdMenu className={`text-2xl text-white ${isMenuOpen ? "hidden" : "flex"}`} />
                        </div>
                    </div>
                </div>

                <ul className={`fixed z-50 right-0 bg-stone-900 shadow-2xl text-sm lg:text-base xl:text-xl ease-in-out duration-500 text-white flex flex-col ${isMenuOpen ? "flex w-5/12 min-h-screen translate-x-0" : "hidden"}`}>
                    <div className="flex justify-between items-center p-4">
                        <MdClose
                            onClick={() => dispatch(setIsMenuOpen(false))}
                            className="text-2xl text-white cursor-pointer hover:bg-orange-500 rounded-full"
                        />
                    </div>
                    {item.map((menuItem, index) => (
                        <li key={index} className="p-4 hover:bg-orange-500">
                            <Link href={menuItem.url} onClick={() => dispatch(setIsMenuOpen(false))}>
                                {menuItem.title}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </>
    );
}

export default Navbar;
