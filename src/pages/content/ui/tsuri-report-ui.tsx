import { createRoot } from 'react-dom/client';

const App = () => {
  const buttonStyle = {
    backgroundColor: "#abedd8",
    border: "none",
    padding: "8px",
    borderRadius: "8px"
  };
  return (
    <a style={buttonStyle}>PUSH！</a>
  );
};

const container = document.getElementById('tsuri-report-ui-container');
if (container) {
  createRoot(container).render(<App />);
}