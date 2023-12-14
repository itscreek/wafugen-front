import axios from 'axios';

// Define types for API
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

const instance = axios.create({
  baseURL: API_URL,
  timeout: 1000,
  headers: {
    'Access-Control-Allow-Origin': API_URL,
  },
});

// API call functionß
export const tsuriScoreAPICall = async (input: TsuriScoreAPIRequest): Promise<TsuriScoreAPIResponse> => {
  const inputVideoIds = input.video_ids.join(',');
  try {
    const response = await instance.get(`/report?video_id=${inputVideoIds}`);
    return response.data;
  } catch (error) {
    if (error.response) {
      return error.response.data;
    } else {
      throw error;
    }
  }
};
