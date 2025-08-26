import { configureStore } from '@reduxjs/toolkit';
import analysisReducer from '../features/analysis/analysisSlice';
import historyReducer from '../features/history/historySlice';

export const store = configureStore({
  reducer: {
    analysis: analysisReducer,
    history: historyReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {analysis: AnalysisState, history: HistoryState}
export type AppDispatch = typeof store.dispatch;
