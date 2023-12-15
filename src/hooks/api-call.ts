export interface TsuriScore {
  status: string;
  video_id: string;
  tsuri_score: number;
  tsuri_report: any;
}

export interface TsuriScoreAPIRequest {
  video_ids: string[];
}

export interface TsuriScoreAPIResponse {
  items: TsuriScore[];
}

const API_URL = 'http://localhost:40000/v1';

// API call function
export const tsuriScoreAPICall = async (input: TsuriScoreAPIRequest): Promise<TsuriScoreAPIResponse> => {
  const inputVideoIds = input.video_ids.join(',');
  const url = `${API_URL}/report?video_id=${inputVideoIds}`;

  const response = await fetch(url);

  if (!response.ok) {
    // TODO: Error handling
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  return await response.json();
};
