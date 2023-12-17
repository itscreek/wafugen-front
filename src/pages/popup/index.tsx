import { useEffect } from 'react';
import { useRef } from 'react';
import { useState } from 'react';
import { createRoot } from 'react-dom/client';

const PlayGround: React.FC = () => {
  return (
    <div style={{display: "flex", width: "100px", height: '100px', background: "gray"}}>

    </div>
  )
}

const domNode = document.getElementById('sample-react-component');
const root = createRoot(domNode);
root.render(<PlayGround />);

