// src/features/analysis/ResultsDisplay.tsx
import { useSelector } from 'react-redux';
import { Spinner } from '../../components/common/Spinner';
import type { RootState } from '../../store/store';
// We will create and import EmotionsChart in the next step

export const ResultsDisplay = () => {
  const { status, results, error } = useSelector(
    (state: RootState) => state.analysis
  );

  if (status === 'loading') {
    return (
      <div className="flex justify-center items-center p-8 mt-6">
        <Spinner />
      </div>
    );
  }

  if (status === 'failed') {
    return (
      <div
        role="alert"
        className="mt-6 p-4 bg-red-900 border border-red-500 text-red-300 rounded-lg"
      >
        <strong>Error:</strong> {error}
      </div>
    );
  }

  if (status === 'succeeded' && results) {
    return (
      <div className="mt-6 bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-cyan-400">
          Analysis Results
        </h2>
        {/* Detailed results components will go here */}
        <p>
          Sentiment: {results.sentiment.label} ({results.sentiment.score})
        </p>
        {/* We will add the EmotionsChart component here */}
      </div>
    );
  }

  // Render nothing if status is 'idle'
  return null;
};
