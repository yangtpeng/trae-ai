import React, { useEffect, useState } from 'react';

const WeatherModal = ({ date, weatherData, onClose }) => {
  const weatherInfo = weatherData.find(item => item.date === date);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    return () => setIsVisible(false);
  }, []);

  if (!weatherInfo) return null;

  const getWeatherDetails = (weather) => {
    switch (weather) {
      case 'sunny':
        return {
          icon: '☀️',
          name: '晴天',
          description: '阳光明媚，适合户外活动',
          color: '#FFD700',
          bgGradient: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
          humidity: '45%',
          windSpeed: '3级',
          uvIndex: '强',
          advice: '注意防晒，多喝水'
        };
      case 'cloudy':
        return {
          icon: '☁️',
          name: '多云',
          description: '云层较多，气温适宜',
          color: '#90A4AE',
          bgGradient: 'linear-gradient(135deg, #B0BEC5 0%, #78909C 100%)',
          humidity: '65%',
          windSpeed: '2级',
          uvIndex: '弱',
          advice: '适合户外运动'
        };
      case 'rainy':
        return {
          icon: '🌧️',
          name: '雨天',
          description: '有降雨，出门请带伞',
          color: '#4FC3F7',
          bgGradient: 'linear-gradient(135deg, #4FC3F7 0%, #29B6F6 100%)',
          humidity: '85%',
          windSpeed: '4级',
          uvIndex: '无',
          advice: '记得带伞，注意路滑'
        };
      default:
        return {
          icon: '🌤️',
          name: '晴间多云',
          description: '天气良好',
          color: '#FFB74D',
          bgGradient: 'linear-gradient(135deg, #FFB74D 0%, #FF8A65 100%)',
          humidity: '55%',
          windSpeed: '2级',
          uvIndex: '中等',
          advice: '适宜出行'
        };
    }
  };

  const details = getWeatherDetails(weatherInfo.weather);

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const weekDays = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
    const weekDay = weekDays[date.getDay()];
    return { year, month, day, weekDay };
  };

  const { year, month, day, weekDay } = formatDate(date);

  return (
    <div
      style={{
        ...styles.overlay,
        opacity: isVisible ? 1 : 0,
      }}
      onClick={onClose}
    >
      <div
        style={{
          ...styles.modal,
          transform: isVisible ? 'scale(1) translateY(0)' : 'scale(0.9) translateY(20px)',
          opacity: isVisible ? 1 : 0,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* 顶部装饰条 */}
        <div style={{ ...styles.headerBar, background: details.bgGradient }} />

        {/* 关闭按钮 */}
        <button style={styles.closeButton} onClick={onClose}>
          <span style={styles.closeIcon}>×</span>
        </button>

        {/* 日期信息 */}
        <div style={styles.dateSection}>
          <div style={styles.dateYearMonth}>{year}年{month}月</div>
          <div style={styles.dateDay}>{day}</div>
          <div style={styles.dateWeekDay}>{weekDay}</div>
        </div>

        {/* 天气主信息 */}
        <div style={{ ...styles.weatherMain, background: details.bgGradient }}>
          <div style={styles.weatherIcon}>{details.icon}</div>
          <div style={styles.weatherName}>{details.name}</div>
          <div style={styles.temperature}>{weatherInfo.temperature}°C</div>
          <div style={styles.weatherDesc}>{details.description}</div>
        </div>

        {/* 详细信息网格 */}
        <div style={styles.detailsGrid}>
          <div style={styles.detailItem}>
            <div style={styles.detailIcon}>💧</div>
            <div style={styles.detailLabel}>湿度</div>
            <div style={styles.detailValue}>{details.humidity}</div>
          </div>
          <div style={styles.detailItem}>
            <div style={styles.detailIcon}>💨</div>
            <div style={styles.detailLabel}>风力</div>
            <div style={styles.detailValue}>{details.windSpeed}</div>
          </div>
          <div style={styles.detailItem}>
            <div style={styles.detailIcon}>☀️</div>
            <div style={styles.detailLabel}>紫外线</div>
            <div style={styles.detailValue}>{details.uvIndex}</div>
          </div>
          <div style={styles.detailItem}>
            <div style={styles.detailIcon}>🌡️</div>
            <div style={styles.detailLabel}>体感</div>
            <div style={styles.detailValue}>{weatherInfo.temperature + 2}°C</div>
          </div>
        </div>

        {/* 建议提示 */}
        <div style={styles.adviceSection}>
          <div style={styles.adviceIcon}>💡</div>
          <div style={styles.adviceText}>{details.advice}</div>
        </div>
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
    backdropFilter: 'blur(8px)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
    transition: 'opacity 0.3s ease',
  },
  modal: {
    backgroundColor: '#ffffff',
    borderRadius: '24px',
    boxShadow: '0 25px 80px rgba(0, 0, 0, 0.3)',
    width: '90%',
    maxWidth: '420px',
    overflow: 'hidden',
    position: 'relative',
    transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
  },
  headerBar: {
    height: '6px',
    width: '100%',
  },
  closeButton: {
    position: 'absolute',
    top: '16px',
    right: '16px',
    width: '36px',
    height: '36px',
    borderRadius: '50%',
    border: 'none',
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.2s ease',
    zIndex: 10,
  },
  closeIcon: {
    fontSize: '24px',
    color: '#666',
    lineHeight: 1,
  },
  dateSection: {
    textAlign: 'center',
    padding: '24px 24px 16px',
    borderBottom: '1px solid #f0f0f0',
  },
  dateYearMonth: {
    fontSize: '14px',
    color: '#999',
    marginBottom: '8px',
    letterSpacing: '1px',
  },
  dateDay: {
    fontSize: '56px',
    fontWeight: '700',
    color: '#333',
    lineHeight: 1,
    marginBottom: '4px',
  },
  dateWeekDay: {
    fontSize: '16px',
    color: '#666',
    fontWeight: '500',
  },
  weatherMain: {
    padding: '32px 24px',
    textAlign: 'center',
    color: '#fff',
  },
  weatherIcon: {
    fontSize: '72px',
    marginBottom: '12px',
    filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.2))',
  },
  weatherName: {
    fontSize: '28px',
    fontWeight: '700',
    marginBottom: '8px',
    textShadow: '0 2px 4px rgba(0,0,0,0.2)',
  },
  temperature: {
    fontSize: '48px',
    fontWeight: '300',
    marginBottom: '8px',
  },
  weatherDesc: {
    fontSize: '14px',
    opacity: 0.9,
  },
  detailsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '16px',
    padding: '24px',
    backgroundColor: '#fafafa',
  },
  detailItem: {
    textAlign: 'center',
  },
  detailIcon: {
    fontSize: '24px',
    marginBottom: '8px',
  },
  detailLabel: {
    fontSize: '12px',
    color: '#999',
    marginBottom: '4px',
  },
  detailValue: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#333',
  },
  adviceSection: {
    display: 'flex',
    alignItems: 'center',
    padding: '20px 24px',
    backgroundColor: '#f5f5f5',
    gap: '12px',
  },
  adviceIcon: {
    fontSize: '24px',
    flexShrink: 0,
  },
  adviceText: {
    fontSize: '14px',
    color: '#666',
    lineHeight: 1.5,
  },
};

export default WeatherModal;