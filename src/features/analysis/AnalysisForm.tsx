import { useState } from 'react';
import { Spinner } from '../../components/common/Spinner';
import { useDispatch, useSelector } from 'react-redux';
import { simulateFetchAnalysis } from './analysisSlice';
import type { RootState, AppDispatch } from '../../store/store';

export const AnalysisForm = () => {
  const [text, setText] = useState('');
  const dispatch: AppDispatch = useDispatch();
  const { status } = useSelector((state: RootState) => state.analysis);
  const isLoading = status === 'loading';

  const handleAnalyze = () => {
    if (!text.trim()) return; // Prevent dispatching for empty text
    dispatch(simulateFetchAnalysis());
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
      <label
        htmlFor="analysis-textarea"
        className="block text-xl font-semibold mb-4"
      >
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
        onClick={handleAnalyze} // <-- Add onClick handler
        className="mt-4 w-full h-12 flex items-center justify-center bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded-md transition duration-300 disabled:bg-gray-600 disabled:cursor-not-allowed"
        disabled={isLoading}
      >
        {isLoading ? <Spinner /> : 'Analyze'}
      </button>
    </div>
  );
};
