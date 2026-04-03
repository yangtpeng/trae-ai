import React from 'react';

const WeatherModal = ({ date, weatherData, onClose }) => {
  const weatherInfo = weatherData.find(item => item.date === date);

  if (!weatherInfo) return null;

  const getWeatherDetails = (weather) => {
    switch (weather) {
      case 'sunny':
        return {
          icon: '☀️',
          name: '晴天',
          description: '阳光明媚，适合户外活动',
          color: '#FFD54F',
          bgGradient: 'linear-gradient(135deg, #FFF8E1 0%, #FFECB3 100%)'
        };
      case 'cloudy':
        return {
          icon: '☁️',
          name: '多云',
          description: '云层较多，气温适宜',
          color: '#90A4AE',
          bgGradient: 'linear-gradient(135deg, #ECEFF1 0%, #CFD8DC 100%)'
        };
      case 'rainy':
        return {
          icon: '🌧️',
          name: '雨天',
          description: '有降雨，出门记得带伞',
          color: '#4FC3F7',
          bgGradient: 'linear-gradient(135deg, #E3F2FD 0%, #BBDEFB 100%)'
        };
      default:
        return {
          icon: '🌤️',
          name: '多云',
          description: '天气适宜',
          color: '#90A4AE',
          bgGradient: 'linear-gradient(135deg, #ECEFF1 0%, #CFD8DC 100%)'
        };
    }
  };

  const details = getWeatherDetails(weatherInfo.weather);
  const dateObj = new Date(date);
  const weekDay = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'][dateObj.getDay()];
  const formattedDate = `${dateObj.getFullYear()}年${dateObj.getMonth() + 1}月${dateObj.getDate()}日`;

  const getTemperatureAdvice = (temp) => {
    if (temp >= 25) return '天气炎热，注意防暑降温';
    if (temp >= 20) return '温度舒适，体感宜人';
    if (temp >= 15) return '温度适中，可适当添衣';
    return '温度较低，注意保暖';
  };

  return (
    <div style={styles.overlay} onClick={onClose}>
      <div
        style={{
          ...styles.modal,
          background: details.bgGradient
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* 关闭按钮 */}
        <button style={styles.closeButton} onClick={onClose}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        {/* 日期信息 */}
        <div style={styles.dateSection}>
          <div style={styles.weekDay}>{weekDay}</div>
          <div style={styles.date}>{formattedDate}</div>
        </div>

        {/* 天气图标和名称 */}
        <div style={styles.weatherSection}>
          <div style={styles.weatherIcon}>{details.icon}</div>
          <div style={{ ...styles.weatherName, color: details.color }}>{details.name}</div>
        </div>

        {/* 温度显示 */}
        <div style={styles.temperatureSection}>
          <span style={styles.temperatureValue}>{weatherInfo.temperature}</span>
          <span style={styles.temperatureUnit}>°C</span>
        </div>

        {/* 详细信息 */}
        <div style={styles.detailsSection}>
          <div style={styles.detailItem}>
            <span style={styles.detailIcon}>📝</span>
            <span style={styles.detailText}>{details.description}</span>
          </div>
          <div style={styles.detailItem}>
            <span style={styles.detailIcon}>💡</span>
            <span style={styles.detailText}>{getTemperatureAdvice(weatherInfo.temperature)}</span>
          </div>
        </div>

        {/* 底部装饰 */}
        <div style={{ ...styles.bottomBar, backgroundColor: details.color }} />
      </div>
    </div>
  );
};

const styles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    backdropFilter: 'blur(4px)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
    animation: 'fadeIn 0.3s ease-out'
  },
  modal: {
    position: 'relative',
    borderRadius: '20px',
    padding: '40px 48px',
    textAlign: 'center',
    boxShadow: '0 25px 80px rgba(0, 0, 0, 0.3), 0 10px 30px rgba(0, 0, 0, 0.2)',
    minWidth: '320px',
    maxWidth: '400px',
    animation: 'slideUp 0.4s ease-out',
    overflow: 'hidden'
  },
  closeButton: {
    position: 'absolute',
    top: '16px',
    right: '16px',
    background: 'rgba(255, 255, 255, 0.8)',
    border: 'none',
    borderRadius: '50%',
    width: '36px',
    height: '36px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    color: '#666',
    transition: 'all 0.2s ease',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
  },
  dateSection: {
    marginBottom: '24px'
  },
  weekDay: {
    fontSize: '18px',
    fontWeight: '600',
    color: '#666',
    marginBottom: '4px',
    letterSpacing: '2px'
  },
  date: {
    fontSize: '14px',
    color: '#888'
  },
  weatherSection: {
    marginBottom: '20px'
  },
  weatherIcon: {
    fontSize: '80px',
    marginBottom: '12px',
    filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.1))'
  },
  weatherName: {
    fontSize: '28px',
    fontWeight: '700',
    letterSpacing: '4px'
  },
  temperatureSection: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center',
    marginBottom: '28px',
    padding: '16px 0',
    borderTop: '1px solid rgba(0, 0, 0, 0.08)',
    borderBottom: '1px solid rgba(0, 0, 0, 0.08)'
  },
  temperatureValue: {
    fontSize: '72px',
    fontWeight: '300',
    color: '#333',
    lineHeight: '1'
  },
  temperatureUnit: {
    fontSize: '32px',
    fontWeight: '300',
    color: '#666',
    marginTop: '8px'
  },
  detailsSection: {
    textAlign: 'left',
    padding: '0 8px'
  },
  detailItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '12px',
    padding: '12px 16px',
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    borderRadius: '12px'
  },
  detailIcon: {
    fontSize: '20px'
  },
  detailText: {
    fontSize: '14px',
    color: '#555',
    lineHeight: '1.5'
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '4px'
  }
};

export default WeatherModal;