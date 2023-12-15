/**
 * DO NOT USE import someModule from '...';
 *
 * @issue-url https://github.com/Jonghakseo/chrome-extension-boilerplate-react-vite/issues/160
 *
 * Chrome extensions don't support modules in content scripts.
 * If you want to use other modules in content scripts, you need to import them via these files.
 *
 */

import { TsuriScoreRequestMessage, TsuriScoreResponseMessage } from '@pages/message';

document.addEventListener('mouseover', event => {
  const target = event.target as HTMLElement;
  if (
    target.tagName !== 'IMG' ||
    target.parentElement.parentElement.tagName !== 'A' ||
    target.parentElement.parentElement.id !== 'thumbnail'
  ) {
    return;
  }
  const thumbnailAnchor = target.parentElement.parentElement as HTMLAnchorElement;
  const videoId = thumbnailAnchor.href.split('v=')[1];

  injectTsuriScore(videoId);
});

const injectTsuriScore = async (videoId: string) => {
  const tsuriScore = await getTsuriScore(videoId);
  console.log(tsuriScore);

  // TODO: injecting UI
};

const getTsuriScore = async (videoId: string): Promise<number> => {
  const request: TsuriScoreRequestMessage = {
    type: 'TsuriScoreRequest',
    video_id: videoId,
  };
  const tsuriScore: TsuriScoreResponseMessage = await chrome.runtime.sendMessage(request);
  return tsuriScore.tsuri_score;
};
