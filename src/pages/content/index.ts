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
    injectTsuriScoreElement();

    const thumbnailAnchor = ytdRichGridMediaElement.querySelector('a#thumbnail') as HTMLAnchorElement;
    const videoId = thumbnailAnchor.href.split('v=')[1];
    updateTsuriScoreComponent(videoId);
  }
});

// injects <wafugen-extension-tsuri-score> element to the page
// this function injects only once
const injectTsuriScoreElement = async () => {
  const tsuriScoreElementTagName = 'wafugen-extension-tsuri-score';
  let tsuriScoreElement = document.querySelector(tsuriScoreElementTagName);
  if (tsuriScoreElement) {
    return;
  }

  tsuriScoreElement = document.createElement(tsuriScoreElementTagName);
  injectTsuriScoreComponent(tsuriScoreElement);
  (await getYtpInlinePreviewUiElement())?.appendChild(tsuriScoreElement);
};

const getYtpInlinePreviewUiElement = async (): Promise<Element | undefined> => {
  let ytpInlinePreviewUiElement = document.querySelector('.ytp-inline-preview-ui');
  if (!ytpInlinePreviewUiElement) {
    await timerController.setTimer('getYtpInlinePreviewUiElement', 0.03);
    ytpInlinePreviewUiElement = document.querySelector('.ytp-inline-preview-ui');
  }
  return ytpInlinePreviewUiElement;
};

// hooks for React components
const injectTsuriScoreComponent = (parent: Element) => {
  const divElement = document.createElement('div');
  divElement.id = 'tsuri-score-ui-container';
  divElement.style.zIndex = '2147483647';

  // TODO: configure
  divElement.style.position = 'absolute';
  divElement.style.right = '5px';
  divElement.style.bottom = '5px';
  divElement.style.width = '50px';
  divElement.style.height = '50px';

  const srcElement = document.createElement('script');
  srcElement.src = chrome.runtime.getURL('src/pages/tsuriScoreUi/index.js');
  srcElement.type = 'module';

  parent.appendChild(divElement);
  parent.appendChild(srcElement);
};

const updateTsuriScoreComponent = (videoId: string) => {};

const getTsuriScore = async (videoId: string): Promise<number> => {
  const request: TsuriScoreRequestMessage = {
    type: 'TsuriScoreRequest',
    videoId: videoId,
  };
  const tsuriScore: TsuriScoreResponseMessage = await chrome.runtime.sendMessage(request);
  return tsuriScore.tsuriScore;
};
