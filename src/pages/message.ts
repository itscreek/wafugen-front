export interface Message {
  type: MessageType;
}

export type MessageType = 'TsuriScoreRequest' | 'TsuriScoreResponse' | 'SetTimerRequest' | 'FinishedTimerResponse';

export interface TsuriScoreRequestMessage extends Message {
  type: 'TsuriScoreRequest';
  videoId: string;
}

export interface TsuriScoreResponseMessage extends Message {
  type: 'TsuriScoreResponse';
  videoId: string;
  tsuriScore: number;
}

export interface SetTimerRequestMessage extends Message {
  type: 'SetTimerRequest';
  timerName: string;
  timeInMinutes: number;
}

export interface FinishedTimerResponseMessage extends Message {
  type: 'FinishedTimerResponse';
  timerName: string;
  timeInMinutes: number;
}
