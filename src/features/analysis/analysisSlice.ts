// src/features/analysis/analysisSlice.ts
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction, ThunkAction, Action } from '@reduxjs/toolkit';
import { mockSuccessData } from './mock-data';
import type { RootState } from '../../store/store'; // Import RootState

// Define the shape of the analysis results
interface AnalysisResults {
  sentiment: { label: string; score: number };
  emotions: Record<string, number>;
  keywords: string[];
}

// Define the shape of our slice's state
interface AnalysisState {
  results: AnalysisResults | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: AnalysisState = {
  results: null,
  status: 'idle',
  error: null,
};

const analysisSlice = createSlice({
  name: 'analysis',
  initialState,
  reducers: {
    analysisStarted(state) {
      state.status = 'loading';
      state.error = null;
    },
    analysisReceived(state, action: PayloadAction<AnalysisResults>) {
      state.status = 'succeeded';
      state.results = action.payload;
    },
    analysisFailed(state, action: PayloadAction<string>) {
      state.status = 'failed';
      state.error = action.payload;
    },
  },
});

// Export the actions so our components can dispatch them
export const { analysisStarted, analysisReceived, analysisFailed } =
  analysisSlice.actions;

// A "thunk" that simulates an async API call
export const simulateFetchAnalysis =
  (): ThunkAction<void, RootState, unknown, Action<string>> => (dispatch) => {
    dispatch(analysisStarted());
    setTimeout(() => {
      // To test different states, comment/uncomment the lines below
      dispatch(analysisReceived(mockSuccessData));
      // dispatch(analysisFailed('This is a simulated API error.'));
    }, 1500); // Simulate a 1.5 second network delay
  };

// Export the reducer to be included in the store
export default analysisSlice.reducer;
