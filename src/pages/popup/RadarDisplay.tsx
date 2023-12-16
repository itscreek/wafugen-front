import React, { useState, useEffect } from 'react';

interface RadarDisplayProps {
  maxCount: number;  // 最大表示点数
  size: number;      // 円の大きさ（ピクセル単位）
  interval: number;  // 点を追加する間隔（ミリ秒）
}

interface Dot {
  x: number;
  y: number;
  start: number;  // アニメーション開始時間
}

const RadarDisplay: React.FC<RadarDisplayProps> = ({ maxCount, size, interval }) => {
  const [dots, setDots] = useState<Dot[]>([]);

  const radius = size / 2;

  useEffect(() => {
    if (dots.length < maxCount) {
      const timer = setTimeout(() => {
        const angle = Math.random() * 2 * Math.PI;
        const distance = Math.random() * radius;
        const x = radius + distance * Math.cos(angle);
        const y = radius + distance * Math.sin(angle);
        const start = dots.length * interval;  // 各点のアニメーション開始時間を設定

        setDots([...dots, { x, y, start }]);
      }, interval);

      return () => clearTimeout(timer);
    }
  }, [dots, maxCount, interval]);

  const containerStyle: React.CSSProperties = {
    position: 'relative',
    width: `${size}px`,
    height: `${size}px',
    borderRadius: '50%',
    border: '1px solid black',
  };

  return (
    <div style={containerStyle}>
      {dots.map((dot, i) => (
        <div
          className="dot"
          style={{
            left: `${dot.x}px`,
            top: `${dot.y}px`,
            animation: `ripple ${maxCount * interval}ms linear ${dot.start}ms infinite`
          }}
          key={i}
        />
      ))}
    </div>
  );
};

export default RadarDisplay;

/*
import React, { useState, useEffect } from 'react';

interface RadarDisplayProps {
  maxCount: number;  // 最大表示点数
  size: number;      // 円の大きさ（ピクセル単位）
  interval: number;  // 点を追加する間隔（ミリ秒）
}

interface Dot {
  x: number;
  y: number;
}

const RadarDisplay: React.FC<RadarDisplayProps> = ({ maxCount, size, interval }) => {
  const [dots, setDots] = useState<Dot[]>([]); // 点の位置の状態

  // 半径を計算
  const radius = size / 2;

  useEffect(() => {
    if (dots.length < maxCount) {
      const timer = setTimeout(() => {
        // 新しい点の位置を生成
        const angle = Math.random() * 2 * Math.PI;
        const distance = Math.random() * radius;
        const x = radius + distance * Math.cos(angle);
        const y = radius + distance * Math.sin(angle);

        // 新しい点を追加
        setDots([...dots, { x, y }]);
      }, interval);

      return () => clearTimeout(timer);
    }
  }, [dots, maxCount, interval]);

  const containerStyle: React.CSSProperties = {
    position: 'relative',
    width: `${size}px`,
    height: `${size}px`,  // ここを修正
    borderRadius: '50%',
    border: '1px solid black',
  };

  return (
    <div style={containerStyle}>
      {dots.map((dot, i) => (
        <div
          className="dot"
          style={{ left: `${dot.x}px`, top: `${dot.y}px` }}
          key={i}
        />
      ))}
    </div>
  );
};

export default RadarDisplay;
*/

/*
import React, { useState, useEffect } from 'react';

interface RadarDisplayProps {
  maxCount: number;  // 最大表示点数
  size: number;      // 円の大きさ（ピクセル単位）
  interval: number;  // 点を追加する間隔（ミリ秒）
}

const RadarDisplay: React.FC<RadarDisplayProps> = ({ maxCount, size, interval }) => {
  const [count, setCount] = useState(0);  // 現在の点の数

  // 半径を計算（円の直径から半径を導出）
  const radius = size / 2;

  useEffect(() => {
    // maxCount に到達するまで点の数を増やす
    if (count < maxCount) {
      const timer = setTimeout(() => setCount(count + 1), interval);
      return () => clearTimeout(timer);
    }
  }, [count, maxCount, interval]);

  const dots = Array.from({ length: count }, (_, i) => {
    const angle = Math.random() * 2 * Math.PI;
    const distance = Math.random() * radius;
    const x = radius + distance * Math.cos(angle);
    const y = radius + distance * Math.sin(angle);

    return (
      <div
        className="dot"
        style={{ left: `${x}px`, top: `${y}px` }}
        key={i}
      />
    );
  });

  const containerStyle: React.CSSProperties = {
    position: 'relative',
    width: `${size}px`,
    height: `${size}px`,
    borderRadius: '50%',
    border: '1px solid black',
  };

  return <div style={containerStyle}>{dots}</div>;
};

export default RadarDisplay;
*/
/*
import React from 'react';

interface RadarDisplayProps {
  count: number;  // 表示する点の数
  size: number;   // 円の大きさ（ピクセル単位）
}

const RadarDisplay: React.FC<RadarDisplayProps> = ({ count, size }) => {
  const dots = [];

  // 半径を計算（円の直径から半径を導出）
  const radius = size / 2;

  for (let i = 0; i < count; i++) {
    // 角度（ラジアン単位）と中心からの距離をランダムに生成
    const angle = Math.random() * 2 * Math.PI; // 0から2πの間
    const distance = Math.random() * radius;   // 0から半径の間

    // 極座標からデカルト座標（X, Y）へ変換
    const x = radius + distance * Math.cos(angle); // X座標
    const y = radius + distance * Math.sin(angle); // Y座標

    dots.push(
      <div
        className="dot"
        style={{ left: `${x}px`, top: `${y}px` }}
        key={i}
      />
    );
  }

  const containerStyle: React.CSSProperties = {
    position: 'relative',
    width: `${size}px`,
    height: `${size}px`,
    borderRadius: '50%',
    border: '1px solid black',
  };

  return <div style={containerStyle}>{dots}</div>;
};

export default RadarDisplay;
*/

/*
import React from 'react';

interface RadarDisplayProps {
  count: number;  // 表示する点の数
  size: number;   // 円の大きさ（ピクセル単位）
}

const RadarDisplay: React.FC<RadarDisplayProps> = ({ count, size }) => {
  const dots = [];

  for (let i = 0; i < count; i++) {
    const x = Math.random() * 100;
    const y = Math.random() * 100;
    dots.push(<div className="dot" style={{ left: `${x}%`, top: `${y}%` }} key={i} />);
  }

  const containerStyle: React.CSSProperties = {
    position: 'relative', // CSSProperties 型に適合する値
    width: `${size}px`,
    height: `${size}px`,
    borderRadius: '50%',
    border: '1px solid black',
  };

  return <div style={containerStyle}>{dots}</div>;
};

export default RadarDisplay;
*/

/*
import React from 'react';

interface RadarDisplayProps {
  count: number; // 表示する点の数
  size: number;
}

const RadarDisplay: React.FC<RadarDisplayProps> = ({ count, size }) => {
  const dots = [];

  for (let i = 0; i < count; i++) {
    const x = Math.random() * 100;
    const y = Math.random() * 100;
    dots.push(<div className="dot" style={{ left: `${x}%`, top: `${y}%` }} key={i} />);
  }


  const containerStyle = {
    position: 'relative',
    width: `${size}px`,
    height: `${size}px`,
    borderRadius: '50%',
    border: '1px solid black', // 円の境界を明確にするためのボーダー（必要に応じて調整）
  };

  return <div style={containerStyle}>{dots}</div>;
};

export default RadarDisplay;

*/