import React, { useState, useEffect } from 'react';
import './styles.css';

interface SpeedometerProps {
  targetValue: number;
  size: number;
}

const Speedometer: React.FC<SpeedometerProps> = ({ targetValue, size }) => {
  const [value, setValue] = useState(0);
  //const maxDegree = 360;

  useEffect(() => {
    const duration = 1000;
    const stepTime = 20;
    const totalSteps = duration / stepTime;
    const stepValue = targetValue / totalSteps;

    let currentStep = 0;

    const interval = setInterval(() => {
      currentStep++;
      setValue((prevValue) => {
        const newValue = prevValue + stepValue;
        if (currentStep >= totalSteps) {
          clearInterval(interval);
          return targetValue;
        }
        return newValue;
      });
    }, stepTime);

    return () => clearInterval(interval);
  }, [targetValue]);

  const radius = size / 4; // 円の半径をサイズの1/4に設定
  const strokeDasharray = 2 * Math.PI * radius; // 円の周長を計算
  const strokeDashoffset = strokeDasharray - (value / 100) * strokeDasharray;
  
  const getColor = (value: number) => {
    if (value <= 25) return 'blue'; // 安全な動画
    if (value <= 50) return 'green'; // 比較的安全
    if (value <= 75) return 'orange'; // 疑わしい
    return 'red'; // 危険
  };

  return (
    <div className="speedometer">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <circle cx={size / 2} cy={size / 2} r={radius} className="meter-track" />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          className="meter-bar"
          stroke={getColor(value)}
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
        />
      </svg>
      <div className="value">{Math.round(value)}</div>
    </div>
  );
};

export default Speedometer;