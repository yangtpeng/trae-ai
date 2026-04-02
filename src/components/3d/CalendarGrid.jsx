import React, { useState, useMemo } from 'react';
import { Box, Text, Html } from '@react-three/drei';
import SunIcon from './SunIcon';
import CloudIcon from './CloudIcon';
import RainIcon from './RainIcon';

const CalendarGrid = ({ days, weatherData, currentDate, onDateClick }) => {
  const [hoveredDate, setHoveredDate] = useState(null);

  const getWeatherForDate = (date) => {
    return weatherData.find(item => item.date === date);
  };

  const renderWeatherIcon = (weather) => {
    switch (weather) {
      case 'sunny':
        return <SunIcon />;
      case 'cloudy':
        return <CloudIcon />;
      case 'rainy':
        return <RainIcon />;
      default:
        return null;
    }
  };

  const gridItems = useMemo(() => {
    return days.map((date, index) => {
      const row = Math.floor(index / 7);
      const col = index % 7;
      const x = col * 2 - 6;
      const z = row * 2 - 4;
      return { date, x, z, index };
    });
  }, [days]);

  const weekDays = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];

  return (
    <group>
      {/* 星期标题 */}
      {weekDays.map((day, index) => {
        const x = index * 2 - 6;
        return (
          <group key={day} position={[x, 0, -6]}>
            <Box args={[1.8, 0.1, 0.8]} position={[0, -0.05, 0]}>
              <meshStandardMaterial color="#4A90E2" metalness={0.5} roughness={0.5} />
            </Box>
            <Text
              position={[0, 0.2, 0]}
              fontSize={0.4}
              color="#FFFFFF"
              anchorX="center"
              anchorY="middle"
            >
              {day}
            </Text>
          </group>
        );
      })}

      {/* 日历网格 */}
      {gridItems.map(({ date, x, z }) => {
        const isCurrentDate = date === currentDate;
        const weather = getWeatherForDate(date);
        const dayNumber = date.split('-')[2];
        const isHovered = hoveredDate === date;

        return (
          <group key={date} position={[x, 0, z]}>
            {/* 日期方块 */}
            <Box
              args={[1.8, 0.2, 1.8]}
              position={[0, -0.1, 0]}
              onClick={() => onDateClick(date, { x, y: 0, z })}
              onPointerEnter={() => setHoveredDate(date)}
              onPointerLeave={() => setHoveredDate(null)}
            >
              <meshStandardMaterial
                color={isCurrentDate ? '#FFD700' : isHovered ? '#E8E8E8' : '#F5F5F5'}
                metalness={0.3}
                roughness={0.6}
              />
            </Box>

            {/* 日期数字 - 使用Html确保始终面向相机 */}
            <Html
              position={[0, 0.05, 0.7]}
              center
              distanceFactor={10}
              style={{
                pointerEvents: 'none',
                userSelect: 'none',
              }}
            >
              <div style={{
                fontSize: '28px',
                fontWeight: 'bold',
                color: isCurrentDate ? '#FF4444' : '#333333',
                textShadow: '0 2px 4px rgba(0,0,0,0.2)',
                fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                transform: 'translate(-50%, -50%)',
              }}>
                {dayNumber}
              </div>
            </Html>

            {/* 天气图标 */}
            {weather && renderWeatherIcon(weather.weather)}

            {/* 悬停高亮效果 */}
            {isHovered && (
              <Box
                args={[1.9, 0.05, 1.9]}
                position={[0, -0.15, 0]}
              >
                <meshBasicMaterial color="#4A90E2" transparent opacity={0.5} />
              </Box>
            )}
          </group>
        );
      })}
    </group>
  );
};

export default CalendarGrid;