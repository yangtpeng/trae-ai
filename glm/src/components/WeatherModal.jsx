import React from 'react';

const WeatherModal = ({ date, weatherData, onClose }) => {
  const weather = weatherData.find(item => item.date === date);

  if (!weather) {
    return null;
  }

  const weekDay = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'][new Date(date).getDay()];

  const getWeatherGradient = () => {
    switch (weather.weather) {
      case 'sunny':
        return 'linear-gradient(135deg, #FFD93D 0%, #FFE066 50%, #FFF9E6 100%)';
      case 'cloudy':
        return 'linear-gradient(135deg, #7B9EB8 0%, #B8D4E3 50%, #E8F4F8 100%)';
      case 'rainy':
        return 'linear-gradient(135deg, #4A90A4 0%, #7FC8DC 50%, #A8D8EA 100%)';
      default:
        return 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
    }
  };

  const getWeatherIcon = () => {
    switch (weather.weather) {
      case 'sunny':
        return '☀️';
      case 'cloudy':
        return '☁️';
      case 'rainy':
        return '🌧️';
      default:
        return '🌤️';
    }
  };

  const getWeatherName = () => {
    switch (weather.weather) {
      case 'sunny':
        return '晴天';
      case 'cloudy':
        return '多云';
      case 'rainy':
        return '雨天';
      default:
        return '未知';
    }
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0, 0, 0, 0.75)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      backdropFilter: 'blur(12px)',
      animation: 'fadeIn 0.3s ease'
    }} onClick={onClose}>
      <div style={{
        background: 'linear-gradient(145deg, rgba(25,25,45,0.98) 0%, rgba(35,35,55,0.98) 100%)',
        borderRadius: '32px',
        padding: '0',
        maxWidth: '500px',
        width: '92%',
        boxShadow: '0 40px 100px rgba(0, 0, 0, 0.6), 0 0 60px rgba(102,126,234,0.15)',
        position: 'relative',
        overflow: 'hidden',
        border: '1px solid rgba(255,255,255,0.08)'
      }} onClick={(e) => e.stopPropagation()}>

        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '180px',
          background: getWeatherGradient(),
          opacity: 0.15,
          borderRadius: '32px 32px 0 0'
        }} />

        <button style={{
          position: 'absolute',
          top: '20px',
          right: '20px',
          width: '44px',
          height: '44px',
          borderRadius: '50%',
          border: 'none',
          background: 'rgba(255,255,255,0.1)',
          backdropFilter: 'blur(10px)',
          cursor: 'pointer',
          fontSize: '20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'all 0.3s ease',
          color: 'rgba(255,255,255,0.8)',
          zIndex: 10
        }} onClick={onClose}>
          ✕
        </button>

        <div style={{
          textAlign: 'center',
          padding: '40px 40px 30px',
          position: 'relative'
        }}>
          <div style={{
            fontSize: '80px',
            marginBottom: '16px',
            filter: 'drop-shadow(0 8px 20px rgba(0,0,0,0.3))'
          }}>
            {getWeatherIcon()}
          </div>
          <div style={{
            fontSize: '28px',
            fontWeight: '700',
            color: '#fff',
            marginBottom: '8px',
            textShadow: '0 2px 10px rgba(0,0,0,0.3)'
          }}>
            {getWeatherName()}
          </div>
          <div style={{
            fontSize: '15px',
            color: 'rgba(255,255,255,0.6)',
            fontWeight: '500'
          }}>
            {date} · {weekDay}
          </div>
        </div>

        <div style={{
          background: 'rgba(255,255,255,0.05)',
          margin: '0 30px',
          borderRadius: '24px',
          padding: '30px',
          marginBottom: '24px',
          border: '1px solid rgba(255,255,255,0.08)'
        }}>
          <div style={{
            fontSize: '72px',
            fontWeight: '200',
            color: '#fff',
            textAlign: 'center',
            marginBottom: '8px',
            letterSpacing: '-3px'
          }}>
            {weather.tempLow}°/{weather.tempHigh}°
          </div>
          <div style={{
            fontSize: '13px',
            color: 'rgba(255,255,255,0.5)',
            textAlign: 'center',
            fontWeight: '500'
          }}>
            最低温度 · 最高温度
          </div>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '12px',
          padding: '0 30px 30px'
        }}>
          <div style={{
            background: 'rgba(255,255,255,0.05)',
            borderRadius: '20px',
            padding: '22px 18px',
            textAlign: 'center',
            border: '1px solid rgba(255,255,255,0.06)'
          }}>
            <div style={{ fontSize: '32px', marginBottom: '10px' }}>🌡️</div>
            <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)', marginBottom: '6px', fontWeight: '500' }}>当前温度</div>
            <div style={{ fontSize: '24px', fontWeight: '700', color: '#fff' }}>
              {weather.temperature}°C
            </div>
          </div>

          <div style={{
            background: 'rgba(255,255,255,0.05)',
            borderRadius: '20px',
            padding: '22px 18px',
            textAlign: 'center',
            border: '1px solid rgba(255,255,255,0.06)'
          }}>
            <div style={{ fontSize: '32px', marginBottom: '10px' }}>💧</div>
            <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)', marginBottom: '6px', fontWeight: '500' }}>降水概率</div>
            <div style={{ fontSize: '24px', fontWeight: '700', color: '#fff' }}>
              {weather.rainProb}%
            </div>
          </div>

          <div style={{
            background: 'rgba(255,255,255,0.05)',
            borderRadius: '20px',
            padding: '22px 18px',
            textAlign: 'center',
            border: '1px solid rgba(255,255,255,0.06)'
          }}>
            <div style={{ fontSize: '32px', marginBottom: '10px' }}>💨</div>
            <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)', marginBottom: '6px', fontWeight: '500' }}>风力风向</div>
            <div style={{ fontSize: '20px', fontWeight: '700', color: '#fff' }}>
              {weather.windDirection}风
            </div>
            <div style={{ fontSize: '14px', fontWeight: '500', color: 'rgba(255,255,255,0.6)', marginTop: '4px' }}>
              {weather.windSpeed} km/h
            </div>
          </div>

          <div style={{
            background: 'rgba(255,255,255,0.05)',
            borderRadius: '20px',
            padding: '22px 18px',
            textAlign: 'center',
            border: '1px solid rgba(255,255,255,0.06)'
          }}>
            <div style={{ fontSize: '32px', marginBottom: '10px' }}>💦</div>
            <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)', marginBottom: '6px', fontWeight: '500' }}>相对湿度</div>
            <div style={{ fontSize: '24px', fontWeight: '700', color: '#fff' }}>
              {weather.humidity}%
            </div>
          </div>
        </div>

        <div style={{
          padding: '0 30px 30px',
          textAlign: 'center'
        }}>
          <div style={{
            fontSize: '12px',
            color: 'rgba(255,255,255,0.4)',
            fontWeight: '500'
          }}>
            💡 点击任意位置关闭弹窗
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherModal;
