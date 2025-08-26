import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Spinner } from '../../components/common/Spinner';
import type { AppDispatch, RootState } from '../../store/store';

// Import the real thunk, not the simulation!
import { fetchAnalysis } from './analysisSlice';
// 1. Import the fetchHistory action
import { fetchHistory } from '../history/historySlice';

export const AnalysisForm = () => {
  const [text, setText] = useState('');
  const dispatch: AppDispatch = useDispatch();
  const { status } = useSelector((state: RootState) => state.analysis);
  const isLoading = status === 'loading';

  // 2. Make the handler async and await the result
  const handleAnalyze = async () => {
    if (!text.trim()) {
      return;
    }
    // `dispatch` returns a promise when using async thunks
    const resultAction = await dispatch(fetchAnalysis(text));

    // 3. After the analysis is complete, refresh the history
    // We can check if the thunk was fulfilled to avoid refreshing on error
    if (fetchAnalysis.fulfilled.match(resultAction)) {
      dispatch(fetchHistory());
    }
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
      <label htmlFor="analysis-textarea" className="block text-xl font-semibold mb-4">
        Enter text to analyze
      </label>
      <textarea
        id="analysis-textarea"
        className="w-full h-40 p-3 bg-gray-700 text-gray-200 rounded-md focus:ring-2 focus:ring-cyan-500 focus:outline-none disabled:opacity-50"
        placeholder="Type or paste your text here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        disabled={isLoading}
      />
      <button
        onClick={handleAnalyze}
        className="mt-4 w-full h-12 flex items-center justify-center bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded-md transition duration-300 disabled:bg-gray-600 disabled:cursor-not-allowed"
        // Also disable button if the textarea is empty
        disabled={isLoading || !text.trim()}
      >
        {isLoading ? <Spinner /> : 'Analyze'}
      </button>
    </div>
  );
};
