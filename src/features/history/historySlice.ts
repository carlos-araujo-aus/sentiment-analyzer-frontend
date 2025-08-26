// src/features/history/historySlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import apiClient from '../../services/apiClient';

// Define the shape of a single history item
interface HistoryItem {
  id: number;
  text_snippet: string;
  sentiment_label: string;
  created_at: string;
}

// Define the shape of the history slice's state
interface HistoryState {
  items: HistoryItem[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: HistoryState = {
  items: [],
  status: 'idle',
  error: null,
};

// Async thunk to fetch the history from the backend
export const fetchHistory = createAsyncThunk('history/fetchHistory', async (_, { rejectWithValue }) => {
  try {
    const response = await apiClient.get<HistoryItem[]>('/history');
    return response.data;
  } catch (err: any) {
    if (err.response && err.response.data && err.response.data.error) {
      return rejectWithValue(err.response.data.error);
    }
    return rejectWithValue(err.message || 'Failed to fetch history');
  }
});

const historySlice = createSlice({
  name: 'history',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchHistory.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchHistory.fulfilled, (state, action: PayloadAction<HistoryItem[]>) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchHistory.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  },
});

export default historySlice.reducer;