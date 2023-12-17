import { createRoot } from 'react-dom/client';
import { Logo } from '@pages/content/ui/logo'; // Logo.tsxからLogoコンポーネントをインポート

const App = () => {
  const logoSize = 30; // Logoのサイズを設定
  return <Logo size={logoSize} />;
};

const container = document.getElementById('tsuri-report-ui-container');
if (container) {
  createRoot(container).render(<App />);
}