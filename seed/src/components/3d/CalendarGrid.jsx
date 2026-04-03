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
      {/* 星期标题 */}
      {weekDays.map((day, index) => {
        const x = index * 2.2 - 6.6;
        return (
          <group key={day.name} position={[x, 0.5, -6.5]}>
            {/* 星期标题背景 */}
            <Box args={[2, 0.15, 0.9]} position={[0, -0.075, 0]}>
              <meshStandardMaterial 
                color={day.color} 
                metalness={0.4} 
                roughness={0.4}
                emissive={day.color}
                emissiveIntensity={0.1}
              />
            </Box>
            {/* 星期文字 */}
            <Text
              position={[0, 0.25, 0]}
              fontSize={0.45}
              color="#FFFFFF"
              anchorX="center"
              anchorY="middle"
            >
              {day.name}
            </Text>
            {/* 装饰线条 */}
            <Box args={[1.5, 0.02, 0.02]} position={[0, 0.02, 0.4]}>
              <meshBasicMaterial color="#FFFFFF" transparent opacity={0.5} />
            </Box>
          </group>
        );
      })}

      {/* 日历网格 */}
      {gridItems.map(({ date, x, z }) => {
        const isCurrentDate = date === currentDate;
        const weather = getWeatherForDate(date);
        const dayNumber = date.split('-')[2];
        const isHovered = hoveredDate === date;

        // 根据天气设置方块颜色
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
            {/* 阴影层 */}
            {(isHovered || isCurrentDate) && (
              <Box
                args={[2.05, 0.05, 2.05]}
                position={[0, -0.18, 0]}
              >
                <meshBasicMaterial color="#000000" transparent opacity={0.15} />
              </Box>
            )}

            {/* 日期方块主体 */}
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

            {/* 边框效果 */}
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

            {/* 悬停高亮效果 */}
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

            {/* 日期数字 */}
            <Text
              position={[0, 0.15, 0]}
              fontSize={0.7}
              color={isCurrentDate ? '#FF6B6B' : '#333333'}
              anchorX="center"
              anchorY="middle"
              fontWeight={isCurrentDate ? "bold" : "normal"}
            >
              {dayNumber}
            </Text>

            {/* 当前日期角标 */}
            {isCurrentDate && (
              <group position={[-0.7, 0.2, -0.7]}>
                <Box args={[0.4, 0.05, 0.4]} position={[0, 0, 0]}>
                  <meshBasicMaterial color="#FF6B6B" />
                </Box>
                <Text
                  position={[0, 0.06, 0]}
                  fontSize={0.2}
                  color="#FFFFFF"
                  anchorX="center"
                  anchorY="middle"
                >
                  今
                </Text>
              </group>
            )}

            {/* 天气图标 */}
            {weather && (
              <group position={[0.5, 0.3, 0.5]}>
                {renderWeatherIcon(weather.weather)}
              </group>
            )}

            {/* 悬停提示 */}
            {isHovered && weather && (
              <Html position={[0, 1.2, 0]} center>
                <div style={{
                  background: 'rgba(0, 0, 0, 0.85)',
                  color: '#fff',
                  padding: '8px 14px',
                  borderRadius: '10px',
                  fontSize: '13px',
                  fontWeight: '500',
                  whiteSpace: 'nowrap',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255,255,255,0.1)'
                }}>
                  {date} · {weather.temperature}°C · {weather.weather === 'sunny' ? '晴天' : weather.weather === 'cloudy' ? '多云' : '雨天'}
                </div>
              </Html>
            )}

            {/* 温度标签 */}
            {weather && (
              <Html position={[-0.5, 0.25, -0.5]} center>
                <div style={{
                  fontSize: '12px',
                  padding: '2px 6px',
                  borderRadius: '10px',
                  backgroundColor: weather.weather === 'sunny' ? '#FFE066' : 
                                  weather.weather === 'cloudy' ? '#B8D4E3' : '#A8D8EA',
                  color: '#333',
                  fontWeight: '600',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
                }}>
                  {weather.temperature}°
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