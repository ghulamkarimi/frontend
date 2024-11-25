import React, { useEffect, useState } from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../feature/store/store";
import { displayUserById, userLogoutApi } from "../../../feature/reducers/userSlice";
import { FaCarSide, FaRegCircleUser } from "react-icons/fa6";
import { RiLogoutCircleLine } from "react-icons/ri";
import { NotificationService } from "../../../service/NotificationService";
import { IoIosLogIn } from "react-icons/io";

const DropdownMenuDemo = () => {
  const [userId, setUserId] = useState<string | null>(null);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    setUserId(storedUserId);
  }, []);

  const user = useSelector((state: RootState) => displayUserById(state, userId || ""));

  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="flex items-center bg-white gap-4 h-10 lg:gap-6  lg:py-2">
            {user ? (
              <div className="flex items-center  gap-4 lg:gap-6 lg:px-8 lg:py-1">

                <span className="flex items-center gap-2">
                
                  <img
                    className="w-8 h-8 rounded-full"
                    src={user?.profile_photo} alt="" />
                      {user?.firstName}
                </span>
              </div>
            ) : (
              <span>
                Register/Login
              </span>
            )}
          </NavigationMenuTrigger>
          <NavigationMenuContent className="gap-20">

            <NavigationMenuLink
              className="flex items-center gap-4 lg:gap-10 px-4 lg:px-8 bg-white py-2 hover:bg-gray-200"
              href={user ? "/meinProfile" : "/register"}
            >
              <span>
                {user?.profile_photo ? (
                  // Benutzerbild anzeigen
                  <img
                    className="w-8 h-8 rounded-full"
                    src={user.profile_photo}
                    alt="Benutzerbild"
                  />
                ) : (

                  <FaRegCircleUser className="lg:text-2xl" />
                )}
              </span>
              <span>{user ? "Profile" : "Register"}</span>
            </NavigationMenuLink>

            <NavigationMenuLink
              className="flex items-center gap-4 lg:gap-10 px-6 lg:px-8 bg-white py-2 hover:bg-gray-200"
              href={user ? "/meineBuchungen" : "/login"}
            >
              <span>
                {user ? <FaCarSide className="lg:text-2xl" /> : <IoIosLogIn className="lg:text-2xl" />}
              </span>
              <span>{user ? "Buchungen" : "Login"}</span>
            </NavigationMenuLink>
            {user && (
              <NavigationMenuLink
                className="flex items-center gap-4 lg:gap-10 px-4 lg:px-8 bg-white py-2 hover:bg-gray-200"
                onClick={async () => {
                  try {
                    const response = await dispatch(userLogoutApi()).unwrap();
                    NotificationService.success("Logout successful");
                  } catch (error) {
                    NotificationService.error("Logout failed: " + ((error as Error)?.message || "Unknown error"));
                  }
                }}
              >
                <span>
                  <RiLogoutCircleLine className="text-xl lg:text-2xl" />
                </span>
                <span>Logout</span>
              </NavigationMenuLink>
            )}
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>

      <NavigationMenuViewport />
      <NavigationMenuIndicator />
    </NavigationMenu>
  );
};

export default DropdownMenuDemo;
