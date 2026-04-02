import React, { useState, useEffect } from 'react';
import Scene from './3d/Scene';
import CalendarGrid from './3d/CalendarGrid';
import { weatherData } from '../utils/weatherData';
import { getCurrentDate, generateCalendarDays } from '../utils/dateUtils';
import WeatherModal from './WeatherModal';
import CalendarUI from './CalendarUI';

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(getCurrentDate());
  const [selectedDate, setSelectedDate] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [calendarDays, setCalendarDays] = useState([]);
  const [selectedPosition, setSelectedPosition] = useState(null);

  useEffect(() => {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    setCalendarDays(generateCalendarDays(year, month));
  }, []);

  const handleDateClick = (date, position) => {
    setSelectedDate(date);
    setSelectedPosition(position);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setSelectedDate(null);
  };

  return (
    <div style={{ width: '100%', height: '100vh', position: 'relative', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
      <Scene>
        <CalendarGrid
          days={calendarDays}
          weatherData={weatherData}
          currentDate={currentDate}
          onDateClick={handleDateClick}
        />
      </Scene>

      {/* UI覆盖层 */}
      <CalendarUI />

      {modalVisible && selectedDate && (
        <WeatherModal
          date={selectedDate}
          weatherData={weatherData}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default Calendar;