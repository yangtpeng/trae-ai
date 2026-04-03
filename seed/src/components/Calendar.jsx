import React, { useState, useEffect } from 'react';
import Scene from './3d/Scene';
import CalendarGrid from './3d/CalendarGrid';
import { weatherData } from '../utils/weatherData';
import { getCurrentDate, generateCalendarDays } from '../utils/dateUtils';
import WeatherModal from './WeatherModal';

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(getCurrentDate());
  const [selectedDate, setSelectedDate] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [calendarDays, setCalendarDays] = useState([]);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    setCalendarDays(generateCalendarDays(year, month));

    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleDateClick = (date, position) => {
    setSelectedDate(date);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setSelectedDate(null);
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString('zh-CN', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const weekDay = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'][date.getDay()];
    return `${year}年${month}月${day}日 ${weekDay}`;
  };

  return (
    <div style={{ 
      width: '100%', 
      height: '100vh', 
      position: 'relative', 
      overflow: 'hidden', 
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' 
    }}>
      {/* 背景装饰 */}
      <div style={styles.backgroundOverlay} />
      
      {/* 3D场景 */}
      <Scene>
        <CalendarGrid
          days={calendarDays}
          weatherData={weatherData}
          currentDate={currentDate}
          onDateClick={handleDateClick}
        />
      </Scene>

      {/* UI覆盖层 - 顶部信息栏 */}
      <div style={styles.topBar}>
        <div style={styles.logoSection}>
          <div style={styles.logoIcon}>🌤️</div>
          <div style={styles.logoText}>3D天气日历</div>
        </div>
        <div style={styles.dateTimeSection}>
          <div style={styles.currentDate}>{formatDate(currentTime)}</div>
          <div style={styles.currentTime}>{formatTime(currentTime)}</div>
        </div>
      </div>

      {/* UI覆盖层 - 操作指南 */}
      <div style={styles.guidePanel}>
        <div style={styles.guideHeader}>
          <span style={styles.guideIcon}>🎮</span>
          <span style={styles.guideTitle}>操作指南</span>
        </div>
        <div style={styles.guideContent}>
          <div style={styles.guideItem}>
            <div style={styles.guideItemIcon}>🖱️</div>
            <div style={styles.guideItemText}>
              <div style={styles.guideItemTitle}>旋转视角</div>
              <div style={styles.guideItemDesc}>左键拖拽</div>
            </div>
          </div>
          <div style={styles.guideItem}>
            <div style={styles.guideItemIcon}>🔍</div>
            <div style={styles.guideItemText}>
              <div style={styles.guideItemTitle}>缩放场景</div>
              <div style={styles.guideItemDesc}>滚轮滚动</div>
            </div>
          </div>
          <div style={styles.guideItem}>
            <div style={styles.guideItemIcon}>👆</div>
            <div style={styles.guideItemText}>
              <div style={styles.guideItemTitle}>查看详情</div>
              <div style={styles.guideItemDesc}>点击日期</div>
            </div>
          </div>
          <div style={styles.guideItem}>
            <div style={styles.guideItemIcon}>✋</div>
            <div style={styles.guideItemText}>
              <div style={styles.guideItemTitle}>平移视图</div>
              <div style={styles.guideItemDesc}>右键拖拽</div>
            </div>
          </div>
        </div>
      </div>

      {/* UI覆盖层 - 图例 */}
      <div style={styles.legendPanel}>
        <div style={styles.legendHeader}>
          <span style={styles.legendIcon}>🌈</span>
          <span style={styles.legendTitle}>天气图例</span>
        </div>
        <div style={styles.legendContent}>
          <div style={styles.legendItem}>
            <div style={{...styles.legendColorBox, background: 'linear-gradient(135deg, #FFE066, #FFD93D)'}}>
              <span style={styles.legendEmoji}>☀️</span>
            </div>
            <div style={styles.legendInfo}>
              <div style={styles.legendName}>晴天</div>
              <div style={styles.legendDesc}>阳光明媚</div>
            </div>
          </div>
          <div style={styles.legendItem}>
            <div style={{...styles.legendColorBox, background: 'linear-gradient(135deg, #E8F4F8, #B8D4E3)'}}>
              <span style={styles.legendEmoji}>☁️</span>
            </div>
            <div style={styles.legendInfo}>
              <div style={styles.legendName}>多云</div>
              <div style={styles.legendDesc}>云层较多</div>
            </div>
          </div>
          <div style={styles.legendItem}>
            <div style={{...styles.legendColorBox, background: 'linear-gradient(135deg, #E0F7FA, #A8D8EA)'}}>
              <span style={styles.legendEmoji}>🌧️</span>
            </div>
            <div style={styles.legendInfo}>
              <div style={styles.legendName}>雨天</div>
              <div style={styles.legendDesc}>有降雨</div>
            </div>
          </div>
        </div>
      </div>

      {/* 底部信息 */}
      <div style={styles.bottomBar}>
        <div style={styles.bottomText}>💡 提示：当前日期以红色角标标记，悬停可预览</div>
      </div>

      {/* 弹窗 */}
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

const styles = {
  backgroundOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'radial-gradient(ellipse at top, rgba(255,255,255,0.1) 0%, transparent 50%)',
    pointerEvents: 'none',
    zIndex: 1
  },
  topBar: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    padding: '24px 40px',
    background: 'linear-gradient(180deg, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0) 100%)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    pointerEvents: 'none',
    zIndex: 100
  },
  logoSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
  },
  logoIcon: {
    fontSize: '36px',
    filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))'
  },
  logoText: {
    fontSize: '24px',
    fontWeight: '700',
    color: '#fff',
    textShadow: '0 2px 8px rgba(0,0,0,0.4)',
    letterSpacing: '2px'
  },
  dateTimeSection: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    background: 'rgba(255,255,255,0.15)',
    backdropFilter: 'blur(10px)',
    padding: '16px 24px',
    borderRadius: '16px',
    border: '1px solid rgba(255,255,255,0.2)'
  },
  currentDate: {
    fontSize: '14px',
    color: 'rgba(255,255,255,0.8)',
    fontWeight: '500',
    marginBottom: '4px',
    letterSpacing: '1px'
  },
  currentTime: {
    fontSize: '28px',
    color: '#fff',
    fontWeight: '300',
    fontFamily: '"SF Mono", Monaco, monospace',
    letterSpacing: '2px'
  },
  guidePanel: {
    position: 'absolute',
    top: '120px',
    left: '24px',
    background: 'rgba(255, 255, 255, 0.95)',
    padding: '0',
    borderRadius: '20px',
    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.2), 0 0 0 1px rgba(255,255,255,0.5)',
    backdropFilter: 'blur(20px)',
    zIndex: 100,
    minWidth: '200px',
    overflow: 'hidden'
  },
  guideHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '20px 20px 16px',
    borderBottom: '2px solid #F0F0F0',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
  },
  guideIcon: {
    fontSize: '20px'
  },
  guideTitle: {
    fontSize: '16px',
    fontWeight: '700',
    color: '#fff'
  },
  guideContent: {
    padding: '16px 20px'
  },
  guideItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '14px',
    marginBottom: '16px',
    padding: '12px',
    borderRadius: '12px',
    background: 'rgba(102, 126, 234, 0.05)'
  },
  guideItemIcon: {
    fontSize: '24px',
    width: '40px',
    height: '40px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)'
  },
  guideItemText: {
    flex: 1
  },
  guideItemTitle: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#333',
    marginBottom: '2px'
  },
  guideItemDesc: {
    fontSize: '12px',
    color: '#888'
  },
  legendPanel: {
    position: 'absolute',
    bottom: '80px',
    right: '24px',
    background: 'rgba(255, 255, 255, 0.95)',
    padding: '0',
    borderRadius: '20px',
    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.2), 0 0 0 1px rgba(255,255,255,0.5)',
    backdropFilter: 'blur(20px)',
    zIndex: 100,
    minWidth: '180px',
    overflow: 'hidden'
  },
  legendHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '20px 20px 16px',
    borderBottom: '2px solid #F0F0F0',
    background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
  },
  legendIcon: {
    fontSize: '20px'
  },
  legendTitle: {
    fontSize: '16px',
    fontWeight: '700',
    color: '#fff'
  },
  legendContent: {
    padding: '16px 20px'
  },
  legendItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '14px',
    marginBottom: '14px',
    padding: '10px',
    borderRadius: '12px',
    background: 'rgba(0,0,0,0.02)'
  },
  legendColorBox: {
    width: '44px',
    height: '44px',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
  },
  legendEmoji: {
    fontSize: '24px'
  },
  legendInfo: {
    flex: 1
  },
  legendName: {
    fontSize: '15px',
    fontWeight: '600',
    color: '#333',
    marginBottom: '2px'
  },
  legendDesc: {
    fontSize: '12px',
    color: '#888'
  },
  bottomBar: {
    position: 'absolute',
    bottom: '24px',
    left: '50%',
    transform: 'translateX(-50%)',
    background: 'rgba(0,0,0,0.4)',
    backdropFilter: 'blur(10px)',
    padding: '12px 24px',
    borderRadius: '30px',
    zIndex: 100
  },
  bottomText: {
    fontSize: '13px',
    color: 'rgba(255,255,255,0.9)',
    fontWeight: '500'
  }
};

export default Calendar;