import React from "react";
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
import { userLogoutApi } from "../../../feature/reducers/userSlice";
import { FaCarSide, FaRegCircleUser } from "react-icons/fa6";
import { RiLogoutCircleLine } from "react-icons/ri";
import { NotificationService } from "../../../service/NotificationService";
import { IoIosLogIn } from "react-icons/io";
import { useRouter } from "next/navigation";

const DropdownMenuDemo = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  // Benutzerzustand direkt aus Redux Store laden
  const userId = useSelector((state: RootState) => state.user.userId); // Überprüfe, ob der Reducer wirklich `user` heißt
  const user = useSelector((state: RootState) => state.user.userInfo); // Annahme: `userInfo` enthält die Benutzerinformationen
  
  // Aktualisierungen in der Konsole anzeigen (zu Debugging-Zwecken)
  React.useEffect(() => {
    console.log("Benutzerzustand:", user);
  }, [user]);

  const handleLogout = async () => {
    try {
      const response = await dispatch(userLogoutApi()).unwrap();
      NotificationService.success(response.message);
      router.push("/login");
    } catch (error: any) {
      NotificationService.error(
        "Logout fehlgeschlagen: " + ((error as Error)?.message || "Unbekannter Fehler")
      );
    }
  };

  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="flex items-center bg-white gap-4 h-10 lg:gap-6 lg:py-2">
            {user && userId ? (
              <div className="flex items-center gap-4 lg:gap-6 lg:px-8 lg:py-1">
                <span className="flex items-center gap-2">
                  <img className="w-8 h-8 rounded-full" src={user?.profile_photo} alt="Profilbild" />
                  {user?.firstName}
                </span>
              </div>
            ) : (
              <span>Register/Login</span>
            )}
          </NavigationMenuTrigger>
          <NavigationMenuContent className="gap-20">
            <NavigationMenuLink
              className="flex items-center gap-4 lg:gap-10 px-4 lg:px-8 bg-white py-2 hover:bg-gray-200"
              href={user && userId ? "/meinProfile" : "/register"}
            >
              <span>
                {user?.profile_photo ? (
                  <img className="w-8 h-8 rounded-full" src={user.profile_photo} alt="Benutzerbild" />
                ) : (
                  <FaRegCircleUser className="lg:text-2xl" />
                )}
              </span>
              <span>{user && userId ? "Profil" : "Registrieren"}</span>
            </NavigationMenuLink>
            {!user && (
              <NavigationMenuLink
                className="flex items-center gap-4 lg:gap-10 px-6 lg:px-8 bg-white py-2 hover:bg-gray-200"
                href="/login"
              >
                <span>
                  <IoIosLogIn className="lg:text-2xl" />
                </span>
                <span>Login</span>
              </NavigationMenuLink>
            )}
            {user && userId && (
              <NavigationMenuLink
                className="flex items-center gap-4 lg:gap-10 px-4 lg:px-8 bg-white py-2 hover:bg-gray-200 cursor-pointer"
                onClick={handleLogout}
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
