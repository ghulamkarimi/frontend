"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAppointments, displayAppointments } from "../../../feature/reducers/appointmentSlice";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { RootState, AppDispatch } from "../../../feature/store/store";
import { IAppointment } from "../../../interface";

type CalendarValue = Date | Date[] | null;

const UserCalendar: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { status } = useSelector((state: RootState) => state.appointments);
  const items = useSelector((state: RootState) => displayAppointments(state));

  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [formattedSelectedDate, setFormattedSelectedDate] = useState<string | null>(null);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchAppointments());
    }
  }, [status, dispatch]);

  useEffect(() => {
    if (selectedDate) {
      const formattedDate = selectedDate.toISOString().split("T")[0];
      setFormattedSelectedDate(formattedDate);
    }
  }, [selectedDate]);

  const handleDateChange = (value: CalendarValue) => {
    if (value instanceof Date) {
      setSelectedDate(value);
    } else if (Array.isArray(value)) {
      setSelectedDate(value[0]);
    } else {
      setSelectedDate(null);
    }
  };

  const availableTimes = ["07:30", "09:00", "10:30", "12:00", "13:30", "15:00", "16:30", "18:00"];

  const renderTimeButtons = () => {
    return availableTimes.map((time) => {
      const isBookedOrBlocked = items.some((appointment: IAppointment) => {
        const appointmentDate = new Date(appointment.date).toLocaleDateString("en-CA");
        const selectedDateFormatted = new Date(selectedDate!).toLocaleDateString("en-CA");
        const formattedAppointmentTime = appointment?.time.padStart(5, "0");

        const isSameDate = appointmentDate === selectedDateFormatted;
        const isSameTime = formattedAppointmentTime === time;
        const isBlocked = appointment?.isBookedOrBlocked;

        return isSameDate && isSameTime && isBlocked;
      });

      return (
        <button
          key={time}
          className={`px-4 py-2 m-2 rounded-lg text-white ${
            isBookedOrBlocked
              ? "bg-red-500 cursor-not-allowed"
              : "bg-green-500 hover:bg-green-600 cursor-pointer"
          }`}
          disabled={isBookedOrBlocked}
        >
          {time}
        </button>
      );
    });
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4 text-center">Benutzerfreundlicher Kalender</h1>
      <div className="calendar-container flex justify-center">
        <Calendar
          onChange={(value) => handleDateChange(value as CalendarValue)}
          value={selectedDate}
          className="shadow-lg rounded-lg p-4 bg-white"
        />
      </div>
      <div className="time-buttons mt-6 text-center">
        <h3 className="text-xl font-semibold mb-4">
          Verfügbare Uhrzeiten für den {selectedDate?.toLocaleDateString()}:
        </h3>
        <div className="flex flex-wrap justify-center">{renderTimeButtons()}</div>
      </div>
    </div>
  );
};

export default UserCalendar;
