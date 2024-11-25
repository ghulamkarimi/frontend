"use client";
import React, { useState } from "react";
import ProfileComponent from "../../components/userInfos/profileComponent";
import PasswordComponent from "../../components/userInfos/PasswordComponent";
import BookingsComponent from "../../components/userInfos/BookingsComponent";
import LogoutComponent from "../../components/userInfos/LogoutComponent";

const Page = () => {
  const [selectedOption, setSelectedOption] = useState("profile");

  const renderContent = () => {
    switch (selectedOption) {
      case "profile":
        return <ProfileComponent />;
      case "password":
        return <PasswordComponent />;
      case "bookings":
        return <BookingsComponent />;
      case "abmelden":
        return <LogoutComponent />;
      default:
        return <div>Willkommen! Bitte ein Thema auswählen.</div>;
    }
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen p-4 justify-center">
      {/* Navbar */}
      <nav className="bg-gray-100 border-r lg:border-b lg:w-1/4 lg:h-full shadow p-4 rounded-md">
        <ul className="flex flex-col lg:gap-4 gap-2 justify-center lg:justify-start">
          <li>
            <button
              className={`w-full text-left px-4 py-2 rounded ${
                selectedOption === "profile"
                  ? "bg-blue-500 text-white"
                  : "hover:bg-gray-200"
              }`}
              onClick={() => setSelectedOption("profile")}
            >
              Profil ändern
            </button>
          </li>
          <li>
            <button
              className={`w-full text-left px-4 py-2 rounded ${
                selectedOption === "password"
                  ? "bg-blue-500 text-white"
                  : "hover:bg-gray-200"
              }`}
              onClick={() => setSelectedOption("password")}
            >
              Passwort ändern
            </button>
          </li>
          <li>
            <button
              className={`w-full text-left px-4 py-2 rounded ${
                selectedOption === "bookings"
                  ? "bg-blue-500 text-white"
                  : "hover:bg-gray-200"
              }`}
              onClick={() => setSelectedOption("bookings")}
            >
              Buchungen
            </button>
          </li>
          <li>
            <button
              className={`w-full text-left px-4 py-2 rounded ${
                selectedOption === "abmelden"
                  ? "bg-red-500 text-white"
                  : "hover:bg-gray-200"
              }`}
              onClick={() => setSelectedOption("abmelden")}
            >
              Abmelden
            </button>
          </li>
        </ul>
      </nav>

      {/* Content */}
      <main className="flex-1 p-6">
        <h1 className="text-2xl font-semibold mb-4">Inhalt</h1>
        <div>{renderContent()}</div>
      </main>
    </div>
  );
};

export default Page;
