"use client";

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAppointments, displayAppointments } from '../../../feature/reducers/appointmentSlice';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { RootState, AppDispatch } from '../../../feature/store/store'; // Adjust the import path as needed
import { IAppointment } from '../../../interface';

// Typ von Value importieren
type CalendarValue = Date | Date[] | null;

const UserCalendar: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { status } = useSelector((state: RootState) => state.appointments);
  // Verwende den memoisierten Selector, um alle Termine zu holen
  const items = useSelector((state: RootState) => displayAppointments(state));

  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [formattedSelectedDate, setFormattedSelectedDate] = useState<string | null>(null);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchAppointments());
    }
  }, [status, dispatch]);

  // Formatierte Version des ausgewählten Datums
  useEffect(() => {
    if (selectedDate) {
      const formattedDate = new Intl.DateTimeFormat('de-DE', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      })
        .format(selectedDate)
        .split('.')
        .reverse()
        .join('-'); // Formatiert das Datum zu "YYYY-MM-DD"
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

  const availableTimes = ['07:30', '09:00', '10:30', '12:00', '13:30', '15:00', '16:30', '18:00'];

  const renderTimeButtons = () => {
    console.log("Appointments Items: ", items);
    return availableTimes.map((time) => {
      const isBookedOrBlocked = items.some(
        (appointment: IAppointment) => {
          const isSameDate = appointment?.date === formattedSelectedDate;
          const isSameTime = appointment?.time === time;
          const isBlocked = appointment?.isBookedOrBlocked;

          console.log(`Checking time: ${time} on date: ${formattedSelectedDate}`);
          console.log(`Time: ${time} isSameDate: ${isSameDate} isSameTime: ${isSameTime} isBookedOrBlocked: ${isBlocked}`);

          return isSameDate && isSameTime && isBlocked;
        }
      );

      console.log(`Button for time ${time} isBookedOrBlocked: ${isBookedOrBlocked}`);

      return (
        <button
          key={time}
          style={{
            backgroundColor: isBookedOrBlocked ? '#dc3545' : '#28a745',
            color: '#ffffff',
            padding: '10px 20px',
            margin: '10px',
            border: 'none',
            borderRadius: '5px',
            cursor: isBookedOrBlocked ? 'not-allowed' : 'pointer',
          }}
          disabled={isBookedOrBlocked}
        >
          {time}
        </button>
      );
    });
  };

  return (
    <div>
      <h1>Benutzerfreundlicher Kalender</h1>
      <div className="calendar-container">
        <Calendar onChange={(value) => handleDateChange(value as CalendarValue)} value={selectedDate} />
      </div>
      <div className="time-buttons mt-4">
        <h3>Verfügbare Uhrzeiten für den {selectedDate?.toLocaleDateString()}:</h3>
        {renderTimeButtons()}
      </div>
    </div>
  );
};

export default UserCalendar;
