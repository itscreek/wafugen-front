import reloadOnUpdate from 'virtual:reload-on-update-in-background-script';
import 'webextension-polyfill';
import {
  Message,
  TsuriScoreRequestMessage,
  TsuriScoreResponseMessage,
  SetTimerRequestMessage,
  FinishedTimerResponseMessage,
} from '@pages/message';
import { tsuriScoreAPI } from '@hooks/api-call';

const ALARM_NAME_SEPARATOR_FOR_TABID = 'tabID=';

reloadOnUpdate('pages/background');

/**
 * Extension reloading is necessary because the browser automatically caches the css.
 * If you do not use the css of the content script, please delete it.
 */
reloadOnUpdate('pages/content/style.scss');

const calcTsuriScore = async (videoId: string): Promise<number> => {
  const tsuriScoreAPIResponse = await tsuriScoreAPI({ videoId: [videoId] });
  const tsuriScore = tsuriScoreAPIResponse.items[0].tsuriScore;
  return tsuriScore;
};

const setTimer = async (name, timeInMinutes) => {
  await chrome.alarms.create(name, { delayInMinutes: timeInMinutes });
};

chrome.alarms.onAlarm.addListener(alarm => {
  const timerNameFromTab = alarm.name.split(ALARM_NAME_SEPARATOR_FOR_TABID)[0];
  const tabId = parseInt(alarm.name.split(ALARM_NAME_SEPARATOR_FOR_TABID)[1]);
  const response: FinishedTimerResponseMessage = {
    type: 'FinishedTimerResponse',
    timerName: timerNameFromTab,
    timeInMinutes: alarm.scheduledTime,
  };
  chrome.tabs.sendMessage(tabId, response);
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  const message = request as Message;

  if (message.type === 'TsuriScoreRequest') {
    (async () => {
      const tsuriScoreRequest = message as TsuriScoreRequestMessage;
      const tsuriScore = await calcTsuriScore(tsuriScoreRequest.videoId);
      const response: TsuriScoreResponseMessage = {
        type: 'TsuriScoreResponse',
        videoId: tsuriScoreRequest.videoId,
        tsuriScore: tsuriScore,
      };
      sendResponse(response);
    })();
    // To indicate that it will respond asynchronously
    return true;
  }

  if (message.type === 'SetTimerRequest') {
    const setTimerRequest = message as SetTimerRequestMessage;
    const tabId = sender.tab?.id;
    // only allow to set timer from content script
    if (!tabId) {
      return;
    }

    // pass tabId to alarm name
    const timerName = `${setTimerRequest.timerName}${ALARM_NAME_SEPARATOR_FOR_TABID}${tabId}`;
    setTimer(timerName, setTimerRequest.timeInMinutes);
  }
});
