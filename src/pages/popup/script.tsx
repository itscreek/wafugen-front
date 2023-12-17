// script.tsx
import React from 'react';
import { createRoot } from 'react-dom/client';
import RadarDisplay from './RadarDisplay';

const container = document.getElementById('app-container');
const root = createRoot(container);

root.render(<RadarDisplay maxCount={50} size={200} interval={10} />); // 1秒ごとに点を追加
