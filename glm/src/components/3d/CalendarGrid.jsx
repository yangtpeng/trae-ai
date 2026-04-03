import React, { useState, useMemo, useRef } from 'react';
import { Box, Html, RoundedBox } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import SunIcon from './SunIcon';
import CloudIcon from './CloudIcon';
import RainIcon from './RainIcon';

const CalendarCell = ({ date, x, z, weather, isCurrentDate, isHovered, onHover, onClick }) => {
  const groupRef = useRef();
  const dayNumber = date.split('-')[2];

  useFrame((state) => {
    if (groupRef.current) {
      if (isHovered) {
        groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 3) * 0.02 + 0.15;
      } else if (isCurrentDate) {
        groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 2) * 0.03 + 0.05;
      } else {
        groupRef.current.position.y = 0;
      }
    }
  });

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

  const renderWeatherIcon = (weatherType) => {
    switch (weatherType) {
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

  return (
    <group ref={groupRef} position={[x, 0, z]}>
      {(isHovered || isCurrentDate) && (
        <mesh position={[0, -0.2, 0]}>
          <planeGeometry args={[2.3, 2.3]} />
          <meshBasicMaterial color="#000000" transparent opacity={0.2} />
        </mesh>
      )}

      <RoundedBox
        args={[1.95, 0.2, 1.95]}
        radius={0.08}
        smoothness={4}
        position={[0, -0.1, 0]}
        onClick={() => onClick(date, { x, y: 0, z })}
        onPointerEnter={() => onHover(date)}
        onPointerLeave={() => onHover(null)}
      >
        <meshStandardMaterial
          color={getWeatherColor()}
          metalness={0.15}
          roughness={0.6}
          envMapIntensity={0.5}
        />
      </RoundedBox>

      <RoundedBox
        args={[2.02, 0.06, 2.02]}
        radius={0.06}
        smoothness={4}
        position={[0, -0.08, 0]}
      >
        <meshStandardMaterial
          color={getBorderColor()}
          transparent
          opacity={isCurrentDate ? 1 : 0.4}
          emissive={getBorderColor()}
          emissiveIntensity={isCurrentDate ? 0.3 : 0}
          metalness={0.3}
          roughness={0.4}
        />
      </RoundedBox>

      {isHovered && (
        <RoundedBox
          args={[2.15, 0.04, 2.15]}
          radius={0.08}
          smoothness={4}
          position={[0, -0.06, 0]}
        >
          <meshStandardMaterial
            color="#4ECDC4"
            transparent
            opacity={0.5}
            emissive="#4ECDC4"
            emissiveIntensity={0.5}
          />
        </RoundedBox>
      )}

      <Html position={[-0.7, 0.05, 0.7]} distanceFactor={12}>
        <div style={{
          fontSize: '28px',
          fontWeight: isCurrentDate ? '900' : '700',
          color: isCurrentDate ? '#FF6B6B' : '#2d2d2d',
          textShadow: isCurrentDate
            ? '0 2px 10px rgba(255,107,107,0.6), 0 0 20px rgba(255,107,107,0.3)'
            : '0 1px 2px rgba(0,0,0,0.1)',
          userSelect: 'none',
          transition: 'transform 0.2s ease',
          transform: isHovered ? 'scale(1.1)' : 'scale(1)'
        }}>
          {dayNumber}
        </div>
      </Html>

      {isCurrentDate && (
        <Html position={[-0.7, 0.22, -0.65]} distanceFactor={12}>
          <div style={{
            background: 'linear-gradient(135deg, #FF6B6B 0%, #FF8E8E 50%, #FFA5A5 100%)',
            color: '#FFFFFF',
            fontSize: '11px',
            fontWeight: '800',
            padding: '5px 12px',
            borderRadius: '10px',
            boxShadow: '0 3px 12px rgba(255,107,107,0.5), 0 0 20px rgba(255,107,107,0.3)',
            letterSpacing: '0.5px'
          }}>
            今天
          </div>
        </Html>
      )}

      {weather && (
        <group position={[0.55, 0.35, -0.55]}>
          {renderWeatherIcon(weather.weather)}
        </group>
      )}

      {weather && (
        <Html position={[0.6, 0.02, 0.6]} distanceFactor={12}>
          <div style={{
            fontSize: '10px',
            padding: '3px 6px',
            borderRadius: '10px',
            background: 'rgba(255,255,255,0.95)',
            color: '#333',
            fontWeight: '700',
            boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
            textAlign: 'center',
            backdropFilter: 'blur(5px)'
          }}>
            {weather.tempHigh}°/{weather.tempLow}°
          </div>
        </Html>
      )}

      {weather && (
        <Html position={[0, 0.32, 0]} distanceFactor={12}>
          <div style={{
            fontSize: '9px',
            padding: '2px 8px',
            borderRadius: '8px',
            background: weather.weather === 'sunny'
              ? 'linear-gradient(135deg, #FFE066, #FFD93D)' :
              weather.weather === 'cloudy'
                ? 'linear-gradient(135deg, #B8D4E3, #A0C4D4)'
                : 'linear-gradient(135deg, #A8D8EA, #7FC8DC)',
            color: '#333',
            fontWeight: '700',
            boxShadow: '0 2px 6px rgba(0,0,0,0.12)',
            textAlign: 'center'
          }}>
            {weather.weather === 'sunny' ? '☀️ 晴' : weather.weather === 'cloudy' ? '☁️ 多云' : '🌧️ 雨'}
          </div>
        </Html>
      )}

      {isHovered && weather && (
        <Html position={[0, 1.5, 0]} center distanceFactor={10}>
          <div style={{
            background: 'linear-gradient(145deg, rgba(20,20,35,0.98) 0%, rgba(40,40,60,0.98) 100%)',
            color: '#fff',
            padding: '18px 22px',
            borderRadius: '20px',
            fontSize: '13px',
            fontWeight: '500',
            boxShadow: '0 15px 50px rgba(0,0,0,0.5), 0 0 30px rgba(102,126,234,0.2)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255,255,255,0.1)',
            minWidth: '220px'
          }}>
            <div style={{
              marginBottom: '14px',
              paddingBottom: '12px',
              borderBottom: '1px solid rgba(255,255,255,0.1)',
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}>
              <span style={{ fontSize: '28px' }}>
                {weather.weather === 'sunny' ? '☀️' : weather.weather === 'cloudy' ? '☁️' : '🌧️'}
              </span>
              <div>
                <div style={{ fontSize: '17px', fontWeight: '700' }}>{date}</div>
                <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.6)' }}>
                  {['周日', '周一', '周二', '周三', '周四', '周五', '周六'][new Date(date).getDay()]}
                </div>
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              <div style={{
                background: 'rgba(255,255,255,0.05)',
                padding: '10px',
                borderRadius: '12px',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.5)' }}>🌡️ 温度</div>
                <div style={{ fontWeight: '700', marginTop: '4px' }}>{weather.tempLow}° ~ {weather.tempHigh}°</div>
              </div>
              <div style={{
                background: 'rgba(255,255,255,0.05)',
                padding: '10px',
                borderRadius: '12px',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.5)' }}>💧 降水</div>
                <div style={{ fontWeight: '700', marginTop: '4px' }}>{weather.rainProb}%</div>
              </div>
              <div style={{
                background: 'rgba(255,255,255,0.05)',
                padding: '10px',
                borderRadius: '12px',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.5)' }}>💨 风力</div>
                <div style={{ fontWeight: '700', marginTop: '4px' }}>{weather.windSpeed}km/h</div>
              </div>
              <div style={{
                background: 'rgba(255,255,255,0.05)',
                padding: '10px',
                borderRadius: '12px',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.5)' }}>💦 湿度</div>
                <div style={{ fontWeight: '700', marginTop: '4px' }}>{weather.humidity}%</div>
              </div>
            </div>
          </div>
        </Html>
      )}
    </group>
  );
};

const CalendarGrid = ({ days, weatherData, currentDate, onDateClick }) => {
  const [hoveredDate, setHoveredDate] = useState(null);

  const getWeatherForDate = (date) => {
    return weatherData.find(item => item.date === date);
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
            <RoundedBox args={[1.95, 0.12, 0.85]} radius={0.06} smoothness={4} position={[0, -0.06, 0]}>
              <meshStandardMaterial
                color={day.color}
                metalness={0.3}
                roughness={0.4}
                emissive={day.color}
                emissiveIntensity={0.2}
              />
            </RoundedBox>
            <Html position={[0, 0.12, 0]} distanceFactor={12}>
              <div style={{
                fontSize: '18px',
                fontWeight: '800',
                color: '#FFFFFF',
                textShadow: '0 2px 8px rgba(0,0,0,0.4)',
                userSelect: 'none',
                letterSpacing: '1px'
              }}>
                {day.name}
              </div>
            </Html>
          </group>
        );
      })}

      {gridItems.map(({ date, x, z }) => (
        <CalendarCell
          key={date}
          date={date}
          x={x}
          z={z}
          weather={getWeatherForDate(date)}
          isCurrentDate={date === currentDate}
          isHovered={hoveredDate === date}
          onHover={setHoveredDate}
          onClick={onDateClick}
        />
      ))}
    </group>
  );
};

export default CalendarGrid;
