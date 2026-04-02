import React, { useState, useEffect } from 'react';

const CalendarUI = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const weekDays = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
    const weekDay = weekDays[date.getDay()];
    return `${year}年${month}月${day}日 ${weekDay}`;
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString('zh-CN', { hour12: false });
  };

  return (
    <div style={styles.container}>
      {/* 顶部信息栏 */}
      <div style={styles.header}>
        <div style={styles.dateSection}>
          <div style={styles.dateText}>{formatDate(currentTime)}</div>
          <div style={styles.timeText}>{formatTime(currentTime)}</div>
        </div>
        <div style={styles.titleSection}>
          <h1 style={styles.title}>3D 天气日历</h1>
          <div style={styles.subtitle}>Weather Calendar</div>
        </div>
      </div>

      {/* 左侧引导提示 */}
      <div style={styles.guideLeft}>
        <div style={styles.guideCard}>
          <div style={styles.guideTitle}>🖱️ 操作指南</div>
          <div style={styles.guideItem}>
            <span style={styles.guideIcon}>↻</span>
            <span>拖动旋转视角</span>
          </div>
          <div style={styles.guideItem}>
            <span style={styles.guideIcon}>🔍</span>
            <span>滚轮缩放场景</span>
          </div>
          <div style={styles.guideItem}>
            <span style={styles.guideIcon}>👆</span>
            <span>点击日期查看详情</span>
          </div>
        </div>
      </div>

      {/* 底部图例 */}
      <div style={styles.legend}>
        <div style={styles.legendItem}>
          <div style={{...styles.legendIcon, background: '#FFD700'}}>☀️</div>
          <span style={styles.legendText}>晴天</span>
        </div>
        <div style={styles.legendItem}>
          <div style={{...styles.legendIcon, background: '#E0E0E0'}}>☁️</div>
          <span style={styles.legendText}>多云</span>
        </div>
        <div style={styles.legendItem}>
          <div style={{...styles.legendIcon, background: '#4169E1'}}>🌧️</div>
          <span style={styles.legendText}>雨天</span>
        </div>
        <div style={styles.legendItem}>
          <div style={{...styles.legendIcon, background: '#FFD700', border: '3px solid #FF6B6B'}}>📅</div>
          <span style={styles.legendText}>今天</span>
        </div>
      </div>

      {/* 右下角提示 */}
      <div style={styles.cornerTip}>
        <div style={styles.tipContent}>
          <span style={styles.tipIcon}>💡</span>
          <span>提示：悬停查看天气，点击获取详细信息</span>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    pointerEvents: 'none',
    zIndex: 100,
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: '20px 30px',
    background: 'linear-gradient(180deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0) 100%)',
  },
  dateSection: {
    color: '#fff',
    textShadow: '0 2px 4px rgba(0,0,0,0.3)',
  },
  dateText: {
    fontSize: '18px',
    fontWeight: 500,
    marginBottom: '5px',
    letterSpacing: '1px',
  },
  timeText: {
    fontSize: '32px',
    fontWeight: 700,
    fontFamily: 'monospace',
    letterSpacing: '2px',
  },
  titleSection: {
    textAlign: 'right',
    color: '#fff',
    textShadow: '0 2px 4px rgba(0,0,0,0.3)',
  },
  title: {
    margin: 0,
    fontSize: '28px',
    fontWeight: 700,
    letterSpacing: '2px',
  },
  subtitle: {
    fontSize: '14px',
    opacity: 0.8,
    marginTop: '5px',
    letterSpacing: '3px',
    textTransform: 'uppercase',
  },
  guideLeft: {
    position: 'absolute',
    left: '20px',
    top: '50%',
    transform: 'translateY(-50%)',
  },
  guideCard: {
    background: 'rgba(255,255,255,0.95)',
    padding: '20px',
    borderRadius: '12px',
    boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
    backdropFilter: 'blur(10px)',
    minWidth: '180px',
  },
  guideTitle: {
    fontSize: '16px',
    fontWeight: 700,
    marginBottom: '15px',
    color: '#333',
    borderBottom: '2px solid #4A90E2',
    paddingBottom: '8px',
  },
  guideItem: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '12px',
    fontSize: '14px',
    color: '#555',
  },
  guideIcon: {
    marginRight: '10px',
    fontSize: '18px',
    width: '24px',
    textAlign: 'center',
  },
  legend: {
    position: 'absolute',
    bottom: '30px',
    left: '50%',
    transform: 'translateX(-50%)',
    display: 'flex',
    gap: '20px',
    background: 'rgba(255,255,255,0.95)',
    padding: '15px 25px',
    borderRadius: '30px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
    backdropFilter: 'blur(10px)',
  },
  legendItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  legendIcon: {
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '16px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
  },
  legendText: {
    fontSize: '14px',
    fontWeight: 500,
    color: '#333',
  },
  cornerTip: {
    position: 'absolute',
    bottom: '30px',
    right: '30px',
    background: 'rgba(74, 144, 226, 0.95)',
    padding: '12px 20px',
    borderRadius: '8px',
    boxShadow: '0 4px 15px rgba(74, 144, 226, 0.4)',
  },
  tipContent: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    color: '#fff',
    fontSize: '13px',
    fontWeight: 500,
  },
  tipIcon: {
    fontSize: '16px',
  },
};

export default CalendarUI;