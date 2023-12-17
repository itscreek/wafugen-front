import { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import SpeedMeter from '@pages/content/ui/speed-meter';

const App = () => {
  // const [ videoId, setVideoId ] = useState(''); 
  const [state, setState] = useState({videoId: undefined, tsuriScore: undefined, isLoading: true});
  useEffect (() => {
    document.addEventListener('mouseover', event => {
      const target = event.target as HTMLElement;
    
      const ytdRichGridMediaElement = target.closest('ytd-rich-grid-media') as HTMLElement;
      // when Youtube preview starts
      if (ytdRichGridMediaElement) {
        const thumbnailAnchor = ytdRichGridMediaElement.querySelector('a#thumbnail') as HTMLAnchorElement;
        const videoId = thumbnailAnchor.href.split('v=')[1];
        setState({...state, videoId: videoId ,isLoading: true});
      }
    });

    document.addEventListener('tsuriScoreAvailable', event => {
      const { detail } = event as CustomEvent;
      console.log(detail);
      setState({...state, tsuriScore: detail.tsuriScore, isLoading: false});
    });
  },[]);
  return (
    <div>
      <SpeedMeter tsuriScore={state.tsuriScore} isLoading={state.isLoading} />
    </div>
  );
};

const container = document.getElementById('tsuri-score-ui-container');
if (container) {
  createRoot(container).render(<App />);
}