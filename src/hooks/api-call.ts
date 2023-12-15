export interface TsuriScoreItem {
  status: string;
  video_id: string;
  tsuri_score: number;
}

export interface TsuriScoreAPIRequest {
  video_ids: string[];
}

export interface TsuriScoreAPIResponse {
  items: TsuriScoreItem[];
}

const API_URL = 'http://localhost:40000/v1';

// API call function
export const tsuriScoreAPI = async (input: TsuriScoreAPIRequest): Promise<TsuriScoreAPIResponse> => {
  const inputVideoIds = input.video_ids.join(',');
  const url = `${API_URL}/report?video_id=${inputVideoIds}`;

  const response = await fetch(url);
  return response.json();
};
