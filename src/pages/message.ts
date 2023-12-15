export interface Message {
  type: MessageType;
}

export type MessageType = 'TsuriScoreRequest' | 'TsuriScoreResponse';

export interface TsuriScoreRequestMessage extends Message {
  type: 'TsuriScoreRequest';
  video_id: string;
}

export interface TsuriScoreResponseMessage extends Message {
  type: 'TsuriScoreResponse';
  video_id: string;
  tsuri_score: number;
}
