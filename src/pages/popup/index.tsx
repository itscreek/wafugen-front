import React from 'react';
import { createRoot } from 'react-dom/client';
import Speedometer from './Speedometer';
import './styles.css';
import { useEffect } from 'react';
import { promiseHooks } from 'v8';


const App = () => {
  return (
    <div>
      <Speedometer targetValue={89} size={20} /*promise={(async() => {setTimeout(() => {}, 10); return 5;})()}*//> {/* 例として50を指定 */}
    </div>
  );
};

const container = document.getElementById('app-container');
const root = createRoot(container);
root.render(<App />);

/*
const PromiseBar: React.FC = ({promiseScore: Promise<Score>}) => {
    const [isLoading, setLoading] = useState(promiseScore.state == Pending);
    useEffect(() => {
        promiseScore.then(() => {
            setLoading(true);
        });
    }, [])

    if (isLoading) {
        return <div>Aho</div>
    } else {
        return <div>primiseScore.result</div>
    }
}
*/