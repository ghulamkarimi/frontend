"use client"

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAppointments } from '../../../feature/reducers/appointmentSlice';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { RootState, AppDispatch } from '../../../feature/store/store';
import { IAppointment } from '../../../interface';

// Typ von Value importieren
type CalendarValue = Date | Date[] | null;

const UserCalendar: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { status } = useSelector((state: RootState) => state.appointments);
  const items = useSelector((state: RootState) => state.appointments.ids.map(id => state.appointments.entities[id]));

  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isClient, setIsClient] = useState(false);

  // Setze isClient auf true, um sicherzustellen, dass der Kalender nur auf dem Client angezeigt wird
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Hole Termine, sobald die Komponente gemountet wird
  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchAppointments());
    }
  }, [status, dispatch]);

  const handleDateChange = (value: CalendarValue) => {
    console.log('Selected Date:', value);
    if (value instanceof Date) {
      setSelectedDate(value);
    } else if (Array.isArray(value)) {
      setSelectedDate(value[0]);
    } else {
      setSelectedDate(null);
    }
  };

  const availableTimes = [
    "07:30", "09:00", "10:30", "12:00", "13:30", "15:00", "16:30", "18:00"
  ];

  const renderTimeButtons = () => {
    console.log("Appointments Items:", items);
    return availableTimes.map((time) => {
      const formattedSelectedDate = selectedDate ? selectedDate.toISOString().split('T')[0] : null;

      // Debugging: Logge die relevanten Werte für die Prüfung
      console.log("Checking time:", time, "on date:", formattedSelectedDate);

      const isBookedOrBlocked = items.some(
        (appointment: IAppointment) =>
          appointment?.date === formattedSelectedDate &&
          appointment?.time === time &&
          appointment?.isBookedOrBlocked
      );

      console.log("Time:", time, "isBookedOrBlocked:", isBookedOrBlocked);

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

  if (!isClient) {
    return null; // Verhindere die Server-seitige Darstellung des Kalenders
  }

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
