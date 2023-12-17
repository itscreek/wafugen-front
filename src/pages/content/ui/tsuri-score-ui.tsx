import React from 'react';
import { createRoot } from 'react-dom/client';

const App = () => {
  return (
    <div>
      <div className="speedometer">Tsuri Score!</div>
    </div>
  );
};

const container = document.getElementById('tsuri-score-ui-container');
if (container) {
  createRoot(container).render(<App />);
}