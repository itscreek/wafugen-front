/**
 * DO NOT USE import someModule from '...';
 *
 * @issue-url https://github.com/Jonghakseo/chrome-extension-boilerplate-react-vite/issues/160
 *
 * Chrome extensions don't support modules in content scripts.
 * If you want to use other modules in content scripts, you need to import them via these files.
 *
 */

import {
  Message,
  TsuriScoreRequestMessage,
  TsuriScoreResponseMessage,
  SetTimerRequestMessage,
  FinishedTimerResponseMessage,
} from '@pages/message';

class TimerController {
  private resolverMap: Map<string, () => void> = new Map();

  setTimer(timerName: string, timeInMinutes: number): Promise<void> {
    const request: SetTimerRequestMessage = {
      type: 'SetTimerRequest',
      timerName: timerName,
      timeInMinutes: timeInMinutes,
    };
    chrome.runtime.sendMessage(request);
    return new Promise(resolve => {
      this.resolverMap.set(timerName, resolve);
    });
  }

  async finishTimer(timerName: string) {
    const resolver = this.resolverMap.get(timerName);
    resolver();
  }
}

const timerController = new TimerController();

chrome.runtime.onMessage.addListener(request => {
  const message = request as Message;

  if (message.type === 'FinishedTimerResponse') {
    const finishedTimerResponse = message as FinishedTimerResponseMessage;
    timerController.finishTimer(finishedTimerResponse.timerName);
  }
});

// マウスオーバー時の処理
document.addEventListener('mouseover', event => {
  const target = event.target as HTMLElement;

  const ytdRichGridMediaElement = target.closest('ytd-rich-grid-media') as HTMLElement;
  // when Youtube preview starts
  if (ytdRichGridMediaElement) {
    const thumbnailAnchor = ytdRichGridMediaElement.querySelector('a#thumbnail') as HTMLAnchorElement;
    const videoId = thumbnailAnchor.href.split('v=')[1];

    injectTsuriScore(videoId);
  }

  //カーソルから外れたら、スコアを表示しなくなる
  // const element = target.parentElement.parentElement as HTMLElement;
  // const scoreElement = element.querySelector('.tsuri-score') as HTMLElement | null;
  // if (scoreElement) {
  //   scoreElement.remove();
  // }
});

const injectTsuriScore = async (videoId: string) => {
  await injectTsuriScoreElement();
  const tsuriScore = await getTsuriScore(videoId);
  updateTsuriScoreUI(tsuriScore);
};

const injectTsuriScoreElement = async () => {
  const tsuriScoreElementTagName = 'wafugen-extension-tsuri-score';
  let tsuriScoreElement = document.querySelector(tsuriScoreElementTagName);
  if (tsuriScoreElement) {
    return;
  }

  tsuriScoreElement = document.createElement(tsuriScoreElementTagName);
  injectingTsuriScoreUI(tsuriScoreElement);
  (await getYtpInlinePreviewUiElement())?.appendChild(tsuriScoreElement);
};

const getYtpInlinePreviewUiElement = async (): Promise<Element | undefined> => {
  let ytpInlinePreviewUiElement = document.querySelector('.ytp-inline-preview-ui');
  if (!ytpInlinePreviewUiElement) {
    await timerController.setTimer('getYtpInlinePreviewUiElement', 0.01);
    ytpInlinePreviewUiElement = document.querySelector('.ytp-inline-preview-ui');
  }
  return ytpInlinePreviewUiElement;
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
const injectingTsuriScoreUI = (parent: Element) => {
  const scoreElement = document.createElement('div') as HTMLElement;

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

  scoreElement.textContent = '計算中...';

  parent.appendChild(scoreElement);
};

const updateTsuriScoreUI = (tsuriScore: number) => {
  const scoreElement = document.querySelector('.tsuri-score') as HTMLElement;
  if (scoreElement) {
    scoreElement.textContent = tsuriScore.toString();
  }
};
