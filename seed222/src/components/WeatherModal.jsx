import React from 'react';

const WeatherModal = ({ date, weatherData, onClose }) => {
  const weather = weatherData.find(item => item.date === date);

  if (!weather) {
    return null;
  }

  const weekDay = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'][new Date(date).getDay()];

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0, 0, 0, 0.6)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      backdropFilter: 'blur(8px)'
    }} onClick={onClose}>
      <div style={{
        background: 'linear-gradient(180deg, #fff 0%, #fafafa 100%)',
        borderRadius: '28px',
        padding: '36px',
        maxWidth: '480px',
        width: '92%',
        boxShadow: '0 30px 80px rgba(0, 0, 0, 0.35)',
        position: 'relative',
        overflow: 'hidden'
      }} onClick={(e) => e.stopPropagation()}>
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '6px',
          background: weather.weather === 'sunny' ? 'linear-gradient(90deg, #FFD93D, #FFE066, #FFF9E6)' :
            weather.weather === 'cloudy' ? 'linear-gradient(90deg, #B8D4E3, #E8F4F8, #F0F8FF)' :
              'linear-gradient(90deg, #A8D8EA, #E0F7FA, #F0FCFF)'
        }} />

        <button style={{
          position: 'absolute',
          top: '24px',
          right: '24px',
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          border: 'none',
          background: 'linear-gradient(135deg, #f0f0f0 0%, #e8e8e8 100%)',
          cursor: 'pointer',
          fontSize: '22px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'all 0.3s ease',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          color: '#666'
        }} onClick={onClose}>
          ✕
        </button>

        <div style={{ textAlign: 'center', marginBottom: '32px', paddingTop: '8px' }}>
          <div style={{ fontSize: '64px', marginBottom: '16px', filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.1))' }}>
            {weather.weather === 'sunny' ? '☀️' : weather.weather === 'cloudy' ? '☁️' : '🌧️'}
          </div>
          <div style={{
            fontSize: '22px',
            fontWeight: '700',
            color: '#222',
            marginBottom: '6px'
          }}>
            {weather.weather === 'sunny' ? '晴天' : weather.weather === 'cloudy' ? '多云' : '雨天'}
          </div>
        </div>

        <div style={{
          background: weather.weather === 'sunny' ? 'linear-gradient(135deg, #FFE066 0%, #FFF9E6 50%, #FFFAF0 100%)' :
            weather.weather === 'cloudy' ? 'linear-gradient(135deg, #B8D4E3 0%, #E8F4F8 50%, #F0F8FF 100%)' :
              'linear-gradient(135deg, #A8D8EA 0%, #E0F7FA 50%, #F0FCFF 100%)',
          borderRadius: '20px',
          padding: '28px 24px',
          marginBottom: '28px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
        }}>
          <div style={{
            fontSize: '64px',
            fontWeight: '200',
            color: '#111',
            textAlign: 'center',
            marginBottom: '8px',
            letterSpacing: '-2px'
          }}>
            {weather.tempLow}°/{weather.tempHigh}°
          </div>
          <div style={{
            fontSize: '13px',
            color: '#666',
            textAlign: 'center',
            marginBottom: '4px'
          }}>
            最低温度 · 最高温度
          </div>
          <div style={{
            fontSize: '20px',
            fontWeight: '700',
            color: '#222',
            textAlign: 'center',
            marginTop: '12px'
          }}>
            {date}
          </div>
          <div style={{
            fontSize: '15px',
            color: '#555',
            textAlign: 'center',
            marginTop: '6px',
            fontWeight: '500'
          }}>
            {weekDay}
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '14px' }}>
          <div style={{
            background: 'linear-gradient(135deg, #f8f9fa 0%, #f1f3f5 100%)',
            borderRadius: '16px',
            padding: '20px 16px',
            textAlign: 'center',
            boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
            border: '1px solid rgba(0,0,0,0.04)'
          }}>
            <div style={{ fontSize: '28px', marginBottom: '8px' }}>🌡️</div>
            <div style={{ fontSize: '13px', color: '#888', marginBottom: '4px', fontWeight: '500' }}>当前温度</div>
            <div style={{ fontSize: '20px', fontWeight: '700', color: '#111' }}>
              {weather.temperature}°C
            </div>
          </div>

          <div style={{
            background: 'linear-gradient(135deg, #f8f9fa 0%, #f1f3f5 100%)',
            borderRadius: '16px',
            padding: '20px 16px',
            textAlign: 'center',
            boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
            border: '1px solid rgba(0,0,0,0.04)'
          }}>
            <div style={{ fontSize: '28px', marginBottom: '8px' }}>💧</div>
            <div style={{ fontSize: '13px', color: '#888', marginBottom: '4px', fontWeight: '500' }}>降水概率</div>
            <div style={{ fontSize: '20px', fontWeight: '700', color: '#111' }}>
              {weather.rainProb}%
            </div>
          </div>

          <div style={{
            background: 'linear-gradient(135deg, #f8f9fa 0%, #f1f3f5 100%)',
            borderRadius: '16px',
            padding: '20px 16px',
            textAlign: 'center',
            boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
            border: '1px solid rgba(0,0,0,0.04)'
          }}>
            <div style={{ fontSize: '28px', marginBottom: '8px' }}>💨</div>
            <div style={{ fontSize: '13px', color: '#888', marginBottom: '4px', fontWeight: '500' }}>风力风向</div>
            <div style={{ fontSize: '18px', fontWeight: '700', color: '#111' }}>
              {weather.windDirection}风
            </div>
            <div style={{ fontSize: '14px', fontWeight: '600', color: '#555', marginTop: '4px' }}>
              {weather.windSpeed} km/h
            </div>
          </div>

          <div style={{
            background: 'linear-gradient(135deg, #f8f9fa 0%, #f1f3f5 100%)',
            borderRadius: '16px',
            padding: '20px 16px',
            textAlign: 'center',
            boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
            border: '1px solid rgba(0,0,0,0.04)'
          }}>
            <div style={{ fontSize: '28px', marginBottom: '8px' }}>💦</div>
            <div style={{ fontSize: '13px', color: '#888', marginBottom: '4px', fontWeight: '500' }}>相对湿度</div>
            <div style={{ fontSize: '20px', fontWeight: '700', color: '#111' }}>
              {weather.humidity}%
            </div>
          </div>
        </div>

        <div style={{
          marginTop: '24px',
          paddingTop: '20px',
          borderTop: '1px solid #eee',
          textAlign: 'center'
        }}>
          <div style={{
            fontSize: '12px',
            color: '#999',
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