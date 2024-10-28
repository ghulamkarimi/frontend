"use client";
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
import { useSelector } from "react-redux";
import { RootState } from "../../../feature/store/store";
import { displayUserById } from "../../../feature/reducers/userSlice";
import { FaCarSide, FaRegCircleUser } from "react-icons/fa6";
import { RiLogoutCircleLine } from "react-icons/ri";

const NavigationMenuDemo = () => {
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    setUserId(storedUserId);
  }, []);

  const user = useSelector((state: RootState) => displayUserById(state, userId || ""));

  return (
    <NavigationMenu >
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="flex items-center bg-white gap-4 lg:gap-10 lg:px-8 lg:py-2">
            <span>
              <FaRegCircleUser className="lg:text-2xl" />
            </span>
            <span>{user?.firstName}</span>
          </NavigationMenuTrigger>
          <NavigationMenuContent className="gap-20">
            <NavigationMenuLink
              className="flex items-center gap-4 lg:gap-10 px-4 lg:px-8 bg-white py-2 hover:bg-gray-200"
              href="/link1"
            >
              <span>
                <FaRegCircleUser className="text-xl lg:text-2xl" />
              </span>
              <span>Profile</span>
            </NavigationMenuLink>
            <NavigationMenuLink
              className="flex items-center gap-4 lg:gap-10 px-4 lg:px-8 bg-white py-2 hover:bg-gray-200"
              href="/link2"
            >
              <span>
                <FaCarSide className="text-xl lg:text-2xl" />
              </span>
              <span>Meine Buchungen</span>
            </NavigationMenuLink>
            <NavigationMenuLink
              className="flex items-center gap-4 lg:gap-10 px-4 lg:px-8 bg-white py-2 hover:bg-gray-200"
              href="/link2"
            >
              <span>
                <RiLogoutCircleLine className="text-xl lg:text-2xl" />
              </span>
              <span>Logout</span>
            </NavigationMenuLink>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>

      <NavigationMenuViewport />
      <NavigationMenuIndicator />
    </NavigationMenu>
  );
};

export default NavigationMenuDemo;
