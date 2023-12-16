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

// マウスオーバー時の処理
document.addEventListener('mouseover', event => {
  const target = event.target as HTMLElement;

  // when target is Youtube thumbnail
  if (
    target.className ===
    'yt-core-image--fill-parent-height yt-core-image--fill-parent-width yt-core-image yt-core-image--content-mode-scale-aspect-fill yt-core-image--loaded'
  ) {
    const thumbnailAnchor = target.parentElement.parentElement as HTMLAnchorElement;
    const videoId = thumbnailAnchor.href.split('v=')[1];

    injectTsuriScore(videoId, thumbnailAnchor);
  }

  // when target is Youtube video
  if (target.className === 'video-stream html5-main-video') {
    console.log('Mouseover!: video');
    injectTsuriReportShape();
  }

  removeTsuriReportShape();

  removeTsuriScore(target);
});

const injectTsuriScore = async (videoId: string, thumbnailAnchor: HTMLAnchorElement) => {
  const tsuriScore = await getTsuriScore(videoId);
  console.log(tsuriScore);

  injectingUI(tsuriScore, thumbnailAnchor);
};

const removeTsuriScore = (target: HTMLElement) => {
  //カーソルから外れたら、スコアを表示しなくなる
  const element = target.parentElement.parentElement as HTMLElement;
  const scoreElement = element.querySelector('.tsuri-score') as HTMLElement | null;
  if (scoreElement) {
    scoreElement.remove();
  }
};

const getTsuriScore = async (videoId: string): Promise<number> => {
  const request: TsuriScoreRequestMessage = {
    type: 'TsuriScoreRequest',
    videoId: videoId,
  };
  const tsuriScore: TsuriScoreResponseMessage = await chrome.runtime.sendMessage(request);
  return tsuriScore.tsuriScore;
};

//スコアを表示する関数
const injectingUI = (tsuriScore: number, thumbnailAnchor: HTMLAnchorElement) => {
  // 既にスコアが表示されている場合は更新のみ行う
  let scoreElement = thumbnailAnchor.querySelector('.tsuri-score') as HTMLElement | null;
  if (!scoreElement) {
    scoreElement = document.createElement('div') as HTMLElement;
    scoreElement.classList.add('tsuri-score');

    scoreElement.style.position = 'absolute';
    scoreElement.style.right = '5px';
    scoreElement.style.bottom = '5px';
    scoreElement.style.color = 'white';
    scoreElement.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
    scoreElement.style.padding = '2px 5px';
    scoreElement.style.borderRadius = '4px';
    scoreElement.style.fontSize = '12px';
    scoreElement.style.zIndex = '99';

    // サムネイルに追加
    thumbnailAnchor.appendChild(scoreElement);
  }
  // スコアを表示
  scoreElement.textContent = tsuriScore.toString();
};

const injectTsuriReportShape = () => {
  // TODO
};

const removeTsuriReportShape = () => {
  // TODO
};
