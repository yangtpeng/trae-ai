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
      const x = col * 2.2 - 6.6;
      const z = row * 2.2 - 4.4;
      return { date, x, z, index };
    });
  }, [days]);

  const weekDays = [
    { name: '周日', color: '#FF6B6B' },
    { name: '周一', color: '#4ECDC4' },
    { name: '周二', color: '#4ECDC4' },
    { name: '周三', color: '#4ECDC4' },
    { name: '周四', color: '#4ECDC4' },
    { name: '周五', color: '#4ECDC4' },
    { name: '周六', color: '#FF6B6B' }
  ];

  if (days.length === 0) {
    return null;
  }

  return (
    <group position={[0, 0, 0]}>
      {weekDays.map((day, index) => {
        const x = index * 2.2 - 6.6;
        return (
          <group key={day.name} position={[x, 0.5, -6.5]}>
            <Box args={[2, 0.15, 0.9]} position={[0, -0.075, 0]}>
              <meshStandardMaterial
                color={day.color}
                metalness={0.4}
                roughness={0.4}
                emissive={day.color}
                emissiveIntensity={0.1}
              />
            </Box>
            <Html position={[0, 0.15, 0]} distanceFactor={15}>
              <div style={{
                fontSize: '20px',
                fontWeight: '800',
                color: '#FFFFFF',
                textShadow: '0 2px 4px rgba(0,0,0,0.3)',
                userSelect: 'none'
              }}>
                {day.name}
              </div>
            </Html>
          </group>
        );
      })}

      {gridItems.map(({ date, x, z }) => {
        const isCurrentDate = date === currentDate;
        const weather = getWeatherForDate(date);
        const dayNumber = date.split('-')[2];
        const isHovered = hoveredDate === date;

        const getWeatherColor = () => {
          if (!weather) return '#F8F9FA';
          switch (weather.weather) {
            case 'sunny':
              return isCurrentDate ? '#FFE066' : '#FFF9E6';
            case 'cloudy':
              return isCurrentDate ? '#B8D4E3' : '#E8F4F8';
            case 'rainy':
              return isCurrentDate ? '#A8D8EA' : '#E0F7FA';
            default:
              return '#F8F9FA';
          }
        };

        const getBorderColor = () => {
          if (isCurrentDate) return '#FFD93D';
          if (!weather) return '#E0E0E0';
          switch (weather.weather) {
            case 'sunny':
              return '#FFD93D';
            case 'cloudy':
              return '#90A4AE';
            case 'rainy':
              return '#4FC3F7';
            default:
              return '#E0E0E0';
          }
        };

        return (
          <group key={date} position={[x, 0, z]}>
            {(isHovered || isCurrentDate) && (
              <Box
                args={[2.05, 0.05, 2.05]}
                position={[0, -0.18, 0]}
              >
                <meshBasicMaterial color="#000000" transparent opacity={0.15} />
              </Box>
            )}

            <Box
              args={[2, 0.25, 2]}
              position={[0, -0.1, 0]}
              onClick={() => onDateClick(date, { x, y: 0, z })}
              onPointerEnter={() => setHoveredDate(date)}
              onPointerLeave={() => setHoveredDate(null)}
            >
              <meshStandardMaterial
                color={getWeatherColor()}
                metalness={0.2}
                roughness={0.5}
              />
            </Box>

            <Box
              args={[2.08, 0.08, 2.08]}
              position={[0, -0.1, 0]}
            >
              <meshBasicMaterial
                color={getBorderColor()}
                transparent
                opacity={isCurrentDate ? 0.8 : 0.3}
              />
            </Box>

            {isHovered && (
              <Box
                args={[2.15, 0.3, 2.15]}
                position={[0, -0.1, 0]}
              >
                <meshBasicMaterial
                  color="#4ECDC4"
                  transparent
                  opacity={0.2}
                />
              </Box>
            )}

            <Html position={[-0.75, 0.08, 0.75]} distanceFactor={15}>
              <div style={{
                fontSize: '32px',
                fontWeight: isCurrentDate ? '900' : '700',
                color: isCurrentDate ? '#FF6B6B' : '#1a1a1a',
                textShadow: isCurrentDate
                  ? '0 2px 8px rgba(255,107,107,0.5)'
                  : '0 1px 3px rgba(0,0,0,0.2)',
                userSelect: 'none'
              }}>
                {dayNumber}
              </div>
            </Html>

            {isCurrentDate && (
              <Html position={[-0.75, 0.25, -0.7]} distanceFactor={15}>
                <div style={{
                  background: 'linear-gradient(135deg, #FF6B6B 0%, #FF8E8E 100%)',
                  color: '#FFFFFF',
                  fontSize: '12px',
                  fontWeight: '800',
                  padding: '4px 10px',
                  borderRadius: '8px',
                  boxShadow: '0 2px 8px rgba(255,107,107,0.4)'
                }}>
                  今天
                </div>
              </Html>
            )}

            {weather && (
              <group position={[0.6, 0.3, -0.6]}>
                {renderWeatherIcon(weather.weather)}
              </group>
            )}

            {weather && (
              <Html position={[0.6, 0.05, 0.6]} distanceFactor={15}>
                <div style={{
                  fontSize: '11px',
                  padding: '2px 5px',
                  borderRadius: '8px',
                  backgroundColor: 'rgba(255,255,255,0.9)',
                  color: '#333',
                  fontWeight: '600',
                  boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
                  textAlign: 'center'
                }}>
                  {weather.tempHigh}°/{weather.tempLow}°
                </div>
              </Html>
            )}

            {weather && (
              <Html position={[0, 0.35, 0]} distanceFactor={15}>
                <div style={{
                  fontSize: '10px',
                  padding: '1px 6px',
                  borderRadius: '6px',
                  backgroundColor: weather.weather === 'sunny' ? '#FFE066' :
                    weather.weather === 'cloudy' ? '#B8D4E3' : '#A8D8EA',
                  color: '#333',
                  fontWeight: '600',
                  boxShadow: '0 1px 2px rgba(0,0,0,0.15)',
                  textAlign: 'center'
                }}>
                  {weather.weather === 'sunny' ? '☀️ 晴' : weather.weather === 'cloudy' ? '☁️ 多云' : '🌧️ 雨'}
                </div>
              </Html>
            )}

            {isHovered && weather && (
              <Html position={[0, 1.4, 0]} center distanceFactor={15}>
                <div style={{
                  background: 'linear-gradient(135deg, rgba(0,0,0,0.95) 0%, rgba(30,30,30,0.95) 100%)',
                  color: '#fff',
                  padding: '16px 20px',
                  borderRadius: '16px',
                  fontSize: '13px',
                  fontWeight: '500',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
                  backdropFilter: 'blur(15px)',
                  border: '1px solid rgba(255,255,255,0.15)',
                  minWidth: '200px'
                }}>
                  <div style={{ marginBottom: '12px', paddingBottom: '10px', borderBottom: '1px solid rgba(255,255,255,0.15)' }}>
                    <div style={{ fontSize: '16px', fontWeight: '700', marginBottom: '4px' }}>{date}</div>
                    <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.7)' }}>{['周日', '周一', '周二', '周三', '周四', '周五', '周六'][new Date(date).getDay()]}</div>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ color: 'rgba(255,255,255,0.7)' }}>🌡️ 温度</span>
                      <span style={{ fontWeight: '700' }}>{weather.tempLow}°C ~ {weather.tempHigh}°C</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ color: 'rgba(255,255,255,0.7)' }}>💧 降水概率</span>
                      <span style={{ fontWeight: '700' }}>{weather.rainProb}%</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ color: 'rgba(255,255,255,0.7)' }}>💨 风力</span>
                      <span style={{ fontWeight: '700' }}>{weather.windDirection}风 {weather.windSpeed}km/h</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ color: 'rgba(255,255,255,0.7)' }}>💦 湿度</span>
                      <span style={{ fontWeight: '700' }}>{weather.humidity}%</span>
                    </div>
                  </div>
                </div>
              </Html>
            )}
          </group>
        );
      })}
    </group>
  );
};

export default CalendarGrid;