    // src/store/store.ts
    import { configureStore } from '@reduxjs/toolkit';
    import analysisReducer from '../features/analysis/analysisSlice';

    export const store = configureStore({
      reducer: {
        analysis: analysisReducer,
      },
    });

    // Infer the `RootState` and `AppDispatch` types from the store itself
    export type RootState = ReturnType<typeof store.getState>;
    export type AppDispatch = typeof store.dispatch;