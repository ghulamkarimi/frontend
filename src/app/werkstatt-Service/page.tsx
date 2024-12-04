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
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    if (status === "idle") {
      dispatch(fetchAppointments());
    }
  }, [status, dispatch]);

  useEffect(() => {
    if (selectedDate) {
      setFormattedSelectedDate(formatDate(selectedDate));
    }
  }, [selectedDate]);

  const formatDate = (date: Date): string => {
    return new Intl.DateTimeFormat("en-CA", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).format(date);
  };

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
        const appointmentDate = formatDate(new Date(appointment.date));
        const isSameDate = appointmentDate === formattedSelectedDate;
        const isSameTime = appointment.time.padStart(5, "0") === time;
        return isSameDate && isSameTime && appointment.isBookedOrBlocked;
      });

      return (
        <button
          key={time}
          className={`px-4 py-2 m-2 rounded-lg text-white ${
            isBookedOrBlocked ? "bg-red-500 cursor-not-allowed" : "bg-green-500 hover:bg-green-600"
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
        {isClient && (
          <Calendar
            onChange={(value) => handleDateChange(value as CalendarValue)}
            value={selectedDate}
            className="shadow-lg rounded-lg p-4 bg-white"
          />
        )}
      </div>
      <div className="time-buttons mt-6 text-center">
        <h3 className="text-xl font-semibold mb-4">
          Verfügbare Uhrzeiten für den {formattedSelectedDate}:
        </h3>
        <div className="flex flex-wrap justify-center">{renderTimeButtons()}</div>
      </div>
    </div>
  );
};

export default UserCalendar;
