// src/features/analysis/ResultsDisplay.tsx
import { useSelector } from 'react-redux';
import { Spinner } from '../../components/common/Spinner';
import type { RootState } from '../../store/store';
// 1. Import the new chart component
import { EmotionsChart } from './EmotionsChart';

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
      <div role="alert" className="mt-6 p-4 bg-red-900 border border-red-500 text-red-300 rounded-lg">
        <strong>Error:</strong> {error}
      </div>
    );
  }

  if (status === 'succeeded' && results) {
    // 2. Add the full rendering logic
    const sentimentColor =
      results.sentiment.label === 'positive'
        ? 'text-green-400'
        : results.sentiment.label === 'negative'
        ? 'text-red-400'
        : 'text-yellow-400';

    return (
      <div className="mt-6 bg-gray-800 p-6 rounded-lg shadow-lg animate-fade-in space-y-6">
        <div>
          <h2 className="text-2xl font-bold mb-2 text-cyan-400">
            Analysis Results
          </h2>
          <p className={`text-xl font-semibold ${sentimentColor}`}>
            Overall Sentiment: {results.sentiment.label} (
            {results.sentiment.score.toFixed(2)})
          </p>
        </div>

        {results.emotions && Object.keys(results.emotions).length > 0 && (
          <div>
            <h3 className="text-lg font-semibold mb-2">Emotions Breakdown</h3>
            <EmotionsChart emotionsData={results.emotions} />
          </div>
        )}

        {results.keywords && results.keywords.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold mb-2">Key Concepts</h3>
            <div className="flex flex-wrap gap-2">
              {results.keywords.map((keyword) => (
                <span key={keyword.text} className="bg-gray-700 text-cyan-300 px-3 py-1 rounded-full text-sm">
                  {keyword.text}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  return null;
};
