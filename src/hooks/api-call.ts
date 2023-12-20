export interface TsuriScoreItem {
  status: string;
  videoId: string;
  tsuriScore: number;
}

export interface TsuriScoreAPIRequest {
  videoId: string[];
}

export interface TsuriScoreAPIResponse {
  items: TsuriScoreItem[];
}

const API_URL = 'http://localhost:40000/v1';
// const RELEASE_API_URL = 'http://wafugen-hacks-api.azurewebsites.net/v1';

// API call function
export const tsuriScoreAPI = async (input: TsuriScoreAPIRequest): Promise<TsuriScoreAPIResponse> => {
  const inputVideoIds = input.videoId.join(',');
  const url = `${API_URL}/report?videoId=${inputVideoIds}`;

  const response = await fetch(url);
  return response.json();
};
